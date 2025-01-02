"use client";
import { FloatingPosition, Menu } from "@mantine/core";

export type $Dropdown = {
  target?: React.ReactNode;
  children?: React.ReactNode;
  pos?: FloatingPosition;
};

const Dropdown = ({ target, children, pos }: $Dropdown) => {
  return (
    <Menu
      shadow="sm"
      position={pos ?? "bottom-end"}
      withArrow
      arrowPosition="center"
    >
      <Menu.Target>{target}</Menu.Target>
      <Menu.Dropdown miw={200}>{children}</Menu.Dropdown>
    </Menu>
  );
};

export default Dropdown;
