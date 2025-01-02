"use client";
import { useState } from "react";
import { useForm, zodResolver } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { loginAction } from "@/actions/authActions";
import { _loginSchema } from "@/lib/zodSchemas";
import Cookies from "universal-cookie";

export const useLogin = () => {
  const cookie = new Cookies();
  const [error, setError] = useState<string>();
  const Form = useForm({
    initialValues: { email: "", password: "" },
    validate: zodResolver(_loginSchema),
  });

  const { mutate, status } = useMutation({
    mutationFn: loginAction,
    onMutate: () => setError(undefined),
    onSuccess: (data) => {
      if (data.ok) {
        cookie.set("token", data.result, { path: "/", maxAge: 60 * 60 * 24 });
        location.reload();
      } else {
        setError(data.message);
      }
    },
  });

  return {
    action: Form.onSubmit((e) => mutate(e)),
    emailProps: Form.getInputProps("email"),
    passProps: Form.getInputProps("password"),
    status,
    error,
  };
};
