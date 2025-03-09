export interface IWhiteboardElement {
  type: string;
  offsetX: number;
  offsetY: number;
  path: [number, number][];
  stroke: string;
}
