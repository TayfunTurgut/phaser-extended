import { MILLI_PER_MIN, MILLI_PER_SEC } from "../constants/time";

export const getMillisFromSeconds = (seconds: number) =>
  seconds * MILLI_PER_SEC;

export const getMillisFromMinutes = (minutes: number) =>
  minutes * MILLI_PER_MIN;

export const getSecondsFromMillis = (millis: number) => millis / MILLI_PER_SEC;

export const getRoundedSecondsFromMillis = (millis: number) =>
  Math.round(getSecondsFromMillis(millis));
