/**
 * Is element in the array.
 *
 * @param value Element which will be search in the array.
 * @param array Searched array.
 * @returns {boolean} Result of searching for the element.
 */
export function isInArray(value, array) {
    return array && array.indexOf(value) > -1;
}

/**
 * Get single digit from number.
 *
 * @param number Number which count form multiple digits.
 * @param index Index of the searching digit.
 * @returns {number} Searching digit.
 */
export function getDigit(number, index) {
    return Math.floor((number / Math.pow(10, index)) % 10);
}
