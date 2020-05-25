import { today, primaryGoal, goals } from "user-activity";

const defaultGoals = {
    steps: 1000,
    floors: 10,
    calories: 3000,
    activeMinutes: 30,
    distanceMeters: 8046
}

export function getPrimaryGoal() {
    return primaryGoal;
}

export function getSteps() {
    return {
        today: today.adjusted.steps || 0,
        goal: goals.steps || defaultGoals.steps,
    }
}

export function getFloors() {
    return {
        today: today.local.elevationGain !== undefined ? today.adjusted.elevationGain || 0 : 0,
        goal: goals.elevationGain || defaultGoals.floors
    }
}

export function getCalories() {
    return {
        today: today.adjusted.calories || 0,
        goal: goals.calories || defaultGoals.calories
    }
}

export function getActiveMinutes() {
    return {
        today: today.adjusted.activeMinutes || 0,
        goal: goals.activeMinutes || defaultGoals.activeMinutes
    }
}

export function getDistanceMeters() {
    return {
        today: today.adjusted.distance || 0,
        goal: goals.distance || defaultGoals.distanceMeters
    }
}

export function getDeniedStats() {
    return {
        today: 0,
        goal: undefined
    }
}
