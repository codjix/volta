"use client";
import {
  Alert,
  LoadingOverlay,
  Modal,
  Portal,
  Stack,
  TextInput,
} from "@mantine/core";
import { Icon } from "@iconify/react";
import { FormBtns } from "@/ui/widgets/FormBtns";
import { useHostControl } from "./useHostControl";
import { $SharedProps } from "./index";

export const ModalView = (props: $SharedProps) => {
  const { Form, mutation, error } = useHostControl(props);

  return (
    <Portal>
      <Modal
        opened={props.isOpen}
        onClose={props.close}
        title={props.hostAction + " Host"}
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
              label="Domain"
              placeholder="ex: example.com"
              {...Form.getInputProps("domain")}
              key={Form.key("domain")}
              data-autofocus
              withAsterisk
            />
            <TextInput
              label="Target IP"
              placeholder="ex: 172.0.0.2"
              {...Form.getInputProps("ip")}
              key={Form.key("ip")}
              withAsterisk
            />
            <FormBtns submit={props.hostAction} />
          </Stack>
        </form>
      </Modal>
    </Portal>
  );
};
