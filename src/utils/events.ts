import { Events } from "phaser";

export const createEventEmitter = () => new Events.EventEmitter();

export const globalEmitter = createEventEmitter();

export const removeListenersByContext = (
  emitter: Events.EventEmitter,
  context: unknown,
) => {
  const events = emitter.eventNames();
  for (const event of events) {
    const listeners = emitter.listeners(event);
    for (const listener of listeners) {
      emitter.off(event, listener, context);
    }
  }
};
