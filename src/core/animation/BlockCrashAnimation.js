import FUNC from '../../general/Custom';
import CONSTANTS from '../../general/Constants';
import { applyOceanDepth } from '../../puzzle/oceanDepth';

const CLEAR_VARIANTS = Object.freeze(['burst', 'flip', 'spark']);

class BlockCrashAnimation {
    constructor() {
        this.variantCursor = 0;
    }

    async animateCrash(box, options = {}) {
        const { x, y } = box;
        const delay = Number.isFinite(options.delay) ? Math.max(0, options.delay) : 0;
        const frozen = document.documentElement.dataset.blockTheme === 'frozen';
        const grove = document.documentElement.dataset.blockTheme === 'grove';
        const meadow = document.documentElement.dataset.blockTheme === 'meadow';
        const ocean = document.documentElement.dataset.blockTheme === 'ocean';
        const variant = ocean ? 'water' : meadow ? 'grass' : grove ? 'leaves' : frozen ? 'ice' : CLEAR_VARIANTS.includes(options.variant)
            ? options.variant
            : CLEAR_VARIANTS[this.variantCursor++ % CLEAR_VARIANTS.length];
        const element = this.draw({ x, y }, variant, delay);
        if (document.documentElement.dataset.blockTheme === 'candy' && box.getDiv) {
            element.style.setProperty('--candy-hue',
                getComputedStyle(box.getDiv()).getPropertyValue('--candy-hue').trim() || '340');
        }
        await new Promise(resolve => {
            let finished = false;
            const finish = () => {
                if (finished) return;
                finished = true;
                element.remove();
                resolve();
            };
            element.addEventListener('animationend', event => {
                if (event.target === element) finish();
            });
            setTimeout(finish, delay + 850);
        });
    }

    draw({ x, y }, variant, delay) {
        const element = FUNC.elt(
            'div',
            `block-crash-animation block-clear-${variant}`,
            null,
            {
                position: 'absolute',
                left: `${x}px`,
                top: `${y}px`,
                width: `${CONSTANTS.boxWidth}px`,
                height: `${CONSTANTS.boxHeight}px`,
                animationDelay: `${delay}ms`,
            },
        );
        element.setAttribute('aria-hidden', 'true');
        applyOceanDepth(element, Math.round((y - CONSTANTS.offsetY) / (CONSTANTS.boxHeight + 1)), CONSTANTS.boxesOnColumn);
        if (variant === 'ice') this.addIceShards(element, delay);
        if (variant === 'leaves') this.addLeaves(element, delay);
        if (variant === 'grass') this.addLeaves(element, delay, true);
        if (variant === 'water') this.addWaterDrops(element, delay);
        CONSTANTS.dom.body.append(element);
        return element;
    }

    addWaterDrops(element, delay) {
        for (let i = 0; i < 8; i++) {
            const drop = FUNC.elt('span', 'ocean-droplet');
            const angle = i * Math.PI / 4;
            drop.style.setProperty('--drop-x', `${Math.cos(angle) * CONSTANTS.boxWidth * .85}px`);
            drop.style.setProperty('--drop-y', `${Math.sin(angle) * CONSTANTS.boxHeight * .65}px`);
            drop.style.animationDelay = `${delay}ms`;
            element.append(drop);
        }
    }

    addIceShards(element, delay) {
        const edges = [[0, 0], [57, 0], [100, 0], [100, 65], [100, 100], [36, 100], [0, 100], [0, 35]];
        edges.forEach(([x, y], index) => {
            const [nextX, nextY] = edges[(index + 1) % edges.length];
            const shard = FUNC.elt('span', 'ice-shard');
            shard.style.clipPath = `polygon(48% 46%, ${x}% ${y}%, ${nextX}% ${nextY}%)`;
            const angle = Math.atan2((y + nextY) / 2 - 46, (x + nextX) / 2 - 48);
            const distance = CONSTANTS.boxWidth * (0.65 + (index % 3) * 0.14);
            shard.style.setProperty('--shard-x', `${Math.cos(angle) * distance}px`);
            shard.style.setProperty('--shard-y', `${Math.sin(angle) * distance + 14}px`);
            shard.style.setProperty('--shard-turn', `${index % 2 ? 32 : -28}deg`);
            shard.style.animationDelay = `${delay}ms`;
            element.append(shard);
        });
    }

    addLeaves(element, delay, grass = false) {
        for (let i = 0; i < 7; i++) {
            const leaf = FUNC.elt('span', grass ? 'grove-leaf meadow-clipping' : 'grove-leaf');
            const angle = i * Math.PI * 2 / 7;
            leaf.style.setProperty('--leaf-x', `${Math.cos(angle) * CONSTANTS.boxWidth * .9}px`);
            leaf.style.setProperty('--leaf-y', `${Math.sin(angle) * CONSTANTS.boxHeight * .65 + 12}px`);
            leaf.style.setProperty('--leaf-turn', `${i % 2 ? 145 : -120}deg`);
            leaf.style.setProperty('--leaf-color', i % 2 ? '#a3cf57' : '#5a9b36');
            leaf.style.animationDelay = `${delay}ms`;
            element.append(leaf);
        }
    }
}

const $blockCrashAnimation = new BlockCrashAnimation();
export default $blockCrashAnimation;
