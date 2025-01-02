"use client";
import { Box, BoxProps } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { certs, proxyHosts } from "@db/schema";
import { ModalView } from "./ModalView";

type $ReqProps = {
  hostAction: "Create" | "Update";
  hostValues?: Partial<typeof proxyHosts.$inferInsert>;
  hostId?: typeof proxyHosts.$inferInsert.id;
  certs?: (typeof certs.$inferSelect)[];
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
  const { hostAction, hostValues, hostId, certs, ...boxProps } = props;

  return (
    <>
      <Box onClick={open}>
        <Box {...boxProps} />
      </Box>
      <ModalView
        {...{ isOpen, close, hostAction, hostValues, hostId, certs }}
      />
    </>
  );
};
