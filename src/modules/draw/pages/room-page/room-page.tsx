import React from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Text, VStack } from "@chakra-ui/react";
import rough from "roughjs";
import { Toolbar } from "./components";
import { useToolbar } from "./hooks";
import { styles } from "./room-page.style.ts";
import { IWhiteboardElement } from "./types";

export const RoomPage = () => {
  // Toolbar hooks
  const toolbar = useToolbar();

  // Whiteboard hooks
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [elements, setElements] = useState<IWhiteboardElement[]>([]);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { offsetX, offsetY } = e.nativeEvent;

    setElements((prevElements) => [
      ...prevElements,
      {
        type: "pencil",
        offsetX,
        offsetY,
        path: [[offsetX, offsetY]],
        stroke: toolbar.color,
      },
    ]);

    setIsDrawing(true);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { offsetX, offsetY } = e.nativeEvent;

    if (isDrawing) {
      const { path } = elements[elements.length - 1];
      const newPath: [number, number][] = [...path, [offsetX, offsetY]];

      setElements((prevElements) =>
        prevElements.map((element, index) =>
          index === prevElements.length - 1
            ? { ...element, path: newPath }
            : element,
        ),
      );
    }
  };

  const onMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsDrawing(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.height = window.innerHeight * 2;
    canvas.width = window.innerWidth * 2;

    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = toolbar.color;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    contextRef.current = ctx;
  }, []);

  useEffect(() => {
    contextRef.current.strokeStyle = toolbar.color;
  }, [toolbar.color]);

  useLayoutEffect(() => {
    const roughCanvas = rough.canvas(canvasRef.current);

    elements.forEach((element) => {
      roughCanvas.linearPath(element.path, {
        stroke: element.stroke,
        strokeWidth: 5,
        roughness: 0,
      });
    });
  }, [elements]);

  return (
    <VStack sx={styles.container}>
      {/* Title */}
      <Text as={"h1"}>Whiteboard</Text>

      {/* Toolbar */}
      <Toolbar {...toolbar} />

      {/* Whiteboard */}
      <VStack
        as={"div"}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        style={{
          width: "100%",
          height: "80%",
          border: "solid 1px #000000",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <canvas ref={canvasRef} />
      </VStack>
    </VStack>
  );
};
