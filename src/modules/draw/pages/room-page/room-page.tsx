import { useParams } from "react-router-dom";
import { Text, VStack } from "@chakra-ui/react";
import { Toolbar, Whiteboard } from "./components";
import { useToolbar, useWhiteboard } from "./hooks";
import { styles } from "./room-page.style.ts";

export const RoomPage = () => {
  const { roomId } = useParams();

  // Toolbar hooks
  const toolbar = useToolbar();

  // Whiteboard hooks
  const whiteboard = useWhiteboard(toolbar.color, roomId ?? "");

  return (
    <VStack sx={styles.container}>
      {/* Title */}
      <Text as={"h1"}>Whiteboard</Text>

      {/* Toolbar */}
      <Toolbar {...toolbar} {...whiteboard} />

      {/* Whiteboard */}
      <Whiteboard {...whiteboard} />
    </VStack>
  );
};
