"use client";
import {
  Button,
  Checkbox,
  Group,
  Menu,
  Modal,
  Portal,
  Stack,
  Text,
} from "@mantine/core";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { deleteCert } from "@/actions/certActions";
import { useNotify } from "@/hooks/useNotify";
import { useState } from "react";

export const DeleteCert = ({ certId }: { certId: string }) => {
  const router = useRouter();
  const [isOpen, { open, close }] = useDisclosure(false);
  const [force, setForce] = useState(false);
  const toast = useNotify();

  const delEntry = () =>
    deleteCert(certId, force).then(({ ok }) => {
      // TODO: Add system logs
      ok
        ? toast({ title: "Success", message: "Deleted successfully !" })
        : toast({
            title: "Error",
            message: "Cannot delete certifcate !",
            color: "red",
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
        <Modal title="Delete Cert" onClose={close} opened={isOpen} centered>
          <Stack>
            <Text>Are you sure you want to delete this cert?</Text>
            <Checkbox
              label="Force delete"
              description="Check to free certificate from dependencies before deleting."
              onChange={() => setForce(!force)}
              checked={force}
            />
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
