"use client";
import { Box, BoxProps } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ModalView } from "./ModalView";
import { certs } from "@db/schema";

type $ReqProps = {
  certAction: "Create" | "Update";
  certValues?: Partial<typeof certs.$inferInsert>;
  certId?: typeof certs.$inferInsert.id;
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
  const { certAction, certValues, certId, ...boxProps } = props;

  return (
    <>
      <Box onClick={open}>
        <Box {...boxProps} />
      </Box>
      <ModalView {...{ isOpen, close, certAction, certValues, certId }} />
    </>
  );
};
