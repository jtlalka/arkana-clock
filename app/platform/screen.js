// noinspection NpmUsedModulesInstalled
import { display } from "display";

export function initialize(callback) {
    display.addEventListener("change", function () {
        updateCallback(callback);
    });
    updateCallback(callback);
}

function updateCallback(callback) {
    callback({
        present: display.on,
        aodActive: display.aodActive,
        aodAvailable: display.aodAvailable,
        isActivatedByUser: display.on && !display.aodActive
    });
}

export function enableAlwaysOnMode() {
    if (display.aodAvailable) {
        display.aodAllowed = true;
    }
}
