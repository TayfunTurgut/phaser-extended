import { Game, Renderer } from "phaser";
import { assertWebGL } from "@/utils/assert";

export type TPostFXPipeline = new (
  game: Game,
) => Renderer.WebGL.Pipelines.PostFXPipeline;

export const addPostFXPipeline = (
  game: Game,
  name: string,
  pipeline: TPostFXPipeline,
) => {
  assertWebGL(game.renderer);
  game.renderer.pipelines.addPostPipeline(name, pipeline);
};
