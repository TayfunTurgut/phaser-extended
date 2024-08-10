import { type Input } from "phaser";

type TKeyCodes = typeof Input.Keyboard.KeyCodes;
export type TKeyCodeKey = keyof TKeyCodes;
export type TKeyCodeValue<T extends TKeyCodeKey> = TKeyCodes[T];
