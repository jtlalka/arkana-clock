import * as activity from "../platform/activity";
import * as permission from "../platform/permission";

export function fetch(callback) {
    if (permission.check(permission.type.activity)) {
        callback({
            primaryGoal: activity.getPrimaryGoal(),
            steps: activity.getSteps(),
            floors: activity.getFloors(),
            calories: activity.getCalories(),
            distance: activity.getDistanceMeters(),
            activeMinutes: activity.getActiveMinutes()
        });
    } else {
        callback({
            primaryGoal: '',
            steps: getDeniedStats(),
            floors: getDeniedStats(),
            calories: getDeniedStats(),
            distance: getDeniedStats(),
            activeMinutes: getDeniedStats()
        });
    }
}

function getDeniedStats() {
    return {
        today: 0,
        goal: undefined
    }
}