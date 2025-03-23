import { VStack } from "@chakra-ui/react";
import { styles } from "./whiteboard.style.ts";
import { IWhiteboardProps } from "./whiteboard.props.ts";

export const Whiteboard = ({
  canvasRef,
  startDrawing,
  stopDrawing,
  draw,
}: IWhiteboardProps) => {
  return (
    <VStack sx={styles.canvas}>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        style={{ cursor: "crosshair" }}
      />
    </VStack>
  );
};
