import * as cache from "../../common/cache";

export const FULL = '8'
export const NONE = 'x'

export const type = {
    digital: 0,
    alignRight: 1,
    alignLeft: 2
}

let displayMatrix = {
    //    0  1  2  3  4  5  6  7  8  9  10 11 12
    '0': [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    '1': [0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1],
    '2': [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1],
    '3': [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    '4': [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1],
    '5': [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
    '6': [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    '7': [1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1],
    '8': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    '9': [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    'x': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}

export function render(key, value, displayBlocks, format = type.digital) {
    cache.runOnUpdate(key, value, function () {
        renderDisplay(value, displayBlocks, format);
    });
}

function renderDisplay(number, displayBlocks, format) {
    let digits = getDigitNumber(number, displayBlocks.length, format);

    for (let i = 0, length = displayBlocks.length; i < length; i++) {
        renderDigit(digits[i], displayBlocks[i]);
    }
}

function getDigitNumber(number, displaySize, format) {
    let prefix = "";
    let postfix = "";

    for (let index = displaySize; index > 0; index--) {
        let maxValue = Math.pow(10, index) - 1;
        let minValue = Math.pow(10, index - 1) - 1;

        if (number > maxValue) {
            if (index === displaySize) {
                return maxValue.toString();
            }
        } else if (number < minValue) {
            switch(format) {
                case type.digital: {
                    prefix += '0';
                    break;
                }
                case type.alignLeft: {
                    postfix += NONE;
                    break;
                }
                case type.alignRight: {
                    prefix += NONE;
                    break;
                }
            }
        }
    }
    return prefix + number + postfix;
}

function renderDigit(digit, displayBlock) {
    let matrix = displayMatrix[digit] || displayMatrix[NONE];

    for (let i = 0, length = displayBlock.children.length; i < length; i++) {
        if (matrix[i]) {
            displayBlock.children[i].style.fill = 'limegreen';
        } else {
            displayBlock.children[i].style.fill = 'fb-extra-dark-gray';
        }
    }
}
