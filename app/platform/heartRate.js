import { HeartRateSensor } from "heart-rate";

const INTERVAL_TIME = 1000;

let rateSensor;
let rateCallback;
let lastRateTime;
let intervalId;

export function initialize(callback) {
    if (HeartRateSensor && !rateSensor) {
        rateSensor = new HeartRateSensor();
    }
    rateCallback = callback;
    lastRateTime = 0;
}

export function start() {
    if (!intervalId && rateSensor) {
        rateSensor.start();
        intervalId = setInterval(intervalAction, INTERVAL_TIME);
    }
}

function intervalAction() {
    updateReceiver(rateSensor.heartRate, rateSensor.timestamp);
    lastRateTime = rateSensor.timestamp;
}

function updateReceiver(heartRate, timestamp) {
    rateCallback({
        present: timestamp !== lastRateTime,
        heartRate: heartRate,
        timestamp: timestamp
    });
}

export function stop() {
    if (intervalId && rateSensor) {
        rateSensor.stop();
        clearInterval(intervalId);
        intervalId = null;
    }
}
