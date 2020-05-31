import { display } from "display";

export function initialize(callback) {
    display.addEventListener("change", function () {
        updateCallback(callback);
    });

    if (display.on) {
        updateCallback(callback);
    }
}

function updateCallback(callback) {
    callback({
        active: display.on,
        aodActive: display.aodActive,
        aodAvailable: display.aodAvailable
    });
}
