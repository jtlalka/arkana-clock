import { me } from 'appbit';

export const type = {
    accessAod: 'access_aod',
    activity: 'access_activity',
    heartRate: 'access_heart_rate'
}

export function check(type) {
    return me.permissions.granted(type)
}
