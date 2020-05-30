import { clock } from 'clock';

/**
 * Granularity at which initialization callback is triggered.
 *
 * @type {{seconds: string, hours: string, minutes: string, off: string}}
 */
export const granularity = {
    seconds: 'seconds',
    minutes: 'minutes',
    hours: 'hours',
    off: 'off'
}

/**
 * Clock listener.
 *
 * @param granularity Granularity at which clockCallback should be emitted.
 * @param clockCallback Callback with data time information.
 */
export function initialize(granularity, clockCallback) {
    clock.granularity = granularity;
    clock.addEventListener('tick', function (evt) {
        clockCallback({
            day: evt.date.getDate(),
            month: evt.date.getMonth() + 1,
            year: evt.date.getFullYear(),
            hour: evt.date.getHours(),
            minute: evt.date.getMinutes(),
            second: evt.date.getSeconds()
        });
    });
}
