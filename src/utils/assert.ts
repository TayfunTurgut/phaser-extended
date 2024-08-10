import { Renderer } from "phaser";

export function assert(label: string, condition: boolean): asserts condition {
  if (!condition) {
    throwError(`${label} failed with condition: ${condition}`);
  }
}

export function assertIsDefined<T>(value: T): asserts value is NonNullable<T> {
  assert("is defined", value !== undefined && value !== null);
}

export function assertWebGL(
  renderer: Renderer.WebGL.WebGLRenderer | Renderer.Canvas.CanvasRenderer,
): asserts renderer is Renderer.WebGL.WebGLRenderer {
  assert(
    "is an instance of WebGLRenderer",
    renderer instanceof Renderer.WebGL.WebGLRenderer,
  );
}

export function todo(): never {
  throwError("Not yet implemented");
}

export function assertUnreachable(): never {
  throwError("Unreachable code reached");
}

export function throwError(message?: string): never {
  throw new Error(message);
}
