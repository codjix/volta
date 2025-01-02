"use client";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "mantine-form-zod-resolver";
import { registerAction } from "@/actions/authActions";
import { _registerSchema } from "@/lib/zodSchemas";
import Cookies from "universal-cookie";

export const useRegister = () => {
  const cookie = new Cookies();
  const [error, setError] = useState<string>();
  const Form = useForm({
    initialValues: { name: "", email: "", password: "" },
    validate: zodResolver(_registerSchema),
  });

  const { mutate, status } = useMutation({
    mutationFn: registerAction,
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
    nameProps: Form.getInputProps("name"),
    emailProps: Form.getInputProps("email"),
    passProps: Form.getInputProps("password"),
    status,
    error,
  };
};
