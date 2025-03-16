import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";
import { ICreateRoomForm, IJoinRoomForm } from "@/modules";
import { generateUUID } from "@/utils";
import { useSocket } from "@/socket";

export function useJoin() {
  // Socket context hook
  const socket = useSocket();

  // Navigation
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name are required!"),
    roomCode: yup.string().required("Room code is required!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IJoinRoomForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: ICreateRoomForm) => {
    socket.emit("userJoinRoom", data, {
      ...data,
      userId: generateUUID(),
      host: false,
      presenter: false,
    });

    socket.on("userIsJoined", (response) => {
      if (response.success) {
        console.log("User joined successfully");
        navigate(`/${data.roomCode}`);
      } else console.log("Error when user trying to join");
    });
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
}
