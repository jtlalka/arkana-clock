// noinspection NpmUsedModulesInstalled
import { battery, charger } from "power";

/**
 * Get current battery level.
 */
export function getBatteryLevel() {
    return battery['chargeLevel'];
}

/**
 * Is battery charging.
 */
export function isCharging() {
    return charger['connected'];
}
