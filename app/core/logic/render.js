import * as cache from "../utils/cache";
import * as config from "../utils/config";
import * as clock from "../../platform/clock";
import * as screen from "../../platform/screen";
import * as permission from "../../platform/permission";
import * as preferences from "../../platform/preferences";
import * as settings from "./settings";
import * as sensors from "./sensors";

let renderCallback;
let lastDateValue;
let isDisplayActive;

export function enableAlwaysOnMode() {
    if (permission.check(permission.type.accessAod)) {
        screen.enableAlwaysOnMode();
    }
}

export function enableSettingsObserver() {
    settings.initialize(function (data) {
        config.setDateFormat(data['dateFormat']);
        config.setForegroundColor(data['foregroundColor']);
        config.setBackgroundColor(data['backgroundColor']);
        cache.clearCache();
        forceUpdateCallback();
    });
}

export function enableScreenObserver() {
    screen.initialize(function (data) {
        if (data.isActivatedByUser) {
            clock.setGranularity(clock.granularity.seconds);
            sensors.activate();
            isDisplayActive = true;
            forceUpdateCallback();
        } else {
            clock.setGranularity(clock.granularity.minutes);
            sensors.deactivate();
            isDisplayActive = false;
            forceUpdateCallback();
        }
    });
}

export function run(callback) {
    renderCallback = callback;
    clock.initialize(function (data) {
        lastDateValue = data;
        updateCallback(data);
    });
}

function forceUpdateCallback() {
    if (renderCallback && lastDateValue) {
        updateCallback(lastDateValue);
    }
}

function updateCallback(data) {
    renderCallback({
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
        active: isDisplayActive,
        activity: isDisplayActive,
        heartRate: isDisplayActive,
        battery: isDisplayActive
    });
}
