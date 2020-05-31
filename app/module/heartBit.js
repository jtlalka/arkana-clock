import * as screen from "../platform/screen";
import * as heartRate from "../platform/heartRate";
import * as permission from "../platform/permission";

export function register() {
    if (permission.check(permission.type.heartRate)) {
        screen.initialize(function (data) {
            if (data.active) {
                heartRate.start();
            } else {
                heartRate.stop();
            }
        });
    }
}

export function fetch(callback) {
    heartRate.fetch(function (data) {
        callback({
            bpm: data.present ? data.heartRate : "---",
            timestamp: data.timestamp
        });
    })
}
