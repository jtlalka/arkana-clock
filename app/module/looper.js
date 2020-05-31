import * as cache from "../../common/cache";
import * as colors from "../../common/colors";
import * as clock from "../platform/clock";
import * as settings from "../platform/settings";

export function register() {
    settings.initialize(function (data) {
        console.log("Settings date: " + data);

        if (data) {
            colors.setForegroundColor(data['foregroundColor']);
            colors.setBackgroundColor(data['backgroundColor']);
            cache.clearCache();
        }
    });
}

export function run(callback) {
    clock.initialize(clock.granularity.seconds, callback);
}
