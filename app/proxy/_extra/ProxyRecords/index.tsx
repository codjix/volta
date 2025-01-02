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
  Button,
} from "@mantine/core";
import { Icon } from "@iconify/react";
import CopyBtn from "@/ui/widgets/CopyBtn";
import { DeleteProxy, HostControl, ToggleProxy } from "../index";
import styles from "./styles.module.scss";
import { getProxyHosts } from "@/actions/proxyActions";
import { certs } from "@db/schema";

type $ProxyRecords = Pick<
  Awaited<ReturnType<typeof getProxyHosts>>,
  "result"
> & {
  certs?: (typeof certs.$inferSelect)[];
};
export const ProxyRecords = ({ result, certs }: $ProxyRecords) => {
  if (!result?.length) return <NoRecords />;
  return (
    <Box className={styles.grid}>
      {result?.map(({ id, updated, enabled, ...others }) => (
        <Card withBorder shadow="sm" key={id + updated}>
          <Stack gap={0}>
            <Group justify="space-between">
              <Text>Proxy host #{id.slice(0, 8)}</Text>
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
                    hostValues={others}
                    certs={certs}
                    hostAction="Update"
                    hostId={id}
                  />
                  <ToggleProxy hostId={id} state={enabled} />
                  <Menu.Label>Danger</Menu.Label>
                  <DeleteProxy hostId={id} />
                </Menu.Dropdown>
              </Menu>
            </Group>
            <Divider mt={15} />

            <Table data={HostData({ ...others, enabled })} />
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

const HostData = (others: any) => ({
  body: [
    [<Text>Domains</Text>, Domains(others)],
    [<Text>Target</Text>, Target(others)],
    [<Text>Status</Text>, Status(others)],
  ],
});

const Domains = (host: any) => (
  <Group gap={10}>
    {host.domains.map((domain: string) => (
      <Button
        key={domain}
        component="a"
        target="_blank"
        href={`${host.cert ? "https" : "http"}://${domain}`}
        leftSection={<Icon icon="cuida:open-in-new-tab-outline" />}
        children={domain}
        variant="light"
      />
    ))}
  </Group>
);

const Target = ({ protocol, host, port }: any) => (
  <Group gap={5}>
    {protocol}://{host}:{port}
    <CopyBtn text={`${protocol}://${host}:${port}`} />
  </Group>
);

const Status = (status: any) => (
  <Group gap={10}>
    <Group gap={10}>
      <Badge
        h={30}
        variant="dot"
        color={status.enabled ? "green" : "red"}
        children={status.enabled ? "enabled" : "disabled"}
      />
      <Badge
        h={30}
        variant="dot"
        color={status.ws ? "green" : "red"}
        children="WS"
      />
      <Badge
        h={30}
        variant="dot"
        color={status.cert ? "green" : "red"}
        children="SSL"
      />
    </Group>
  </Group>
);
