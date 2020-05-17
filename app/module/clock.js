import clock from "clock";
import { preferences } from "user-settings";

import { days, months, monthsShort } from "../locales/en.js";

let dateFormat, clockCallback;

export function initialize(granularity, dateFormatString, callback) {
    dateFormat = dateFormatString;
    clock.granularity = granularity;
    clockCallback = callback;
    clock.addEventListener("tick", tickHandler);
}

function tickHandler(evt) {
    let today = evt.date;
    let dayName = days[today.getDay()];
    let month = zeroPad(today.getMonth() + 1);
    let monthName = months[today.getMonth()];
    let monthNameShort = monthsShort[today.getMonth()];
    let dayNumber = zeroPad(today.getDate());

    let hours = today.getHours();
    if (preferences.clockDisplay === "12h") {
        // 12h format
        hours = hours % 12 || 12;
    } else {
        // 24h format
        hours = zeroPad(hours);
    }
    let mins = zeroPad(today.getMinutes());

    let timeString = `${hours}:${mins}`;
    let dateString = today;

    switch (dateFormat) {
        case "shortDate":
            dateString = `${dayNumber} ${monthNameShort}`;
            break;
        case "mediumDate":
            dateString = `${dayNumber} ${monthName}`;
            break;
        case "longDate":
            dateString = `${dayName} ${monthName} ${dayNumber}`;
            break;
    }
    clockCallback({time: timeString, date: dateString});
}

function zeroPad(num) {
    if (num < 10) {
        return "0" + num;
    } else {
        return num;
    }
}
