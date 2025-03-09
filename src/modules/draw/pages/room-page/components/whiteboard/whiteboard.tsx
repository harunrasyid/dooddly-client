import { VStack } from "@chakra-ui/react";
import { styles } from "./whiteboard.style.ts";
import { IWhiteboardProps } from "./whiteboard.props.ts";

export const Whiteboard = ({
  canvasRef,
  onMouseDown,
  onMouseMove,
  onMouseUp,
}: IWhiteboardProps) => {
  return (
    <VStack
      as={"div"}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      sx={styles.canvas}
    >
      <canvas ref={canvasRef} />
    </VStack>
  );
};
