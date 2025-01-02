"use client";

import { Icon } from "@iconify/react";
import { ActionIcon } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

type $CustomBurger = {
  isOpen: boolean;
  toggle: () => void;
};
export const CustomBurger = ({ isOpen, toggle }: $CustomBurger) => {
  const isWide = useMediaQuery("(min-width: 768px)");
  return (
    <ActionIcon onClick={toggle} variant="subtle" color="gray" size="lg">
      <Icon
        height={25}
        icon={"mdi:menu-" + ((isWide ? !isOpen : isOpen) ? "open" : "close")}
      />
    </ActionIcon>
  );
};
