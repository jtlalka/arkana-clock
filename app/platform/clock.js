import { clock } from "clock";
import { preferences } from "user-settings";

/**
 * Clock listener.
 *
 * @param granularity Granularity at which clockCallback should be emitted, values: hours, minutes, seconds, off.
 * @param clockCallback Callback with data time information.
 */
export function initialize(granularity, clockCallback) {
    clock.granularity = granularity;
    clock.addEventListener("tick", function (evt) {
        clockCallback({
            day: evt.date.getDate(),
            month: evt.date.getMonth() + 1,
            year: evt.date.getFullYear(),
            hour: getUserHoursFormat(evt.date.getHours()),
            minute: evt.date.getMinutes(),
            second: evt.date.getSeconds()
        });
    });
}

function getUserHoursFormat(hour) {
    if (preferences['clockDisplay'] === "12h") {
        return hour % 12 || 12;
    } else {
        return hour;
    }
}
