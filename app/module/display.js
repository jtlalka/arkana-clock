import * as utils from "../../common/utils";

let displayMatrix = {
    '0': [0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12],
    '1': [2, 4, 7, 9, 12],
    '2': [0, 1, 2, 4, 5, 6, 7, 8, 10, 11, 12],
    '3': [0, 1, 2, 4, 5, 6, 7, 9, 10, 11, 12],
    '4': [0, 2, 3, 4, 5, 6, 7, 9, 12],
    '5': [0, 1, 2, 3, 5, 6, 7, 9, 10, 11, 12],
    '6': [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12],
    '7': [0, 1, 2, 4, 7, 9, 12],
    '8': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    '9': [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12],
    'x': []
}

export function render(number, displayBlocks, skipZeroPrefix = false) {
    for (let i = 0, length = displayBlocks.length; i < length; i++) {
        let digit = getDigit(number, length - 1 - i);
        let block = displayBlocks[i];

        if (skipZeroPrefix && isZeroPrefix(i, digit)) {
            renderDigit('x', block);
        } else {
            renderDigit(digit, block);
        }
    }
}

function getDigit(number, index) {
    return Math.floor((number / Math.pow(10, index)) % 10);
}

function isZeroPrefix(index, digit) {
    return index === 0 && digit === 0
}

function renderDigit(digit, displayBlock) {
    let matrix = displayMatrix[digit];

    for (let i = 0, length = displayBlock.children.length; i < length; i++) {
        if (utils.isInArray(i, matrix)) {
            displayBlock.children[i].style.fill = 'limegreen';
        } else {
            displayBlock.children[i].style.fill = 'fb-extra-dark-gray';
        }
    }
}
