import * as cache from "../../common/cache";

export function render(key, value, limit, displayBlock, isInvertedScale = false) {
    let percentage = value / limit;
    let size = displayBlock.children.length;
    let level = Math.floor(percentage * size);

    cache.runOnUpdate(key, level, function () {
        renderProgress(key, level, displayBlock, isInvertedScale);
    });
}

function renderProgress(key, level, displayBlock, isInvertedScale) {
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