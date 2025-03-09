import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import rough from "roughjs";
import { IWhiteboardElement } from "../types";

export function useWhiteboard(color: string) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const [elements, setElements] = useState<IWhiteboardElement[]>([]);
  const [history, setHistory] = useState<IWhiteboardElement[]>([]);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const { offsetX, offsetY } = e.nativeEvent;

      setElements((prevElements) => [
        ...prevElements,
        {
          type: "pencil",
          offsetX,
          offsetY,
          path: [[offsetX, offsetY]],
          stroke: color,
        },
      ]);
      setIsDrawing(true);
    },
    [color],
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!isDrawing || elements.length === 0) return;

      const { offsetX, offsetY } = e.nativeEvent;
      setElements((prevElements) => {
        const newElements = [...prevElements];
        newElements[newElements.length - 1] = {
          ...newElements[newElements.length - 1],
          path: [
            ...newElements[newElements.length - 1].path,
            [offsetX, offsetY],
          ],
        };
        return newElements;
      });
    },
    [isDrawing, elements],
  );

  const onMouseUp = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const onClearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    setElements([]);
    setHistory([]);
  }, []);

  const onUndo = useCallback(() => {
    if (elements.length === 0) return;

    setHistory((prevHistory) => [
      ...prevHistory,
      elements[elements.length - 1],
    ]);
    setElements((prevElements) => prevElements.slice(0, -1));
  }, [elements]);

  const onRedo = useCallback(() => {
    if (history.length === 0) return;

    setElements((prevElements) => [
      ...prevElements,
      history[history.length - 1],
    ]);
    setHistory((prevHistory) => prevHistory.slice(0, -1));
  }, [history]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(2, 2);
      ctx.lineCap = "round";
      ctx.strokeStyle = color;
      ctx.lineWidth = 5;
      contextRef.current = ctx;
    }
  }, []);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = color;
    }
  }, [color]);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const roughCanvas = rough.canvas(canvas);

    elements.forEach((element) => {
      roughCanvas.linearPath(element.path, {
        stroke: element.stroke,
        roughness: 0,
        strokeWidth: 5,
      });
    });
  }, [elements]);

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
    canvasRef,
    onClearCanvas,
    onUndo,
    disableUndo: elements.length === 0,
    onRedo,
    disableRedo: history.length === 0,
  };
}
