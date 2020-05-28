import { units, preferences } from 'user-settings';

export function getUserHoursFormat(hour) {
    if (preferences['clockDisplay'] === '12h') {
        return hour % 12 || 12;
    } else {
        return hour;
    }
}

export function getUserDistanceFormat(meters) {
    if (units['distance'] === 'us') {
        return {
            value: meters / 1000 * 0.621371,
            si: 'mi'
        }
    } else {
        return {
            value: meters / 1000,
            si: 'km'
        }
    }
}
