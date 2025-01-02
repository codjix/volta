"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, zodResolver } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { createCert, updateCert } from "@/actions/certActions";
import { _certSchema } from "@/lib/zodSchemas";
import { $SharedProps } from "./index";
import { useNotify } from "@/hooks/useNotify";

export const useCertControl = (props: $SharedProps) => {
  const router = useRouter();
  const [error, setError] = useState<string>();
  const toast = useNotify();

  const Form = useForm({
    initialValues: props.certValues,
    validate: zodResolver(_certSchema),
    mode: "uncontrolled",
  });

  const mutation = useMutation({
    mutationFn: (formValues: any) =>
      props.certAction == "Update"
        ? updateCert(props.certId as any, formValues)
        : createCert(formValues),
    onError: (err) => setError(err.message),
    onSuccess(data) {
      // TODO: Add system logs
      if (!data.ok) throw new Error(data.message);
      toast({
        title: "Success",
        message: props.certAction + "d successfully !",
      });
      setError(undefined);
      router.refresh();
      props.close();
      Form.reset();
    },
  });

  return { Form, mutation, error };
};
