// noinspection NpmUsedModulesInstalled
import document from "document";

import * as simpleActivity from "./platform/activity";
import * as clockModule from "./platform/clock";
import * as simpleHRM from "./platform/hrm";
import * as simpleSettings from "./platform/settings";
import * as battery from "./platform/battery";
import * as counter from "./module/counter";
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
    HR: "cache.heart.rate",
    ST: "cache.steps",
    FL: "cache.floors",
    CA: "cache.calories",
    AM: "cache.active.minutes"
}

let background = document.getElementById("screen");

// counter
let stepCounter = document.getElementById("step-counter");
let stepProgress = document.getElementById("step-progress");
let heartCounter = document.getElementById("heart-counter");
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
let stepSensor = document.getElementById("step-sensor");
let floorSensor = document.getElementById("floor-sensor");
let calorieSensor = document.getElementById("calorie-sensor");
let activitySensor = document.getElementById("activity-sensor");


/* --------- CLOCK ---------- */
clockModule.initialize(clockModule.granularity.minutes, function (data) {
    display.render(Types.HH, data.hour, [hour1Display, hour0Display]);
    display.render(Types.TS, display.FULL, [timeSepDisplay]);
    display.render(Types.MI, data.minute, [minute1Display, minute0Display]);

    display.render(Types.DD, data.day, [day1Display, day0Display], true);
    display.render(Types.DS, display.FULL, [dateSepDisplay]);
    display.render(Types.MO, data.month, [month1Display, month0Display]);

    sensors.fetch(function (data) {
        counter.render(Types.ST, data.steps.today, data.steps.goal, stepSensor);
        counter.render(Types.FL, data.floors.today, data.floors.goal, floorSensor);
        counter.render(Types.CA, data.calories.today, data.calories.goal, calorieSensor);
        counter.render(Types.AM, data.activeMinutes.today, data.activeMinutes.goal, activitySensor);
    });
});


/* -------- HRM ------------- */
simpleHRM.initialize(function (data) {
    heartCounter.text = data.bpm;
    counter.render(Types.HR, data.bpm, 220, heartProgress, true);
});


/* -------- Battery ------------- */
battery.initialize(clockModule.granularity.seconds, function (data) {
    stepCounter.text = Math.floor(data.level) + '%';
    counter.render(Types.GO, data.level, 100, stepProgress, true);
});


/* -------- SETTINGS -------- */
simpleSettings.initialize(function (data) {
    console.log("Settings date: " + data)

    if (data) {
        if (data['backgroundColor']) {
            background.style.fill = data['backgroundColor'];
        }
        if (data['foregroundColor']) {
            stepCounter.style.fill = data['foregroundColor'];
            heartCounter.style.fill = data['foregroundColor'];
        }
    }
});
