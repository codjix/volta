"use client";
import { Box, BoxProps } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ModalView } from "./ModalView";
import { dnsHosts } from "@db/schema";

type $ReqProps = {
  hostAction: "Create" | "Update";
  hostValues?: Partial<typeof dnsHosts.$inferInsert>;
  hostId?: typeof dnsHosts.$inferInsert.id;
};

export interface $SharedProps extends $ReqProps {
  close: () => void;
  isOpen: boolean;
}

interface $HostControl extends BoxProps, $ReqProps {
  children?: React.ReactNode;
}

export const HostControl = (props: $HostControl) => {
  const [isOpen, { open, close }] = useDisclosure(false);
  const { hostAction, hostValues, hostId, ...boxProps } = props;

  return (
    <>
      <Box onClick={open}>
        <Box {...boxProps} />
      </Box>
      <ModalView {...{ isOpen, close, hostAction, hostValues, hostId }} />
    </>
  );
};
