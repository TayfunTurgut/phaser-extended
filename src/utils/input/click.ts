import { Events, Input } from "phaser";

export const EVENT_CLICK = "click";
const CLICK_DELAY = 200;

const map = new Map<Input.Pointer, number>();

export const addClickListener = (emitter: Events.EventEmitter) => {
  emitter.on(
    Input.Events.GAMEOBJECT_POINTER_DOWN,
    (pointer: Input.Pointer) => {
      map.set(pointer, pointer.event.timeStamp);
    },
    emitter,
  );
  emitter.on(
    Input.Events.GAMEOBJECT_POINTER_UP,
    (pointer: Input.Pointer) => {
      if (map.has(pointer)) {
        const time = pointer.event.timeStamp - map.get(pointer)!;
        if (time <= CLICK_DELAY) {
          emitter.emit(EVENT_CLICK, pointer);
        }
      }
    },
    emitter,
  );
};
