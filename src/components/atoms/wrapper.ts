import { GameObjects, Geom, Scene, Structs, Types } from "phaser";
import { addResizeListener, RESIZE_EVENT } from "@/utils/responsive";
import { addClickListener } from "@/utils/input/click";
import { addHoverListener } from "@/utils/input/hover";
import CContainer from "@/components/atoms/container";

export interface IWrappable extends GameObjects.GameObject {
  getBounds?: () => Geom.Rectangle;
  width?: number;
  height?: number;
}

interface IResponsiveCallbackContext<T> {
  view: T;
  width: number;
  height: number;
}

export type TResponsiveCallback<T> = (
  context: IResponsiveCallbackContext<T>,
) => void;

export type CWrapperConstructor<T extends IWrappable> = new (
  scene: Scene,
) => CWrapper<T>;

export default abstract class CWrapper<T extends IWrappable> {
  protected readonly scene: Scene;
  protected readonly go: T;
  protected parent: CContainer | null = null;

  protected constructor(scene: Scene) {
    this.scene = scene;
    this.go = this.createView();
    this.go.setData(this.constructor.name, this);
    this.onCreate?.();
  }

  abstract init(props?: unknown): T;

  onCreate?(): void;
  onAdd(parent: CContainer) {
    this.parent = parent;
  }
  onUpdate?(): void;
  onRemove() {
    this.parent = null;
  }
  onDestroy() {
    this.parent = null;
  }

  responsive(callback: TResponsiveCallback<T>) {
    this.go.on(
      RESIZE_EVENT,
      (size: Structs.Size) => {
        callback({
          view: this.go,
          width: size.width,
          height: size.height,
        });
      },
      this,
    );
    addResizeListener(this.go);
  }

  setInteractive(config: Types.Input.InputConfiguration = {}) {
    this.go.setInteractive({
      useHandCursor: true,
      pixelPerfect: true,
      ...config,
    });
    addClickListener(this.go);
    addHoverListener(this.go);
  }

  protected abstract createView(): T;

  get view() {
    return this.go;
  }

  get bounds() {
    return this.go.getBounds?.();
  }

  get width() {
    return this.go.width;
  }

  get height() {
    return this.go.height;
  }
}
