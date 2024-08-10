import { GameObjects } from "phaser";
import { TNumberTuple2 } from "@/types/math";

interface IWorldPosTarget {
  parentContainer?: GameObjects.Container;
  x: number;
  y: number;
}

export const getWorldPos = (
  go: IWorldPosTarget,
  pos: TNumberTuple2 = [go.x, go.y],
): TNumberTuple2 => {
  const { parentContainer } = go;
  if (!parentContainer) return pos;
  const [x1, y1] = pos;
  const { x: x2, y: y2, scaleX, scaleY } = parentContainer;
  return getWorldPos(parentContainer, [x1 * scaleX + x2, y1 * scaleY + y2]);
};
