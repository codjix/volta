"use client";
import { usePathname } from "next/navigation";
import { ActionIcon, NavLink } from "@mantine/core";
import { Icon } from "@iconify/react";
import Link from "next/link";
import menuItems from "@app/menu.json";

type $NavItems = {
  close: () => void;
};
export const NavItems = ({ close }: $NavItems) => {
  const pathname = usePathname();

  return menuItems.map(({ href, label, icon }, key) => (
    <NavLink
      key={key}
      onClick={close}
      component={Link}
      active={pathname == href}
      {...{ href, label }}
      style={{ borderRadius: 5 }}
      leftSection={
        <ActionIcon
          variant="transparent"
          color={pathname == href ? undefined : "gray"}
          children={<Icon height={25} icon={icon} />}
          size="lg"
        />
      }
    />
  ));
};
