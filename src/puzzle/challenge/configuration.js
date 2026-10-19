function indexFromParameter(value) {
    if (value === null || !/^(0|[1-9][0-9]*)$/.test(value)) return undefined;
    const index = Number(value);
    return Number.isSafeInteger(index) ? index : undefined;
}

function sameOriginSource(value, origin) {
    if (!value) return null;
    try {
        const url = new URL(value, origin);
        if (url.origin !== origin) return null;
        return `${url.pathname}${url.search}${url.hash}`;
    } catch (_error) {
        return null;
    }
}

export function challengeConfigurationFromLocation(location, globals = {}) {
    const origin = location && typeof location.origin === 'string'
        ? location.origin : 'http://localhost';
    const search = location && typeof location.search === 'string'
        ? location.search : '';
    const parameters = new URLSearchParams(search);
    const hasGlobalSource = globals.source !== undefined && globals.source !== null;
    const source = hasGlobalSource
        ? globals.source
        : sameOriginSource(parameters.get('challenge'), origin);

    if (globals.selector !== undefined && globals.selector !== null) {
        return Object.freeze({ source, selector: globals.selector });
    }
    const selector = {};
    const id = parameters.get('challengeId');
    const index = indexFromParameter(parameters.get('challengeIndex'));
    if (id) selector.id = id;
    else if (index !== undefined) selector.index = index;
    return Object.freeze({ source, selector: Object.freeze(selector) });
}
