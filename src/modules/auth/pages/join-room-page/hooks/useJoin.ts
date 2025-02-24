import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ICreateRoomForm, IJoinRoomForm } from "@/modules";

export function useJoin() {
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
    console.log(data);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
}
