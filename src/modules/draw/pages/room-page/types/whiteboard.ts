export interface IDrawData {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  color: string;
}

export interface ILoadResponse {
  history: IDrawData[][];
  redoStack: IDrawData[][];
}
