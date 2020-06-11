export let dateFormat = 'MM-DD';
export let foregroundColor = 'cyan';
export let backgroundColor = 'darkslateblue';

export function setDateFormat(value) {
    if (value && value.values[0]) {
        dateFormat = value.values[0].name;
    }
}

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
