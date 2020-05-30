import { battery, charger } from "power";

/**
 * Battery data.
 */
export function fetch(callback) {
    callback({
        connected: charger['connected'],
        level: battery['chargeLevel'],
        limit: 100
    });
}
