import document from "document";

import * as simpleActivity from "./platform/activity";
import * as clockModule from "./platform/clock";
import * as simpleHRM from "./platform/hrm";
import * as simpleSettings from "./platform/settings";
import * as battery from "./platform/battery";
import * as counter from "./module/counter";
import * as display from "./module/display";

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
clockModule.initialize("minutes", function (data) {
    display.render(data.hour, [hour1Display, hour0Display])
    display.render(8, [timeSepDisplay])
    display.render(data.minute, [minute1Display, minute0Display])

    display.render(data.day, [day1Display, day0Display], true)
    display.render(8, [dateSepDisplay])
    display.render(data.month, [month1Display, month0Display])
});

/* ------- ACTIVITY --------- */
simpleActivity.initialize("seconds", function (data) {
    stepCounter.text = data.steps.pretty;
    counter.render(data.steps.raw, 10000, stepProgress, true);

    //console.log("Activity steps date: " + data.steps.pretty)
    //console.log("Activity calories date: " + data.calories.pretty)
    //console.log("Activity distance date: " + data.distance.pretty)
    //console.log("Activity elevationGain date: " + data.elevationGain.pretty)
    //console.log("Activity activeMinutes date: " + data.activeMinutes.pretty)
});

/* -------- HRM ------------- */
simpleHRM.initialize(function (data) {
    //heartCounter.text = data.bpm;

    //console.log("HRM date: " + data.bpm + " " + data.zone)
});

/* -------- Battery ------------- */
battery.initialize("minutes", function(data) {
    heartCounter.text = Math.floor(data.level) + '%';
    counter.render(data.level, 100, heartProgress, true);
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
