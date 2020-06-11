import * as activity from "../../platform/activity";
import * as battery from "../../platform/battery";
import * as heartRate from "../../platform/heartRate";
import * as permission from "../../platform/permission";

export function activate() {
    if (permission.check(permission.type.heartRate)) {
        heartRate.start();
    }
}

export function deactivate() {
    if (permission.check(permission.type.heartRate)) {
        heartRate.stop();
    }
}

export function fetchActivity(callback) {
    if (permission.check(permission.type.activity)) {
        callback({
            steps: activity.getSteps(),
            floors: activity.getFloors(),
            calories: activity.getCalories(),
            distance: activity.getDistanceMeters(),
            activeMinutes: activity.getActiveMinutes()
        });
    } else {
        callback({
            steps: getDeniedStats(),
            floors: getDeniedStats(),
            calories: getDeniedStats(),
            distance: getDeniedStats(),
            activeMinutes: getDeniedStats()
        });
    }
}

function getDeniedStats() {
    return {
        today: 0,
        goal: undefined
    }
}

export function fetchHeartRate(callback) {
    heartRate.fetch(function (data) {
        callback({
            bpm: data.present ? data.heartRate : "---",
            timestamp: data.timestamp,
            limit: 200
        });
    });
}

export function fetchBatteryData(callback) {
    callback({
        connected: battery.isCharging(),
        level: battery.getBatteryLevel(),
        limit: 100
    });
}
