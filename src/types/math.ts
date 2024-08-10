import { Math } from "phaser";

export type TNumberTuple2 = [number, number];
export type TNumberTuple3 = [number, number, number];

export type TPrimitive = string | number | boolean;

export const Vector2 = Math.Vector2;
export type TVector2 = InstanceType<typeof Vector2>;
