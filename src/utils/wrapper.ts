import { assert, assertIsDefined } from "./assert";
import CWrapper, {
  CWrapperConstructor,
  IWrappable,
} from "../components/atoms/wrapper";

export const getWrapper = <
  T extends IWrappable,
  K extends CWrapper<T>,
  L extends CWrapperConstructor<T>,
>(
  go: T,
  constructor: L,
) => {
  const wrapper = go.getData(constructor.name);
  assertIsDefined(wrapper);
  assert("is instance of the constructor", wrapper instanceof constructor);
  return wrapper as K;
};
