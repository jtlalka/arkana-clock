/**
 * Add zero in front of numbers < 10
 */
export function zeroPad(num) {
    if (num < 10) {
        return "0" + num;
    } else {
        return num;
    }
}
