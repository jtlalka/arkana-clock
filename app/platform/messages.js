// noinspection NpmUsedModulesInstalled
import * as messaging from "messaging";

export function registerMessageListener(messageCallback) {
    messaging.peerSocket.addEventListener('message', messageCallback);
}
