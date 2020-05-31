export let foregroundColor = 'limegreen';
export let backgroundColor = 'fb-extra-dark-gray';

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
