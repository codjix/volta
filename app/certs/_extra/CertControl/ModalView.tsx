"use client";
import {
  Alert,
  LoadingOverlay,
  Modal,
  Portal,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { Icon } from "@iconify/react";
import { FormBtns } from "@/ui/widgets/FormBtns";
import { useCertControl } from "./useCertControl";
import { $SharedProps } from "./index";

export const ModalView = (props: $SharedProps) => {
  const { Form, mutation, error } = useCertControl(props);

  return (
    <Portal>
      <Modal
        opened={props.isOpen}
        onClose={props.close}
        title={props.certAction + " Cert"}
        pos="relative"
        centered
      >
        <form onSubmit={Form.onSubmit((fields) => mutation.mutate(fields))}>
          <Stack>
            <LoadingOverlay visible={mutation.isPending} zIndex={1000} />
            {error && (
              <Alert
                title={error}
                icon={<Icon icon="tabler:info-circle" />}
                color="red"
                radius="md"
              />
            )}
            <TextInput
              label="Name"
              placeholder="ex: acame.com"
              {...Form.getInputProps("name")}
              key={Form.key("name")}
              data-autofocus
              withAsterisk
            />
            <Textarea
              rows={5}
              label="SSL Certificate"
              placeholder="-----BEGIN CERTIFICATE-----"
              {...Form.getInputProps("cert")}
              key={Form.key("cert")}
              withAsterisk
            />
            <Textarea
              rows={5}
              label="Private key"
              placeholder="-----BEGIN PRIVATE KEY-----"
              {...Form.getInputProps("key")}
              key={Form.key("key")}
              withAsterisk
            />
            <FormBtns submit={props.certAction} />
          </Stack>
        </form>
      </Modal>
    </Portal>
  );
};
