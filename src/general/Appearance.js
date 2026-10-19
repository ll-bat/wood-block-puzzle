import FUNC from './Custom';
import CONSTANTS from './Constants';
import { applyBlockTheme, BLOCK_THEMES, loadBlockTheme } from '../puzzle/theme';
import sound from '../puzzle/sound';

export function alignPieceTray() {
    const tray = document.querySelector('#figures');
    const width = CONSTANTS.boxesOnRow * CONSTANTS.boxWidth + CONSTANTS.boxesOnRow - 1;
    Object.assign(tray.style, {
        left: `${CONSTANTS.offsetX + width / 2}px`, right: 'auto',
        width: 'max-content', transform: 'translateX(-50%)',
    });
}

export function createThemePicker() {
    const picker = FUNC.elt('section', 'challenge-theme-picker');
    picker.setAttribute('aria-label', 'Cube appearance');
    const heading = FUNC.elt('span', 'challenge-theme-title');
    heading.textContent = 'Cube style';
    const options = FUNC.elt('div', 'challenge-theme-options');
    const refresh = () => {
        const selected = document.documentElement.dataset.blockTheme || loadBlockTheme();
        options.querySelectorAll('button').forEach(button => {
            const active = button.dataset.theme === selected;
            button.classList.toggle('challenge-theme-option-active', active);
            button.setAttribute('aria-pressed', String(active));
        });
    };
    BLOCK_THEMES.forEach(theme => {
        const button = FUNC.elt('button', 'challenge-theme-option');
        button.type = 'button';
        button.dataset.theme = theme.id;
        button.title = theme.label;
        button.setAttribute('aria-label', `${theme.label} cube style`);
        const swatch = FUNC.elt('span', `challenge-theme-swatch theme-swatch-${theme.id}`);
        for (let i = 0; i < 4; i++) swatch.append(FUNC.elt('span', 'challenge-theme-swatch-cube'));
        button.append(swatch);
        button.addEventListener('click', () => { applyBlockTheme(theme.id); sound.preload(theme.id); refresh(); });
        options.append(button);
    });
    const soundToggle = FUNC.elt('button', 'sound-toggle');
    soundToggle.type = 'button';
    const refreshSound = () => {
        soundToggle.textContent = sound.enabled ? '♪ Sound on' : '♪ Sound off';
        soundToggle.setAttribute('aria-pressed', String(sound.enabled));
        soundToggle.setAttribute('aria-label', 'Game sounds');
    };
    soundToggle.addEventListener('click', () => {
        sound.setEnabled(!sound.enabled);
        refreshSound();
        if (sound.enabled) sound.play('pickup');
    });
    refreshSound();
    sound.preload(loadBlockTheme());
    picker.append(heading, options, soundToggle);
    refresh();
    return picker;
}
