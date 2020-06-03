import * as cache from "../../common/cache";
import * as colors from "../../common/colors";
import * as clock from "../platform/clock";
import * as screen from "../platform/screen";
import * as settings from "../platform/settings";
import * as permission from "../platform/permission";
import * as preferences from "../platform/preferences";
import * as sensors from "../module/sensors";

let looperCallback;
let lastDateValue;
let isDisplayActive;

export function enableAlwaysOnMode() {
    if (permission.check(permission.type.accessAod)) {
        screen.enableAlwaysOnMode();
    }
}

export function enableSettingsObserver() {
    settings.initialize(function (data) {
        console.log("Settings date: " + data);

        if (data) {
            colors.setForegroundColor(data['foregroundColor']);
            colors.setBackgroundColor(data['backgroundColor']);
            cache.clearCache();
            updateCallback(lastDateValue);
        }
    });
}

export function enableScreenObserver() {
    screen.initialize(function (data) {
        if (isDisplayActivatedByUser(data)) {
            clock.setGranularity(clock.granularity.seconds);
            sensors.activate();
            isDisplayActive = true;
            updateCallback(lastDateValue);
        } else {
            clock.setGranularity(clock.granularity.minutes);
            sensors.deactivate();
            isDisplayActive = false;
            updateCallback(lastDateValue);
        }
    });
}

function isDisplayActivatedByUser(data) {
    return data.present && !data.aodActive
}

export function run(callback) {
    looperCallback = callback;
    clock.initialize(function (data) {
        lastDateValue = data;
        updateCallback(data);
    });
}

function updateCallback(data) {
    if (looperCallback) {
        looperCallback({
            date: {
                day: data.day,
                month: data.month,
                year: data.year
            },
            time: {
                hour: preferences.getUserHoursFormat(data.hour),
                minute: data.minute,
                second: data.second
            },
            activity: isDisplayActive,
            heartRate: isDisplayActive,
            battery: isDisplayActive,
            labels: isDisplayActive
        });
    }
}
