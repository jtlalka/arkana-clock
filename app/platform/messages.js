// noinspection NpmUsedModulesInstalled
import * as messaging from "messaging";

export function registerMessageReceiver(messageCallback) {
    messaging.peerSocket.addEventListener('message', messageCallback);
}
