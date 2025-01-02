"use client";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { Button, Group, Menu, Modal, Portal, Stack, Text } from "@mantine/core";
import { deleteDnsHost } from "@/actions/dnsActions";
import { useDisclosure } from "@mantine/hooks";
import { useNotify } from "@/hooks/useNotify";

export const DeleteDns = ({ hostId }: { hostId: string }) => {
  const router = useRouter();
  const [isOpen, { open, close }] = useDisclosure(false);
  const toast = useNotify();

  const delEntry = () =>
    deleteDnsHost(hostId).then(() => {
      // TODO: Add system logs
      toast({
        title: "Success",
        message: "Deleted successfully !",
      });
      router.refresh();
      close();
    });

  return (
    <>
      <Menu.Item
        color="red"
        children="Delete"
        leftSection={<Icon height={20} icon="tabler:trash" />}
        onClick={open}
      />
      <Portal>
        <Modal title="Delete Host" onClose={close} opened={isOpen} centered>
          <Stack>
            <Text>Are you sure you want to delete this host?</Text>
            <Group>
              <Button onClick={close}>Cancel</Button>
              <Button color="red" children="Yes" onClick={delEntry} />
            </Group>
          </Stack>
        </Modal>
      </Portal>
    </>
  );
};
