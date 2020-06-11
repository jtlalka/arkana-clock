import * as cache from "../utils/cache";
import * as config from "../utils/config";

export function display(key, isVisible, elements) {
    cache.runOnUpdate(key, isVisible, function () {
        updateDisplayValue(elements, isVisible ? 'inline' : 'none');
    });
}

function updateDisplayValue(elements, value) {
    for (let i = 0, length = elements.length; i < length; i++) {
        elements[i].style.display = value;
    }
}

export function foregroundColor(key, elements) {
    cache.runOnUpdate(key, config.foregroundColor, function () {
        updateFillColor(elements, config.foregroundColor);
    });
}

function updateFillColor(elements, color) {
    for (let i = 0, length = elements.length; i < length; i++) {
        elements[i].style.fill = color;
    }
}
