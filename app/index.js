import document from "document";

import * as simpleActivity from "./module/activity";
import * as simpleClock from "./module/clock";
import * as simpleHRM from "./module/hrm";
import * as simpleSettings from "./module/settings";

let background = document.getElementById("screen");
let stepCounter = document.getElementById("step-counter");
let stepLevel = document.getElementById("step-level");
let heartCounter = document.getElementById("heart-counter");
let heartLevel = document.getElementById("heart-level");
let dateDisplay = document.getElementById("date-display");
let timeDisplay = document.getElementById("time-display");
let stepSensor = document.getElementById("step-sensor");
let floorSensor = document.getElementById("floor-sensor");
let calorieSensor = document.getElementById("calorie-sensor");
let activitySensor = document.getElementById("activity-sensor");


/* --------- CLOCK ---------- */
function clockCallback(data) {
    //console.log("Clock date: " + data.time + " " + data.date)
}

simpleClock.initialize("minutes", "longDate", clockCallback);

/* ------- ACTIVITY --------- */
function activityCallback(data) {
    //console.log("Activity steps date: " + data.steps.pretty)
    //console.log("Activity calories date: " + data.calories.pretty)
    //console.log("Activity distance date: " + data.distance.pretty)
    //console.log("Activity elevationGain date: " + data.elevationGain.pretty)
    //console.log("Activity activeMinutes date: " + data.activeMinutes.pretty)
}

simpleActivity.initialize("seconds", activityCallback);

/* -------- HRM ------------- */
function hrmCallback(data) {
    //console.log("HRM date: " + data.bpm + " " + data.zone)
}

simpleHRM.initialize(hrmCallback);

/* -------- SETTINGS -------- */
function settingsCallback(data) {
    if (!data) {
        return;
    }
    if (data.backgroundColor) {
        background.style.fill = data.backgroundColor;
    }
    if (data.foregroundColor) {
        stepCounter.style.fill = data.foregroundColor;
        heartCounter.style.fill = data.foregroundColor;
    }
}

simpleSettings.initialize(settingsCallback);
