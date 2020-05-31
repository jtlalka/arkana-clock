import { HeartRateSensor } from "heart-rate";
import { BodyPresenceSensor } from "body-presence";

const bodySensor = new BodyPresenceSensor();
const rateSensor = new HeartRateSensor();

export function initialize(callback) {
    if (isBodySensorEnabled()) {
        bodySensor.addEventListener("reading", function () {
            updateReceiver(callback);
        });
    }
    if (isHeartRateEnabled()) {
        rateSensor.addEventListener("reading", function () {
            updateReceiver(callback);
        });
    }
}

function isBodySensorEnabled() {
    return BodyPresenceSensor || false;
}

function isHeartRateEnabled() {
    return HeartRateSensor || false;
}

function updateReceiver(callback) {
    callback({
        bpm: rateSensor.heartRate,
        timestamp: rateSensor.timestamp,
        present: bodySensor.present
    });
}

export function start() {
    bodySensor.start();
    rateSensor.start();
}

export function stop() {
    bodySensor.stop();
    rateSensor.stop();
}
