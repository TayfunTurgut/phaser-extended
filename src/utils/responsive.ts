import { Events, Scale, Structs } from "phaser";
import { TNumberTuple2 } from "@/types/math";

export const RESIZE_EVENT = "resize";

const sizeCache = new Structs.Size();

export const getScreenSize = (): TNumberTuple2 => [
  sizeCache.width,
  sizeCache.height,
];

const cache = new Set<Events.EventEmitter>();

export const resize = (events: Events.EventEmitter) => {
  if (!cache.has(events)) return;
  events.emit(RESIZE_EVENT);
};

export const addResizeListener = (events: Events.EventEmitter) => {
  cache.add(events);
  resize(events);
};

export const removeResizeListener = (events: Events.EventEmitter) => {
  cache.delete(events);
};

export const onResize = (
  manager: Scale.ScaleManager,
  width: number,
  height: number,
) => {
  manager.resize(width, height);
  sizeCache.resize(width, height);
  for (const events of cache.values()) {
    resize(events);
  }
};
