"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, zodResolver } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { createProxyHost, updateProxyHost } from "@/actions/proxyActions";
import { _proxyHostSchema } from "@/lib/zodSchemas";
import { $SharedProps } from "./index";
import { useNotify } from "@/hooks/useNotify";

export const useHostControl = (props: $SharedProps) => {
  const router = useRouter();
  const [error, setError] = useState<string>();
  const toast = useNotify();

  const Form = useForm({
    // initialValues are undefined by default,
    // ws & protocol are required for defaults
    initialValues: { ws: true, protocol: "http", ...props.hostValues },
    validate: zodResolver(_proxyHostSchema),
    mode: "uncontrolled",
  });

  const mutation = useMutation({
    mutationFn: (formValues: any) =>
      props.hostAction == "Update"
        ? updateProxyHost(props.hostId as any, formValues)
        : createProxyHost(formValues),
    onError: (err) =>
      err.message.includes("UNIQUE constraint failed")
        ? setError("Domain already exists cannot create duplicates")
        : setError(err.message),
    onSuccess(data) {
      // TODO: Add system logs
      if (!data.ok) throw new Error(data.message);
      setError(undefined);
      toast({
        title: "Success",
        message: props.hostAction + "d successfully !",
      });
      router.refresh();
      props.close();
      Form.reset();
    },
  });

  return { Form, mutation, error };
};
