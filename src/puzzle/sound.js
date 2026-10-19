export const SOUND_STORAGE_KEY = 'wood-block-puzzle-sound';

export const CLEAR_SAMPLES = Object.freeze({
    amber: 'wood', winter: 'snow', frozen: 'ice', candy: 'candy',
    grove: 'leaves', meadow: 'grass', ocean: 'water',
});

// Keep the original pickup and placement taps exactly as they were.
export function soundRecipe(kind, theme = 'amber') {
    const tone = (at, frequency, end, duration, volume, wave = 'sine') =>
        ({ at, frequency, end, duration, volume, wave });
    const noise = (at, frequency, duration, volume, filter = 'bandpass') =>
        ({ at, frequency, duration, volume, noise: true, filter });
    if (kind === 'pickup') return [tone(0, 620, 880, .065, .22), noise(0, 1500, .025, .07)];
    if (kind === 'drop') return [tone(0, 420, 190, .095, .28), noise(0, 900, .045, .12)];
    return [];
}

export class GameSound {
    constructor({ createContext, storage, fetchAudio } = {}) {
        this.createContext = createContext || (() => {
            const Audio = globalThis.AudioContext || globalThis.webkitAudioContext;
            return Audio ? new Audio() : null;
        });
        this.storage = storage;
        this.context = null;
        this.voices = new Set();
        this.sampleData = new Map();
        this.sampleBuffers = new Map();
        this.fetchAudio = fetchAudio || (url => fetch(url));
        this.currentTheme = 'amber';
        this.generation = 0;
        this.enabled = true;
        try { this.enabled = this.getStorage()?.getItem(SOUND_STORAGE_KEY) !== 'off'; } catch (_) { /* Optional storage. */ }
    }

    getStorage() { return this.storage === undefined ? globalThis.localStorage : this.storage; }

    setEnabled(enabled) {
        this.generation++;
        this.enabled = Boolean(enabled);
        try { this.getStorage()?.setItem(SOUND_STORAGE_KEY, this.enabled ? 'on' : 'off'); } catch (_) { /* Optional storage. */ }
        if (!this.enabled) {
            for (const source of this.voices) { try { source.stop(); } catch (_) { /* Already ended. */ } }
            this.voices.clear();
        }
    }

    sampleName(theme) { return CLEAR_SAMPLES[theme] || CLEAR_SAMPLES.amber; }

    fetchSample(theme) {
        const name = this.sampleName(theme);
        if (!this.sampleData.has(name)) {
            const pending = Promise.resolve().then(() => this.fetchAudio(`/public/audio/clear-${name}.wav`))
                .then(response => {
                    if (!response.ok) throw Error('Audio unavailable');
                    return response.arrayBuffer();
                }).catch(error => { this.sampleData.delete(name); throw error; });
            this.sampleData.set(name, pending);
        }
        return this.sampleData.get(name);
    }

    async prepareSample(theme) {
        const data = await this.fetchSample(theme);
        if (!this.context) return null;
        const name = this.sampleName(theme);
        if (!this.sampleBuffers.has(name)) {
            this.sampleBuffers.set(name, this.context.decodeAudioData(data.slice(0))
                .catch(error => { this.sampleBuffers.delete(name); throw error; }));
        }
        return this.sampleBuffers.get(name);
    }

    preload(theme) {
        this.currentTheme = theme;
        // Fetch without creating AudioContext; decode after the first user gesture.
        void this.prepareSample(theme).catch(() => {});
    }

    async play(kind, theme = 'amber') {
        if (!this.enabled) return;
        const requestedAt = Date.now();
        const generation = this.generation;
        try {
            // Only a pickup/drop gesture creates or unlocks audio. Delayed clears
            // must never cause an autoplay prompt or queue sounds for later.
            if (!this.context) {
                if (kind === 'clear') return;
                this.context = this.createContext();
                if (!this.context) return;
                this.master = this.context.createGain();
                this.master.gain.value = .38;
                this.master.connect(this.context.destination);
            }
            if (this.context.state !== 'running') {
                if (kind === 'clear') return;
                await this.context.resume();
            }
            if (!this.enabled || generation !== this.generation || this.context.state !== 'running' || Date.now() - requestedAt > 250) return;
            if (kind === 'clear') {
                const buffer = await this.prepareSample(theme);
                // Never play a delayed download after the clear has already ended.
                if (!this.enabled || generation !== this.generation || this.context.state !== 'running' || Date.now() - requestedAt > 250) return;
                this.playSample(buffer);
                return;
            }
            void this.prepareSample(this.currentTheme).catch(() => {});
            const now = this.context.currentTime + .005;
            soundRecipe(kind, theme).forEach(cue => this.schedule(cue, now));
        } catch (_) {
            // Audio is enhancement only: unsupported or blocked audio cannot break play.
        }
    }

    playSample(buffer) {
        if (!buffer || this.voices.size >= 48) return;
        const source = this.context.createBufferSource();
        source.buffer = buffer;
        source.connect(this.master);
        this.voices.add(source);
        source.onended = () => { this.voices.delete(source); source.disconnect(); };
        source.start(this.context.currentTime + .005);
        source.stop(this.context.currentTime + buffer.duration + .02);
    }

    schedule(cue, now) {
        if (this.voices.size >= 48) return;
        const context = this.context;
        const start = now + cue.at;
        const finish = start + cue.duration;
        const envelope = context.createGain();
        envelope.gain.setValueAtTime(0, start);
        envelope.gain.linearRampToValueAtTime(cue.volume, start + .004);
        envelope.gain.exponentialRampToValueAtTime(.0001, finish);
        envelope.connect(this.master);
        let source, filter;
        if (cue.noise) {
            source = context.createBufferSource();
            if (!this.noiseBuffer) {
                this.noiseBuffer = context.createBuffer(1, context.sampleRate, context.sampleRate);
                const samples = this.noiseBuffer.getChannelData(0);
                for (let i = 0; i < samples.length; i++) samples[i] = Math.random() * 2 - 1;
            }
            source.buffer = this.noiseBuffer;
            filter = context.createBiquadFilter();
            filter.type = cue.filter;
            filter.frequency.value = cue.frequency;
            filter.Q.value = .7;
            source.connect(filter);
            filter.connect(envelope);
        } else {
            source = context.createOscillator();
            source.type = cue.wave;
            source.frequency.setValueAtTime(cue.frequency, start);
            source.frequency.exponentialRampToValueAtTime(cue.end, finish);
            source.connect(envelope);
        }
        this.voices.add(source);
        source.onended = () => {
            this.voices.delete(source);
            source.disconnect();
            filter?.disconnect();
            envelope.disconnect();
        };
        source.start(start);
        source.stop(finish + .01);
    }
}

export default new GameSound();
