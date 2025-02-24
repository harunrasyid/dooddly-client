import { useState } from "react";
import {
  Button,
  VStack,
  HStack,
  Input,
  Heading,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { styles } from "./join-room-page.style.ts";

export const JoinRoomPage = () => {
  const [createRoomData, setCreateRoomData] = useState({
    name: "",
    roomCode: "",
  });
  const [joinRoomData, setJoinRoomData] = useState({ name: "", roomCode: "" });

  const handleCreateRoom = () => {
    console.log("Creating room with: ", createRoomData);
  };

  const handleJoinRoom = () => {
    console.log("Joining room with: ", joinRoomData);
  };

  return (
    <VStack sx={styles.container}>
      <HStack sx={styles.wrapper}>
        {/* Create Room Column */}
        <VStack sx={styles.box}>
          <Heading size="lg">Create Room</Heading>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Enter your name"
              value={createRoomData.name}
              onChange={(e) =>
                setCreateRoomData({ ...createRoomData, name: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Room Code</FormLabel>
            <Input
              placeholder="Enter room code"
              value={createRoomData.roomCode}
              onChange={(e) =>
                setCreateRoomData({
                  ...createRoomData,
                  roomCode: e.target.value,
                })
              }
            />
          </FormControl>
          <Button colorScheme="blue" width="full" onClick={handleCreateRoom}>
            Create Room
          </Button>
        </VStack>

        {/* Join Room Column */}
        <VStack sx={styles.box}>
          <Heading size="lg">Join Room</Heading>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Enter your name"
              value={joinRoomData.name}
              onChange={(e) =>
                setJoinRoomData({ ...joinRoomData, name: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Room Code</FormLabel>
            <Input
              placeholder="Enter room code"
              value={joinRoomData.roomCode}
              onChange={(e) =>
                setJoinRoomData({ ...joinRoomData, roomCode: e.target.value })
              }
            />
          </FormControl>
          <Button colorScheme="green" width="full" onClick={handleJoinRoom}>
            Join Room
          </Button>
        </VStack>
      </HStack>
    </VStack>
  );
};
