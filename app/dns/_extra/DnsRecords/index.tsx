"use client";
import {
  Box,
  Card,
  Stack,
  Group,
  Divider,
  Badge,
  Text,
  Menu,
  ActionIcon,
  Table,
  Center,
  Title,
} from "@mantine/core";
import { Icon } from "@iconify/react";
import CopyBtn from "@/ui/widgets/CopyBtn";
import { dnsHosts } from "@db/schema";
import { DeleteDns, HostControl, ToggleDns } from "../index";
import styles from "./styles.module.scss";

type $DnsRecords = {
  hosts: (typeof dnsHosts.$inferSelect)[];
};
export const DnsRecords = ({ hosts }: $DnsRecords) => {
  if (!hosts?.length) return <NoRecords />;
  return (
    <Box className={styles.grid}>
      {hosts?.map(({ domain, ip, id, updated, enabled }) => (
        <Card withBorder shadow="sm" key={updated}>
          <Stack gap={0}>
            <Group justify="space-between">
              <Text>DNS host #{id.slice(0, 8)}</Text>
              <Menu position="bottom-end">
                <Menu.Target>
                  <ActionIcon size="lg" variant="default">
                    <Icon height="80%" icon="tabler:menu-2" />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown miw={200} p={8}>
                  <Menu.Label>Actions</Menu.Label>
                  <Menu.Item
                    children="Update"
                    leftSection={<Icon height={20} icon="tabler:edit" />}
                    component={HostControl}
                    hostValues={{ domain, ip }}
                    hostAction="Update"
                    hostId={id}
                  />
                  <ToggleDns hostId={id} state={enabled} />
                  <Menu.Label>Danger</Menu.Label>
                  <DeleteDns hostId={id} />
                </Menu.Dropdown>
              </Menu>
            </Group>
            <Divider mt={15} />
            <Table
              data={{
                body: [
                  [<Text>Domain</Text>, Domain(domain)],
                  [<Text>IP</Text>, Ipv4(ip)],
                  [<Text>Status</Text>, Status(enabled)],
                ],
              }}
            />
          </Stack>
        </Card>
      ))}
    </Box>
  );
};

const NoRecords = () => (
  <Card mih={300} component={Center} withBorder shadow="sm">
    <Icon height={150} icon="f7:rectangle-stack-badge-minus" />
    <Title order={3} mt={20} ml={10}>
      No records found
    </Title>
  </Card>
);

const Domain = (domain: string) => (
  <Group gap={5}>
    <Text>{domain}</Text>
    <CopyBtn text={domain} />
  </Group>
);

const Ipv4 = (ip: string) => (
  <Group gap={5}>
    <Text>{ip}</Text>
    <CopyBtn text={ip} />
  </Group>
);

const Status = (enabled: boolean) => (
  <Badge
    h={30}
    radius={10}
    variant="dot"
    color={enabled ? "green" : "red"}
    children={enabled ? "active" : "disabled"}
  />
);
