import React, { Ref } from "react";

export interface IWhiteboardProps {
  canvasRef: Ref<HTMLCanvasElement | null>;
  startDrawing: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  stopDrawing: () => void;
  draw: (e: React.MouseEvent<HTMLCanvasElement>) => void;
}
