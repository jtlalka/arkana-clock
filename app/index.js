// noinspection NpmUsedModulesInstalled
import document from "document";

import * as battery from "./platform/battery";
import * as display from "./module/display";
import * as progress from "./module/progress";
import * as sensors from "./module/sensors";
import * as labels from "./module/labels";
import * as looper from "./module/looper";

// data types
const Types = {
    HH: "cache.hours",
    TS: "cache.time.separator",
    MI: "cache.minutes",
    DD: "cache.days",
    DS: "cache.date.separator",
    MO: "cache.months",
    UV: "cache.user.goal.value",
    UP: "cache.user.goal.progress",
    HR: "cache.heart.rate.value",
    HP: "cache.heart.rate.progress",
    AM: "cache.active.minutes",
    ST: "cache.steps",
    FL: "cache.floors",
    CA: "cache.calories",
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
looper.enableAlwaysOnMode();
looper.enableSettingsObserver();
looper.enableScreenObserver();

// looper
looper.run(function (data) {

    labels.display(textLabels, data.labels);
    labels.display(stepDisplay, data.labels);
    labels.display(heartDisplay, data.labels);

    heartProgress.style.display = data.heartRate ? "inline" : "none";
    stepProgress.style.display = data.battery ? "inline" : "none";
    activitySensor.style.display = data.activity ? "inline" : "none";
    stepSensor.style.display = data.activity ? "inline" : "none";
    floorSensor.style.display = data.activity ? "inline" : "none";
    calorieSensor.style.display = data.activity ? "inline" : "none";

    updateDate(data.date);
    updateTime(data.time);
    updateActivity(data.activity);
    updateHeartRate(data.heartRate);
    updateBattery(data.battery);
    updateLabels(data.labels);
});

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

function updateActivity(data) {
    if (data) {
        sensors.fetchActivity(function (data) {
            progress.render(Types.AM, data.activeMinutes.today, data.activeMinutes.goal, activitySensor);
            progress.render(Types.ST, data.steps.today, data.steps.goal, stepSensor);
            progress.render(Types.FL, data.floors.today, data.floors.goal, floorSensor);
            progress.render(Types.CA, data.calories.today, data.calories.goal, calorieSensor);
        });
    }
}

function updateHeartRate(data) {
    if (data) {
        sensors.fetchHeartRate(function (data) {
            display.render(Types.HR, data.bpm, heartDisplay, display.type.alignRight);
            progress.render(Types.HP, data.bpm, 200, heartProgress, progress.type.inverted);
        });
    }
}

function updateBattery(data) {
    if (data) {
        battery.fetch(function (data) {
            display.render(Types.UV, data.level, stepDisplay, display.type.alignLeft);
            progress.render(Types.UP, data.level, data.limit, stepProgress, progress.type.inverted);
        });
    }
}

function updateLabels(data) {
    if (data) {
        labels.render(Types.LC, textLabels);
    }
}
