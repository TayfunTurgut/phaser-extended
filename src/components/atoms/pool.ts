import CWrapper, {
  CWrapperConstructor,
  IWrappable,
} from "@/components/atoms/wrapper";
import { assertIsDefined } from "@/utils/assert";
import { Scene } from "phaser";

const cache = new Map<
  CWrapperConstructor<IWrappable>,
  CWrapper<IWrappable>[]
>();

export const fromPool = <
  T extends IWrappable,
  L extends CWrapperConstructor<T>,
>(
  constructor: L,
  scene: Scene,
  props?: unknown,
) => {
  if (!cache.has(constructor)) {
    cache.set(constructor, []);
  }
  const wrappers = cache.get(constructor);
  assertIsDefined(wrappers);
  const wrapper = wrappers.pop() ?? new constructor(scene);
  wrapper.init(props);
  return wrapper;
};

export const toPool = <
  T extends IWrappable,
  K extends CWrapper<T>,
  L extends CWrapperConstructor<T>,
>(
  wrapper: K,
) => {
  if (!cache.has(wrapper.constructor as L)) {
    cache.set(wrapper.constructor as L, []);
  }
  const wrappers = cache.get(wrapper.constructor as L);
  assertIsDefined(wrappers);
  wrappers.push(wrapper);
  return wrapper;
};
