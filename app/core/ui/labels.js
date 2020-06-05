import * as cache from "../utils/cache";
import * as colors from "../utils/colors";

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
    cache.runOnUpdate(key, colors.foregroundColor, function () {
        updateForegroundColor(elements);
    });
}

function updateForegroundColor(elements) {
    for (let i = 0, length = elements.length; i < length; i++) {
        elements[i].style.fill = colors.foregroundColor;
    }
}
