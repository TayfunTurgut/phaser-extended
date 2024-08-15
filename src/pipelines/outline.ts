import { Display, Game, Renderer } from "phaser";
import { assertIsDefined } from "../utils/assert";

export default class COutlinePipeline extends Renderer.WebGL.Pipelines
  .PostFXPipeline {
  private customActive = false;

  constructor(game: Game) {
    const shader: Display.BaseShader = game.cache.shader.get("outline");
    assertIsDefined(shader);
    super({
      game,
      name: "outline",
      fragShader: shader.fragmentSrc,
    });
  }

  setCustomActive(value: boolean) {
    this.customActive = value;
  }

  onPreRender() {
    this.setBoolean("active", this.customActive);
  }
}
