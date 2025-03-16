export interface IWhiteboardElement {
  type: string;
  offsetX: number;
  offsetY: number;
  path: [number, number][];
  stroke: string;
}

export interface IDrawData {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  color: string;
}
