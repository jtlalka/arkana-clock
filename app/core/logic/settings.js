import * as lifeCycle from "../../platform/lifeCycle"
import * as messages from "../../platform/messages"
import * as storage from "../../platform/storage"

const SETTINGS_FILE_NAME = 'settings.cbor';
const SETTINGS_FILE_TYPE = 'cbor';

let settings = {};

export function initialize(settingsCallback) {
    loadSettingsFromStorage();
    registerSettingsSaver();
    registerSettingsObserver(settingsCallback);
    settingsCallback(settings);
}

function loadSettingsFromStorage() {
    settings = storage.loadDateFromFile(SETTINGS_FILE_NAME, SETTINGS_FILE_TYPE);
}

function registerSettingsSaver() {
    lifeCycle.registerOnFinishListener(function () {
        storage.saveDataToFile(SETTINGS_FILE_NAME, SETTINGS_FILE_TYPE, settings);
    });
}

function registerSettingsObserver(callback) {
    messages.registerMessageReceiver(function (msg) {
        settings[msg.data.key] = msg.data.value;
        callback(settings);
    });
}
