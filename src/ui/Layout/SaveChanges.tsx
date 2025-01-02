"use client";
import { Icon } from "@iconify/react";
import {
  ActionIcon,
  Button,
  Checkbox,
  Group,
  Modal,
  Stack,
  Text,
  ThemeIcon,
  Tooltip,
} from "@mantine/core";
import { genConfigs } from "@/actions/serviceActions";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useNotify } from "@/hooks/useNotify";

export const SaveChanges = () => {
  const [isOpen, { open, close }] = useDisclosure(false);
  const [reload, setReload] = useState(true);

  const closeModal = () => {
    setReload(true);
    close();
  };

  return (
    <>
      <Modal opened={isOpen} onClose={closeModal} title="Save changes">
        <Stack>
          <Text>
            Are you sure? this will generate and overide the current
            configrations and will be applaied after reloading.
          </Text>
          <Checkbox
            checked={reload}
            label="Reload services ?"
            onChange={() => setReload(!reload)}
          />
          <Group>
            <Button color="red" onClick={closeModal} children="Cancel" />
            <Button
              onClick={() => handleClick(reload, closeModal)}
              children="Yes"
            />
          </Group>
        </Stack>
      </Modal>

      <Tooltip
        withArrow
        position="left"
        arrowPosition="center"
        label="Save changes"
        children={
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            children={<Icon height={25} icon="ic:outline-save" />}
            onClick={open}
          />
        }
      />
    </>
  );
};

function handleClick(reload: boolean, close: () => void) {
  const toast = useNotify();

  genConfigs(reload).then(({ ok, result, message }) => {
    close();

    const successMsg = (
      <Stack gap={5}>
        {result?.map(([success, msg], index) => (
          <Group key={index}>
            <ThemeIcon
              variant="light"
              color={!success ? "red" : undefined}
              children={<Icon icon={success ? "tabler:check" : "tabler:x"} />}
            />
            <Text>{msg}</Text>
          </Group>
        ))}
      </Stack>
    );

    toast({
      title: ok ? "Success !" : "Error !",
      message: ok ? successMsg : message,
      color: !ok ? "red" : undefined,
    });
  });
}
