"use client";
import {
  AppShell,
  Container,
  Divider,
  Group,
  Stack,
  Title,
  Image,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { UserMenu } from "./UserMenu";
import { NavItems } from "./NavItems";
import { CustomBurger } from "./CustomBurger";
import { SaveChanges } from "./SaveChanges";
import ThemeSwitcher from "../widgets/ThemeSwitcher";
import Affix from "../widgets/Affix";
import logo from "@/images/logo-192.png";

type $DashLayout = {
  children?: React.ReactNode;
  normal?: boolean;
};
export const DashLayout = ({ children, normal }: $DashLayout) => {
  const [isOpen, { toggle, close }] = useDisclosure();

  const navProps = {
    width: 300,
    breakpoint: "sm",
    collapsed: { mobile: !isOpen, desktop: isOpen },
  };

  return (
    <AppShell
      disabled={!normal}
      header={{ height: 60 }}
      navbar={normal ? navProps : undefined}
      layout="alt"
      h="100%"
    >
      <AppShell.Header>
        <Group h={60} px={20} gap={20} justify="space-between">
          <Group justify="center">
            <CustomBurger isOpen={isOpen} toggle={toggle} />
            <Image h={34} src={logo.src} visibleFrom="xs" />
            <Title order={3}>VoltaLink</Title>
          </Group>
          <Group>
            <SaveChanges />
            <ThemeSwitcher />
            <UserMenu />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <Group h={59} px={20} gap={20} hiddenFrom="sm" justify="space-between">
          <Group justify="center">
            <CustomBurger isOpen={isOpen} toggle={toggle} />
            <Title order={3}>VoltaLink</Title>
          </Group>
          <UserMenu />
        </Group>
        <Divider hiddenFrom="sm" />
        <Stack gap={10} p={20}>
          <NavItems close={close} />
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main h="100%">
        <Container
          p={20}
          h="100%"
          maw={1200}
          style={{ container: "pageContent / inline-size" }}
          children={children}
        />
        <Affix />
      </AppShell.Main>
    </AppShell>
  );
};
