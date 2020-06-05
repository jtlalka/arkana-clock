// noinspection NpmUsedModulesInstalled
import { HeartRateSensor } from "heart-rate";

let rateSensor;
let lastRateTime;
let rateIsActive;

export function start() {
    if (HeartRateSensor && !rateSensor) {
        rateSensor = new HeartRateSensor();
        lastRateTime = 0;
    }
    if (rateSensor) {
        rateSensor.start();
        rateIsActive = true;
    }
}

export function stop() {
    if (rateSensor) {
        rateSensor.stop();
        rateIsActive = false;
    }
}

export function fetch(callback) {
    if (rateSensor && rateIsActive) {
        updateReceiver(callback, rateSensor.heartRate, rateSensor.timestamp);
    } else {
        updateReceiver(callback, 0, 0);
    }
}

function updateReceiver(callback, heartRate, timestamp) {
    callback({
        present: timestamp !== lastRateTime,
        heartRate: heartRate || 0,
        timestamp: timestamp || 0
    });
    lastRateTime = timestamp;
}
