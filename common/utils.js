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
