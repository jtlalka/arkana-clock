let cache = {};

export function runOnUpdate(key, value, updateCallback) {
    if (cache[key] === undefined || cache[key] !== value) {
        cache[key] = value;
        updateCallback();
    }
}

export function clearCache() {
    for (let key in cache) {
        if (cache.hasOwnProperty(key)) {
            delete cache[key];
        }
    }
}
