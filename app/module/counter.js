
export function render(value, limit, displayBlock, isInvertedScale = false) {
    let percentage = value / limit;
    let size = displayBlock.children.length;
    let level = Math.floor(percentage * size);

    //console.log("P: " + percentage + " L " + size + " lxl:" + level);

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