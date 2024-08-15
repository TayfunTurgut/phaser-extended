import { GameObjects, Scene, Structs } from "phaser";
import CWrapper, {
  CWrapperConstructor,
  IWrappable,
} from "../../components/atoms/wrapper";
import { toPool } from "./pool";

export default class CContainer extends CWrapper<GameObjects.Container> {
  private readonly list: CWrapper<IWrappable>[] = [];

  constructor(scene: Scene) {
    super(scene);
  }

  update() {
    for (const child of this.list) {
      child.onUpdate?.();
    }
  }

  add<ChildType extends IWrappable>(
    child: InstanceType<CWrapperConstructor<ChildType>>,
  ) {
    child.view.once(
      GameObjects.Events.DESTROY,
      () => {
        child.onDestroy?.();
      },
      this,
    );
    this.list.push(child);
    this.go.add(child.view);
    child.onAdd(this);
  }

  remove<ChildType extends IWrappable>(
    child: InstanceType<CWrapperConstructor<ChildType>>,
  ) {
    const index = this.list.indexOf(child);
    if (index === -1) return;
    this.list.splice(index, 1);
    this.go.remove(child.view, false);
    child.onRemove?.();
    toPool(child);
  }

  init() {
    return this.go.removeAll(true);
  }

  setSize(size?: Structs.Size) {
    if (!size) {
      const { width, height } = this.go.getBounds();
      size = new Structs.Size(width, height);
    }
    this.go.setSize(size.width, size.height);
  }

  setInteractive(config: Phaser.Types.Input.InputConfiguration = {}) {
    super.setInteractive({
      pixelPerfect: false,
      ...config,
    });
  }

  protected createView(): GameObjects.Container {
    return new GameObjects.Container(this.scene);
  }
}
