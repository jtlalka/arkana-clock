import * as screen from "../platform/screen";
import * as heartRate from "../platform/heartRate";
import * as permission from "../platform/permission";

export function initialize(callback) {
    if (permission.check(permission.type.heartRate)) {
        heartRate.initialize(function (data) {
            setupCallback(callback, data);
        });

        screen.initialize(function (data) {
            if (data.active) {
                heartRate.start();
            } else {
                heartRate.stop();
            }
        });
    } else {
        setupCallback(callback, {
            present: false,
            bpm: 0,
            timestamp: 0
        });
    }
}

function setupCallback(callback, data) {
    callback({
        bpm: data.present ? data.bpm : "---",
        timestamp: data.timestamp
    });
}
