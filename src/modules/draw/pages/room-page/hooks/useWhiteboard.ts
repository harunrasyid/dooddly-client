import React, { useEffect, useRef, useState } from "react";
import { useSocket } from "@/socket";
import { IDrawData, ILoadResponse } from "../types";

export function useWhiteboard(color: string, room: string) {
  const socket = useSocket();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const currentStrokeRef = useRef<IDrawData[]>([]); // Store the current stroke

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

    socket.emit("loadHistory", room);

    socket.on("draw", (drawData: IDrawData[]) => {
      setHistory((prev) => [...prev, drawData]); // Save full stroke
      drawData.forEach((dat) => drawOnCanvas(dat));
    });

    socket.on("loadHistory", (response: ILoadResponse) => {
      setHistory(response.history);
      setRedoStack(response.redoStack);
      redrawCanvas(response.history);
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
    currentStrokeRef.current = []; // Reset current stroke
  };

  const stopDrawing = () => {
    if (!isDrawing) return;

    setIsDrawing(false);
    if (currentStrokeRef.current.length > 0) {
      setHistory((prev) => [...prev, currentStrokeRef.current]); // Save full stroke
      socket.emit("draw", { room, drawData: currentStrokeRef.current });
    }
    setRedoStack([]); // Clear redo stack
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

    currentStrokeRef.current.push(drawData); // Add to current stroke
    drawOnCanvas(drawData);

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
    const lastStroke = history.pop();
    setRedoStack((prev) => [...prev, lastStroke!]);
    setHistory([...history]);
    redrawCanvas(history);
    socket.emit("undo", room);
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const lastRedo = redoStack.pop();
    setHistory((prev) => [...prev, lastRedo!]);
    redrawCanvas(history.concat([lastRedo!]));
    socket.emit("redo", room);
  };

  const clearCanvas = () => {
    socket.emit("clear", room);
  };

  const redrawCanvas = (drawHistory: IDrawData[][]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHistory.forEach((stroke) => {
      if (stroke.length > 0) stroke.forEach(drawOnCanvas);
    });
  };

  return {
    startDrawing,
    stopDrawing,
    canvasRef,
    draw,
    onUndo: undo,
    onRedo: redo,
    onClearCanvas: clearCanvas,
    disableUndo: history.length === 0,
    disableRedo: redoStack.length === 0,
  };
}
