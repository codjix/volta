"use client";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { Button, Group, Menu, Modal, Portal, Stack, Text } from "@mantine/core";
import { toggleProxyHost } from "@/actions/proxyActions";
import { Icon } from "@iconify/react";
import { useNotify } from "@/hooks/useNotify";

type $ToggleProxy = {
  hostId: string;
  state: boolean;
};
export const ToggleProxy = ({ hostId, state }: $ToggleProxy) => {
  const router = useRouter();
  const [isOpen, { open, close }] = useDisclosure(false);
  const label = state ? "Disable" : "Enable";
  const toast = useNotify();

  const icon = (
    <Icon
      height={20}
      icon={state ? "solar:pause-outline" : "solar:play-outline"}
    />
  );

  const toggle = () =>
    toggleProxyHost(hostId, state).then(() => {
      // TODO: Add system logs
      toast({
        title: "Success",
        message: label + "d successfully !",
      });
      router.refresh();
      close();
    });

  return (
    <>
      <Menu.Item children={label} leftSection={icon} onClick={open} />
      <Portal>
        <Modal title={label + " Host"} onClose={close} opened={isOpen}>
          <Stack>
            <Text>Are you sure you want to {label} this host?</Text>
            <Group>
              <Button onClick={close}>Cancel</Button>
              <Button
                children="Yes"
                color={state ? "red" : undefined}
                onClick={toggle}
              />
            </Group>
          </Stack>
        </Modal>
      </Portal>
    </>
  );
};
