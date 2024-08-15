import { Events, Input } from "phaser";

export const EVENT_HOVER = "hover";

const map = new Map<Events.EventEmitter, boolean>();

const onHoverEnd = (emitter: Events.EventEmitter) => {
  if (!map.get(emitter)) return;
  map.set(emitter, false);
  emitter.emit(EVENT_HOVER, false);
};

export const addHoverListener = (emitter: Events.EventEmitter) => {
  emitter.on(
    Input.Events.GAMEOBJECT_POINTER_OVER,
    () => {
      if (!map.get(emitter)) {
        map.set(emitter, true);
        emitter.emit(EVENT_HOVER, true);
      }
    },
    emitter,
  );
  emitter.on(
    Input.Events.GAMEOBJECT_POINTER_DOWN,
    () => {
      onHoverEnd(emitter);
    },
    emitter,
  );
  emitter.on(
    Input.Events.GAMEOBJECT_POINTER_OUT,
    () => {
      onHoverEnd(emitter);
    },
    emitter,
  );
  emitter.on(
    Input.Events.GAME_OUT,
    () => {
      onHoverEnd(emitter);
    },
    emitter,
  );
};
