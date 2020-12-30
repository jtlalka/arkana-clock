// noinspection NpmUsedModulesInstalled
import document from "document";

import * as elements from "./core/ui/elements";
import * as display from "./core/ui/display";
import * as progress from "./core/ui/progress";
import * as render from "./core/logic/render";
import * as sensors from "./core/logic/sensors";
import * as config from "./core/utils/config";

// cache types
const Types = {
    HH: 'cache.hours',
    TS: 'cache.time.separator',
    MI: 'cache.minutes',
    DD: 'cache.days',
    DS: 'cache.date.separator',
    MM: 'cache.months',
    UV: 'cache.battery.value',
    UP: 'cache.battery.progress',
    HR: 'cache.heart.rate.value',
    HP: 'cache.heart.rate.progress',
    S1: 'cache.sensor.1',
    S2: 'cache.sensor.2',
    S3: 'cache.sensor.3',
    S4: 'cache.sensor.4',
    ON: 'cache.screen.on',
    LC: 'cache.label.color'
}

// labels
let textLabels = document.getElementsByTagName('text');

// custom
let stepDisplay = [
    document.getElementById('step2-display'),
    document.getElementById('step1-display'),
    document.getElementById('step0-display')
];

// heart
let heartDisplay = [
    document.getElementById('heart2-display'),
    document.getElementById('heart1-display'),
    document.getElementById('heart0-display')
];

// progress
let stepProgress = document.getElementById('step-progress');
let heartProgress = document.getElementById('heart-progress');

// time
let time3Display = document.getElementById('time3-display');
let time2Display = document.getElementById('time2-display');
let timeSepDisplay = document.getElementById('time-sep-display');
let time1Display = document.getElementById('time1-display');
let time0Display = document.getElementById('time0-display');

// date
let date3Display = document.getElementById('date3-display');
let date2Display = document.getElementById('date2-display');
let dateSepDisplay = document.getElementById('date-sep-display');
let date1Display = document.getElementById('date1-display');
let date0Display = document.getElementById('date0-display');

// sensors
let sensor1Ring = document.getElementById('sensor1-ring');
let sensor2Ring = document.getElementById('sensor2-ring');
let sensor3Ring = document.getElementById('sensor3-ring');
let sensor4Ring = document.getElementById('sensor4-ring');

// texts
let sensor3Text = document.getElementById('sensor3-text');

// register
// render.enableAlwaysOnMode();
render.enableSettingsObserver();
render.enableScreenObserver();

// render
render.run(function (data) {
    updateDisplayElements(data.active);

    updateDate(data.date);
    updateTime(data.time);
    updateActivity(data.activity);
    updateHeartRate(data.heartRate);
    updateBattery(data.battery);
    updateLabels(data.active);
});

function updateDisplayElements(isVisible) {
    elements.display(Types.ON, isVisible, [
        heartProgress, stepProgress,
        date3Display, date2Display, dateSepDisplay, date1Display, date0Display,
        sensor1Ring, sensor2Ring, sensor3Ring, sensor4Ring
    ].concat(textLabels, heartDisplay, stepDisplay));
}

function updateDate(data) {
    if (data) {
        if (config.dateFormat === 'DD-MM') {
            display.render(Types.DD, data.day, [date3Display, date2Display], display.type.alignRight);
            display.render(Types.DS, display.FULL, [dateSepDisplay]);
            display.render(Types.MM, data.month, [date1Display, date0Display]);
        } else {
            display.render(Types.MM, data.month, [date3Display, date2Display], display.type.alignRight);
            display.render(Types.DS, display.FULL, [dateSepDisplay]);
            display.render(Types.DD, data.day, [date1Display, date0Display]);
        }
    }
}

function updateTime(data) {
    if (data) {
        display.render(Types.HH, data.hour, [time3Display, time2Display]);
        display.render(Types.TS, display.FULL, [timeSepDisplay]);
        display.render(Types.MI, data.minute, [time1Display, time0Display]);
    }
}

function updateActivity(flag) {
    if (flag) {
        sensors.fetchActivity(function (data) {
            progress.render(Types.S1, data.activeMinutes.today, data.activeMinutes.goal, sensor1Ring);
            progress.render(Types.S2, data.steps.today, data.steps.goal, sensor2Ring);
            progress.render(Types.S4, data.calories.today, data.calories.goal, sensor4Ring);

            // Versa Lite does not count floors:
            if (data.floors.active) {
                sensor3Text.text = "FLRS"
                progress.render(Types.S3, data.floors.today, data.floors.goal, sensor3Ring);
            } else {
                sensor3Text.text = "DIST"
                progress.render(Types.S3, data.distance.today, data.distance.goal, sensor3Ring);
            }
        });
    }
}

function updateHeartRate(flag) {
    if (flag) {
        sensors.fetchHeartRate(function (data) {
            display.render(Types.HR, data.bpm, heartDisplay, display.type.alignRight);
            progress.render(Types.HP, data.bpm, data.limit, heartProgress, progress.type.inverted);
        });
    }
}

function updateBattery(flag) {
    if (flag) {
        sensors.fetchBatteryData(function (data) {
            display.render(Types.UV, data.level, stepDisplay, display.type.alignLeft);
            progress.render(Types.UP, data.level, data.limit, stepProgress, progress.type.inverted);
        });
    }
}

function updateLabels(flag) {
    if (flag) {
        elements.foregroundColor(Types.LC, textLabels);
    }
}
