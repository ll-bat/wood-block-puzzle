// Sample one continuous water gradient at the top and bottom of each board row.
// This module has no DOM/global dependencies so shading can be tested directly.
export function oceanDepthColors(row, rowCount = 8) {
    const count = Math.max(1, rowCount);
    const depthRow = Number.isFinite(row) ? row : (count - 1) / 2;
    const color = depth => {
        const t = Math.max(0, Math.min(1, depth));
        const surface = [25, 115, 157];
        const deep = [3, 28, 54];
        return `rgba(${surface.map((value, i) => Math.round(value + (deep[i] - value) * t)).join(', ')}, 0.94)`;
    };
    return { top: color(depthRow / count), bottom: color((depthRow + 1) / count) };
}

export function applyOceanDepth(element, row, rowCount = 8) {
    const colors = oceanDepthColors(row, rowCount);
    element.style.setProperty('--ocean-top', colors.top);
    element.style.setProperty('--ocean-bottom', colors.bottom);
}
