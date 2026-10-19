import { describe, expect, it, vi } from 'vitest';
import { GameSound, SOUND_STORAGE_KEY, CLEAR_SAMPLES, soundRecipe } from '../sound';
import { BLOCK_THEMES } from '../theme';
import { readFileSync } from 'node:fs';

const fetchAudio = async () => ({ ok: true, arrayBuffer: async () => new ArrayBuffer(8) });

function mockContext() {
    const param = () => ({ value: 0, setValueAtTime: vi.fn(), linearRampToValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() });
    const node = () => ({ connect: vi.fn(), disconnect: vi.fn(), start: vi.fn(), stop: vi.fn(), gain: param(), frequency: param(), Q: param() });
    return { state: 'running', currentTime: 0, sampleRate: 8000, destination: {},
        createGain: node, createOscillator: node, createBufferSource: node, createBiquadFilter: node,
        createBuffer: () => ({ getChannelData: () => new Float32Array(8000) }),
        decodeAudioData: vi.fn(async () => ({ duration: 1 })), resume: vi.fn() };
}

describe('game sound', () => {
    it('preserves the taps and uses recorded assets for every clear', () => {
        expect(soundRecipe('pickup')[0]).toMatchObject({ frequency: 620, end: 880, duration: .065, volume: .22 });
        expect(soundRecipe('drop')[0]).toMatchObject({ frequency: 420, end: 190, duration: .095, volume: .28 });
        for (const { id } of BLOCK_THEMES) {
            expect(soundRecipe('pickup', id)).toEqual(soundRecipe('pickup'));
            expect(soundRecipe('drop', id)).toEqual(soundRecipe('drop'));
            expect(soundRecipe('clear', id)).toEqual([]);
            const wav = readFileSync(new URL(`../../../public/audio/clear-${CLEAR_SAMPLES[id]}.wav`, import.meta.url));
            expect(wav.toString('ascii', 0, 4)).toBe('RIFF');
            expect(wav.toString('ascii', 8, 12)).toBe('WAVE');
            expect(wav.length).toBeGreaterThan(1000);
            expect(wav.length).toBeLessThan(150000);
        }
    });

    it('creates audio lazily, caps voices, and cleans up ended sounds', async () => {
        const createContext = vi.fn(mockContext);
        const sound = new GameSound({ createContext, storage: null, fetchAudio });
        await sound.play('clear');
        expect(createContext).not.toHaveBeenCalled();
        await sound.play('pickup');
        expect(createContext).toHaveBeenCalledTimes(1);
        expect(sound.voices.size).toBe(2);
        const voice = [...sound.voices][0];
        voice.onended();
        expect(voice.disconnect).toHaveBeenCalled();
        expect(sound.voices.size).toBe(1);
        for (let i = 0; i < 60; i++) await sound.play('clear', 'ocean');
        expect(sound.voices.size).toBe(48);
    });

    it('persists mute and stops active and scheduled sounds immediately', async () => {
        const values = new Map();
        const storage = { getItem: key => values.get(key), setItem: (key, value) => values.set(key, value) };
        const sound = new GameSound({ createContext: mockContext, storage, fetchAudio });
        await sound.play('pickup');
        const voices = [...sound.voices];
        sound.setEnabled(false);
        voices.forEach(voice => expect(voice.stop).toHaveBeenCalledTimes(2));
        expect(values.get(SOUND_STORAGE_KEY)).toBe('off');
        expect(new GameSound({ storage }).enabled).toBe(false);
        await sound.play('drop');
        expect(sound.voices.size).toBe(0);
    });

    it('preloads without unlocking audio, caches decoding, and plays one recording per clear', async () => {
        const createContext = vi.fn(mockContext);
        const fetcher = vi.fn(fetchAudio);
        const sound = new GameSound({ createContext, storage: null, fetchAudio: fetcher });
        sound.preload('ocean');
        await sound.fetchSample('ocean');
        expect(createContext).not.toHaveBeenCalled();
        await sound.play('pickup');
        await sound.prepareSample('ocean');
        expect(fetcher).toHaveBeenCalledTimes(1);
        expect(sound.context.decodeAudioData).toHaveBeenCalledTimes(1);
        await sound.play('clear', 'ocean');
        expect(sound.voices.size).toBe(3); // Two tap voices plus one recorded clear.
    });

    it('does not play failed or muted in-flight downloads or revert to synthesized clears', async () => {
        const failed = new GameSound({ createContext: mockContext, storage: null,
            fetchAudio: async () => { throw Error('offline'); } });
        await failed.play('pickup');
        await expect(failed.play('clear', 'ocean')).resolves.toBeUndefined();
        expect(failed.voices.size).toBe(2);

        let release;
        const sound = new GameSound({ createContext: mockContext, storage: null,
            fetchAudio: () => new Promise(resolve => { release = resolve; }) });
        sound.context = mockContext();
        sound.master = sound.context.createGain();
        const playing = sound.play('clear', 'ocean');
        await Promise.resolve();
        sound.setEnabled(false);
        sound.setEnabled(true);
        release({ ok: true, arrayBuffer: async () => new ArrayBuffer(8) });
        await playing;
        expect(sound.voices.size).toBe(0);
    });

    it('handles unavailable audio, blocked resume, and inaccessible storage safely', async () => {
        const storage = { getItem() { throw Error('blocked'); }, setItem() { throw Error('blocked'); } };
        const missing = new GameSound({ createContext: () => null, storage });
        await expect(missing.play('pickup')).resolves.toBeUndefined();
        expect(() => missing.setEnabled(false)).not.toThrow();
        const context = mockContext();
        context.state = 'suspended';
        context.resume.mockRejectedValue(Error('autoplay blocked'));
        const blocked = new GameSound({ createContext: () => context, storage: null });
        await expect(blocked.play('pickup')).resolves.toBeUndefined();
        expect(blocked.voices.size).toBe(0);
    });
});
