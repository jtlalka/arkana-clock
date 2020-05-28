import { me } from 'appbit';

export const type = {
    activity: 'access_activity',
    heartRate: 'access_heart_rate',
    userProfile: 'access_user_profile'
}

export function check(type) {
    return me.permissions.granted(type)
}
