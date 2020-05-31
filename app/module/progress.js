import * as cache from "../../common/cache";
import * as colors from "../../common/colors";

export function render(key, value, limit, displayBlock, isInvertedScale = false) {
    let percentage = calculatePercentage(value, limit);
    let level = calculateLevel(percentage, displayBlock.children.length);

    cache.runOnUpdate(key, level, function () {
        renderProgress(level, displayBlock, isInvertedScale);
    });
}

function calculatePercentage(value, limit) {
    return Math.min(value / limit || 0, 1);
}

function calculateLevel(percentage, size) {
    return Math.floor(percentage * size);
}

function renderProgress(level, displayBlock, isInvertedScale) {
    for (let i = 0, length = displayBlock.children.length; i < length; i++) {
        if (getUnifiedIndex(length, i, isInvertedScale) < level) {
            displayBlock.children[i].style.fill = colors.foregroundColor;
        } else {
            displayBlock.children[i].style.fill = colors.backgroundColor;
        }
    }
}

function getUnifiedIndex(length, index, isInvertedScale) {
    if (isInvertedScale) {
        return length - 1 - index;
    } else {
        return index;
    }
}
