import React, { useEffect, useRef, useState } from "react";
import { useSocket } from "@/socket";
import { IDrawData } from "../types";

export function useWhiteboard(color: string, room: string) {
  const socket = useSocket();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [history, setHistory] = useState<IDrawData[][]>([]);
  const [redoStack, setRedoStack] = useState<IDrawData[][]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.emit("joinRoom", room);

    socket.on("draw", (drawData: IDrawData) => drawOnCanvas(drawData));
    socket.on("loadHistory", (historyData: IDrawData[][]) => {
      setHistory(historyData);
      redrawCanvas(historyData);
    });

    return () => {
      socket.off("draw");
      socket.off("loadHistory");
    };
  }, [socket, room]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();

    setIsDrawing(true);
    lastPosRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      setRedoStack([]); // Clear redo stack on new draw
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas || !lastPosRef.current) return;
    const rect = canvas.getBoundingClientRect();

    const drawData: IDrawData = {
      prevX: lastPosRef.current.x,
      prevY: lastPosRef.current.y,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      color,
    };

    setHistory((prev) => [...prev, [drawData]]);
    drawOnCanvas(drawData);
    socket.emit("draw", { room, drawData });

    lastPosRef.current = { x: drawData.x, y: drawData.y };
  };

  const drawOnCanvas = (drawData: IDrawData) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = drawData.color;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(drawData.prevX, drawData.prevY);
    ctx.lineTo(drawData.x, drawData.y);
    ctx.stroke();
  };

  const undo = () => {
    if (history.length === 0) return;
    const lastDraw = history.pop();
    setRedoStack((prev) => [...prev, lastDraw!]);
    setHistory([...history]);
    redrawCanvas(history);
    socket.emit("undo", room);
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const lastRedo = redoStack.pop();
    setHistory((prev) => [...prev, lastRedo!]);
    drawOnCanvas(lastRedo![0]);
    socket.emit("redo", room);
  };

  const redrawCanvas = (drawHistory: IDrawData[][]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHistory.forEach((stroke) => stroke.forEach(drawOnCanvas));
  };

  return {
    startDrawing,
    stopDrawing,
    canvasRef,
    draw,
    onUndo: undo,
    onRedo: redo,
    disableUndo: history.length === 0,
    disableRedo: redoStack.length === 0,
  };
}
