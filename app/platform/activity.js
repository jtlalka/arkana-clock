// noinspection NpmUsedModulesInstalled
import { today, goals } from "user-activity";

const defaultValue = {
    steps: 1000,
    floors: 10,
    calories: 3000,
    activeMinutes: 22,
    distanceMeters: 8046
}

export function getSteps() {
    return {
        today: today.adjusted.steps || 0,
        goal: goals.steps || defaultValue.steps,
    }
}

export function getFloors() {
    return {
        today: today.adjusted.elevationGain || 0,
        goal: goals.elevationGain || defaultValue.floors
    }
}

export function getCalories() {
    return {
        today: today.adjusted.calories || 0,
        goal: goals.calories || defaultValue.calories
    }
}

export function getActiveMinutes() {
    return {
        today: today.adjusted.activeZoneMinutes.total || 0,
        goal: goals.activeZoneMinutes.total || defaultValue.activeMinutes
    }
}

export function getDistanceMeters() {
    return {
        today: today.adjusted.distance || 0,
        goal: goals.distance || defaultValue.distanceMeters
    }
}
