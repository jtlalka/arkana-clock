import * as cache from "../utils/cache";
import * as colors from "../utils/colors";

export const type = {
    regular: 0,
    inverted: 1,
    pointer: 2
}

export function render(key, value, limit, displayBlock, format = type.regular) {
    let percentage = calculatePercentage(value, limit);
    let level = calculateLevel(percentage, displayBlock.children.length);

    cache.runOnUpdate(key, level, function () {
        renderProgress(level, displayBlock, format);
    });
}

function calculatePercentage(value, limit) {
    return Math.min(value / limit || 0, 1);
}

function calculateLevel(percentage, size) {
    return Math.floor(percentage * size);
}

function renderProgress(level, displayBlock, format) {
    for (let i = 0, length = displayBlock.children.length; i < length; i++) {
        if (isDisplay(length, level, i, format)) {
            displayBlock.children[i].style.fill = colors.foregroundColor;
        } else {
            displayBlock.children[i].style.fill = colors.backgroundColor;
        }
    }
}

function isDisplay(length, level, index, format) {
    switch (format) {
        case type.regular:
            return index < level;
        case type.inverted:
            return length - 1 - index < level;
        case type.pointer:
            return index + 1 === level;
    }
}
