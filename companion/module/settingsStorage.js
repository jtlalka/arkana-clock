import * as messaging from "messaging";
import { settingsStorage } from "settings";

export function initialize() {
    settingsStorage.addEventListener("change", function(evt) {
        if (evt.oldValue !== evt.newValue) {
            sendValue(evt.key, evt.newValue);
        }
    });
}

function sendValue(key, value) {
    if (value) {
        sendSettingData({
            key: key,
            value: JSON.parse(value)
        });
    }
}

function sendSettingData(data) {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        messaging.peerSocket.send(data);
    } else {
        console.log("No peerSocket connection.");
    }
}
