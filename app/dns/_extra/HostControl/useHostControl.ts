"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, zodResolver } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { createDnsHost, updateDnsHost } from "@/actions/dnsActions";
import { _dnsHostSchema } from "@/lib/zodSchemas";
import { $SharedProps } from "./index";
import { useNotify } from "@/hooks/useNotify";

export const useHostControl = (props: $SharedProps) => {
  const router = useRouter();
  const [error, setError] = useState<string>();
  const toast = useNotify();

  const Form = useForm({
    initialValues: props.hostValues,
    validate: zodResolver(_dnsHostSchema),
    mode: "uncontrolled",
  });

  const mutation = useMutation({
    mutationFn: (formValues: any) =>
      props.hostAction == "Update"
        ? updateDnsHost(props.hostId as any, formValues)
        : createDnsHost(formValues),
    onError: (err) =>
      err.message.includes("UNIQUE constraint failed")
        ? setError("Domain already exists cannot create duplicates")
        : setError(err.message),
    onSuccess(data) {
      // TODO: Add system logs
      if (!data.ok) throw new Error(data.message);
      toast({
        title: "Success",
        message: props.hostAction + "d successfully !",
      });
      setError(undefined);
      router.refresh();
      props.close();
      Form.reset();
    },
  });

  return { Form, mutation, error };
};
