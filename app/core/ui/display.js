import * as cache from "../utils/cache";
import * as config from "../utils/config";

export const FULL = '8';
export const ZERO = '0';
export const NONE = 'x';

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

    //    0  1  2  3  4  5  6  7  8  9  10 11 12
    '-': [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    'e': [1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1],
    'r': [0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0],
    'x': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}

export function render(key, value, displayBlocks, format = type.digital) {
    cache.runOnUpdate(key, value, function () {
        renderDisplay(getDigits(value, displayBlocks.length, format), displayBlocks);
    });
}

function getDigits(value, displaySize, format) {
    if (typeof value === 'number') {
        return getDigitNumber(value, displaySize, format);
    } else if (typeof value === 'string') {
        return getDigitString(value, displaySize, format);
    } else {
        return getDigitString("err", displaySize, format);
    }
}

function getDigitNumber(number, displaySize, format) {
    let decoration = "";

    for (let index = displaySize; index > 0; index--) {
        let maxValue = Math.pow(10, index) - 1;
        let minValue = Math.pow(10, index - 1) - 1;

        if (number > maxValue) {
            if (index === displaySize) {
                return formatDigits(maxValue, decoration, format);
            } else {
                break;
            }
        } else if (number <= minValue) {
            decoration += getDigitDecoration(format);
        }
    }
    return formatDigits(number, decoration, format);
}

function getDigitString(text, displaySize, format) {
    let textSize = text.length || 0;
    let decoration = "";

    for (let index = displaySize; index > textSize; index--) {
        if (index > textSize) {
            decoration += getDigitDecoration(format);
        }
    }
    return formatDigits(text, decoration, format);
}

function getDigitDecoration(format) {
    switch (format) {
        case type.digital:
            return ZERO;
        case type.alignLeft:
        case type.alignRight:
            return NONE;
    }
}

function formatDigits(value, decoration, format) {
    switch (format) {
        case type.digital:
        case type.alignRight:
            return decoration + value;
        case type.alignLeft:
            return value + decoration;
    }
}

function renderDisplay(digits, displayBlocks) {
    for (let i = 0, length = displayBlocks.length; i < length; i++) {
        renderDigit(digits[i], displayBlocks[i]);
    }
}

function renderDigit(digit, displayBlock) {
    let matrix = displayMatrix[digit] || displayMatrix[NONE];

    for (let i = 0, length = displayBlock.children.length; i < length; i++) {
        if (matrix[i]) {
            displayBlock.children[i].style.fill = config.foregroundColor;
        } else {
            displayBlock.children[i].style.fill = config.backgroundColor;
        }
    }
}
