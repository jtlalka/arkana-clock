// noinspection NpmUsedModulesInstalled
import document from "document";

import * as elements from "./core/ui/elements";
import * as display from "./core/ui/display";
import * as progress from "./core/ui/progress";
import * as render from "./core/logic/render";
import * as sensors from "./core/logic/sensors";

// cache types
const Types = {
    HH: "cache.hours",
    TS: "cache.time.separator",
    MI: "cache.minutes",
    DD: "cache.days",
    DS: "cache.date.separator",
    MO: "cache.months",
    UV: "cache.battery.value",
    UP: "cache.battery.progress",
    HR: "cache.heart.rate.value",
    HP: "cache.heart.rate.progress",
    AM: "cache.active.minutes",
    ST: "cache.steps",
    FL: "cache.floors",
    CA: "cache.calories",
    ON: "cache.screen.on",
    LC: "cache.label.color"
}

// labels
let textLabels = document.getElementsByTagName('text');

// steps
let stepDisplay = [
    document.getElementById("step2-display"),
    document.getElementById("step1-display"),
    document.getElementById("step0-display")
];

// heart
let heartDisplay = [
    document.getElementById("heart2-display"),
    document.getElementById("heart1-display"),
    document.getElementById("heart0-display")
];

// progress
let stepProgress = document.getElementById("step-progress");
let heartProgress = document.getElementById("heart-progress");

// time
let hour1Display = document.getElementById("hour1-display");
let hour0Display = document.getElementById("hour0-display");
let timeSepDisplay = document.getElementById("time-sep-display");
let minute1Display = document.getElementById("minute1-display");
let minute0Display = document.getElementById("minute0-display");

// date
let day1Display = document.getElementById("day1-display");
let day0Display = document.getElementById("day0-display");
let dateSepDisplay = document.getElementById("date-sep-display");
let month1Display = document.getElementById("month1-display");
let month0Display = document.getElementById("month0-display");

// sensors
let activitySensor = document.getElementById("activity-sensor");
let stepSensor = document.getElementById("step-sensor");
let floorSensor = document.getElementById("floor-sensor");
let calorieSensor = document.getElementById("calorie-sensor");

// register
render.enableAlwaysOnMode();
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
        day1Display, day0Display, dateSepDisplay, month1Display, month0Display,
        activitySensor, stepSensor, floorSensor, calorieSensor
    ].concat(textLabels, heartDisplay, stepDisplay));
}

function updateDate(data) {
    if (data) {
        display.render(Types.DD, data.day, [day1Display, day0Display], display.type.alignRight);
        display.render(Types.DS, display.FULL, [dateSepDisplay]);
        display.render(Types.MO, data.month, [month1Display, month0Display]);
    }
}

function updateTime(data) {
    if (data) {
        display.render(Types.HH, data.hour, [hour1Display, hour0Display]);
        display.render(Types.TS, display.FULL, [timeSepDisplay]);
        display.render(Types.MI, data.minute, [minute1Display, minute0Display]);
    }
}

function updateActivity(flag) {
    if (flag) {
        sensors.fetchActivity(function (data) {
            progress.render(Types.AM, data.activeMinutes.today, data.activeMinutes.goal, activitySensor);
            progress.render(Types.ST, data.steps.today, data.steps.goal, stepSensor);
            progress.render(Types.FL, data.floors.today, data.floors.goal, floorSensor);
            progress.render(Types.CA, data.calories.today, data.calories.goal, calorieSensor);
        });
    }
}

function updateHeartRate(flag) {
    if (flag) {
        sensors.fetchHeartRate(function (data) {
            display.render(Types.HR, data.bpm, heartDisplay, display.type.alignRight);
            progress.render(Types.HP, data.bpm, 200, heartProgress, progress.type.inverted);
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
