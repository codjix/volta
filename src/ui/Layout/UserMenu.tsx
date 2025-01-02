import { Menu, Avatar } from "@mantine/core";
import { useLogout } from "@/hooks/auth";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useContext } from "react";
import { AuthCtx } from "../Auth";

export const UserMenu = () => {
  const session = useContext(AuthCtx);

  return (
    <Menu position="bottom-end">
      <Menu.Target>
        <Avatar size="md" src={session?.avatar} name={session?.name} />
      </Menu.Target>
      <Menu.Dropdown miw={220} p={8}>
        <MenuItems name={session?.name} avatar={session?.avatar} />
      </Menu.Dropdown>
    </Menu>
  );
};

type $MenuItems = {
  name?: string;
  avatar?: string | null | undefined;
};
const MenuItems = ({ name, avatar }: $MenuItems) => {
  const logout = useLogout();

  return (
    <>
      <Menu.Label>Account</Menu.Label>
      <Menu.Item
        component={Link}
        href="/settings?tab=account"
        leftSection={<Avatar size="sm" src={avatar} name={name} />}
      >
        {name}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Label>Application</Menu.Label>
      <Menu.Item
        href="/"
        component={Link}
        leftSection={<Icon height={20} icon="solar:home-smile-angle-outline" />}
      >
        Home
      </Menu.Item>
      <Menu.Item
        href="/settings"
        component={Link}
        leftSection={<Icon height={20} icon="solar:settings-outline" />}
      >
        Settings
      </Menu.Item>
      <Menu.Item
        href="/about"
        component={Link}
        leftSection={<Icon height={20} icon="tabler:info-circle" />}
      >
        About
      </Menu.Item>
      <Menu.Divider />
      <Menu.Label>Session</Menu.Label>
      <Menu.Item
        color="red"
        onClick={logout}
        leftSection={<Icon height={20} icon="tabler:settings" />}
      >
        Logout
      </Menu.Item>
    </>
  );
};
