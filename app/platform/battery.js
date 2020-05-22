import { battery, charger } from "power";
import { clock } from "clock";

/**
 * Battery sensor.
 */
export function initialize(granularity, clockCallback) {
    clock.granularity = granularity;
    clock.addEventListener("tick", function (evt) {
        clockCallback({
            level: battery.chargeLevel,
            connected: charger.connected
        });
    });
}
