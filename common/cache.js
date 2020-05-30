let cache = {};

export function runOnUpdate(key, value, callback) {
    if (cache[key] === undefined || cache[key] !== value) {
        cache[key] = value

        console.log("RUN: " + key + " -> " + value);
        callback();
    }
}

export function get(key) {
    if (cache.hasOwnProperty(key)) {
        return cache[key];
    }
}

export function clearCache() {
    for (let key in cache) {
        if (cache.hasOwnProperty(key)) {
            delete cache[key];
        }
    }
}
