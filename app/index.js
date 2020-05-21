import document from "document";

import * as simpleActivity from "./module/activity";
import * as clockModule from "./module/clock";
import * as simpleHRM from "./module/hrm";
import * as simpleSettings from "./module/settings";
import * as utils from "../common/utils"

let background = document.getElementById("screen");
let stepCounter = document.getElementById("step-counter");
let stepProgress = document.getElementById("step-progress");
let heartCounter = document.getElementById("heart-counter");
let heartProgress = document.getElementById("heart-progress");
let hour1Display = document.getElementById("h1-display");
let hour2Display = document.getElementById("h2-display");
let stepSensor = document.getElementById("step-sensor");
let floorSensor = document.getElementById("floor-sensor");
let calorieSensor = document.getElementById("calorie-sensor");
let activitySensor = document.getElementById("activity-sensor");

let numberMatrix = {
    '0': [0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12],
    '1': [2, 4, 7, 9],
    '2': [0, 1, 2, 4, 5, 6, 7, 8, 10, 11, 12],
    '3': [0, 1, 2, 4, 5, 6, 7, 9, 10, 11, 12],
    '4': [0, 2, 3, 4, 5, 6, 7, 9, 12],
    '5': [0, 1, 2, 3, 5, 6, 7, 9, 10, 11, 12],
    '6': [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12],
    '7': [0, 1, 2, 4, 7, 9, 12],
    '8': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    '9': [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12]
}

/* --------- CLOCK ---------- */
clockModule.initialize("minutes", function (data) {
    let digit = utils.getDigit(data.hour, 1)
    let matrix = numberMatrix[digit];

    for (let i = 0; i < hour1Display.children.length; i++) {
        if (utils.isInArray(i, matrix)) {
            hour1Display.children[i].style.fill = 'red';
        } else {
            hour1Display.children[i].style.fill = 'transparent';
        }
    }

    for (let i = 0; i < stepProgress.children.length; i++) {
        if (utils.isInArray(i, matrix)) {
            stepProgress.children[i].style.fill = 'red';
        } else {
            stepProgress.children[i].style.fill = 'inherit';
        }
    }
});

/* ------- ACTIVITY --------- */
simpleActivity.initialize("seconds", function (data) {
    stepCounter.text = data.steps.pretty;

    //console.log("Activity steps date: " + data.steps.pretty)
    //console.log("Activity calories date: " + data.calories.pretty)
    //console.log("Activity distance date: " + data.distance.pretty)
    //console.log("Activity elevationGain date: " + data.elevationGain.pretty)
    //console.log("Activity activeMinutes date: " + data.activeMinutes.pretty)
});

/* -------- HRM ------------- */
simpleHRM.initialize(function (data) {
    heartCounter.text = data.bpm;

    //console.log("HRM date: " + data.bpm + " " + data.zone)
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
