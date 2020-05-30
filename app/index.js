// noinspection NpmUsedModulesInstalled
import document from "document";

import * as clockModule from "./platform/clock";
import * as simpleHRM from "./platform/hrm";
import * as simpleSettings from "./platform/settings";
import * as battery from "./platform/battery";
import * as progress from "./module/progress";
import * as display from "./module/display";
import * as sensors from "./module/sensors";

// data types
const Types = {
    HH: "cache.hours",
    TS: "cache.time.separator",
    MI: "cache.minutes",
    DD: "cache.days",
    DS: "cache.date.separator",
    MO: "cache.months",
    GO: "cache.main.goal",
    GV: "cache.main.goal.value",
    HR: "cache.heart.rate",
    HV: "cache.heart.rate.value",
    AM: "cache.active.minutes",
    ST: "cache.steps",
    FL: "cache.floors",
    CA: "cache.calories"
}

let background = document.getElementById("screen");

// counter
let stepDisplay = [
    document.getElementById("step2-display"),
    document.getElementById("step1-display"),
    document.getElementById("step0-display")
];
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


/* --------- CLOCK ---------- */
clockModule.initialize(clockModule.granularity.minutes, function (data) {
    display.render(Types.HH, data.hour, [hour1Display, hour0Display]);
    display.render(Types.TS, display.FULL, [timeSepDisplay]);
    display.render(Types.MI, data.minute, [minute1Display, minute0Display]);

    display.render(Types.DD, data.day, [day1Display, day0Display], display.type.alignRight);
    display.render(Types.DS, display.FULL, [dateSepDisplay]);
    display.render(Types.MO, data.month, [month1Display, month0Display]);

    sensors.fetch(function (data) {
        progress.render(Types.AM, data.activeMinutes.today, data.activeMinutes.goal, activitySensor);
        progress.render(Types.ST, data.steps.today, data.steps.goal, stepSensor);
        progress.render(Types.FL, data.floors.today, data.floors.goal, floorSensor);
        progress.render(Types.CA, data.calories.today, data.calories.goal, calorieSensor);
    });

    battery.fetch(function (data) {
        display.render(Types.GV, data.level, stepDisplay, display.type.alignLeft);
        progress.render(Types.GO, data.level, data.limit, stepProgress, true);
    })
});


/* -------- HRM ------------- */
simpleHRM.initialize(function (data) {
    display.render(Types.HV, data.bpm, heartDisplay, display.type.alignRight);
    progress.render(Types.HR, data.bpm, 220, heartProgress, true);
});


/* -------- SETTINGS -------- */
simpleSettings.initialize(function (data) {
    console.log("Settings date: " + data)

    if (data) {
        if (data['backgroundColor']) {
            background.style.fill = data['backgroundColor'];
        }
        if (data['foregroundColor']) {
        }
    }
});
