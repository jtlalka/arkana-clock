import { me } from "appbit";

export const type = {
    activity: "access_activity"
}

export function check(type) {
    return me.permissions.granted(type)
}
