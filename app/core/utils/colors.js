export let foregroundColor = 'cyan';
export let backgroundColor = 'darkslateblue';

export function setForegroundColor(value) {
    if (value) {
        foregroundColor = value;
    }
}

export function setBackgroundColor(value) {
    if (value) {
        backgroundColor = value;
    }
}
