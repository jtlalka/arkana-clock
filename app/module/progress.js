import * as cache from "../../common/cache";

export function render(key, value, limit, displayBlock, isInvertedScale = false) {
    let percentage = calculatePercentage(value, limit);
    let level = calculateLevel(percentage, displayBlock.children.length);

    cache.runOnUpdate(key, level, function () {
        renderProgress(level, displayBlock, isInvertedScale);
    });
}

function calculatePercentage(value, limit) {
    return value / limit || 0;
}

function calculateLevel(percentage, size) {
    return Math.floor(percentage * size);
}

function renderProgress(level, displayBlock, isInvertedScale) {
    for (let i = 0, length = displayBlock.children.length; i < length; i++) {
        if (getUnifiedIndex(length, i, isInvertedScale) < level) {
            displayBlock.children[i].style.fill = 'limegreen';
        } else {
            displayBlock.children[i].style.fill = 'fb-extra-dark-gray';
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
