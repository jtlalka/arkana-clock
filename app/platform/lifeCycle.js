// noinspection NpmUsedModulesInstalled
import { me } from "appbit";

export function registerOnFinishListener(callbackFunction) {
    me.addEventListener('unload', callbackFunction);
}
