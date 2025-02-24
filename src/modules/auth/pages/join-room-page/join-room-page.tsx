import {
  Button,
  VStack,
  HStack,
  Input,
  Heading,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useCreate, useJoin } from "./hooks";
import { styles } from "./join-room-page.style.ts";

export const JoinRoomPage = () => {
  // Handle create room form
  const createForm = useCreate();

  // Handle join room form
  const joinForm = useJoin();

  return (
    <VStack sx={styles.container}>
      <HStack sx={styles.wrapper}>
        {/* Create Room */}
        <VStack sx={styles.box}>
          <Heading size="lg">Create Room</Heading>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Enter your name"
              {...createForm.register("name")}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Room Code</FormLabel>
            <Input
              placeholder="Enter room code"
              {...createForm.register("roomCode")}
            />
          </FormControl>
          <Button
            colorScheme="blue"
            width="full"
            onClick={createForm.handleSubmit(createForm.onSubmit)}
          >
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
              {...joinForm.register("name")}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Room Code</FormLabel>
            <Input
              placeholder="Enter room code"
              {...joinForm.register("roomCode")}
            />
          </FormControl>
          <Button
            colorScheme="green"
            width="full"
            onClick={joinForm.handleSubmit(joinForm.onSubmit)}
          >
            Join Room
          </Button>
        </VStack>
      </HStack>
    </VStack>
  );
};
