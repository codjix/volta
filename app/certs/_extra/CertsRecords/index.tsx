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
  Popover,
  Textarea,
  Tooltip,
} from "@mantine/core";
import { Icon } from "@iconify/react";
import CopyBtn from "@/ui/widgets/CopyBtn";
import { getCerts } from "@/actions/certActions";
import { DeleteCert, HostControl } from "../index";
import styles from "./styles.module.scss";

type $CertRecords = Pick<Awaited<ReturnType<typeof getCerts>>, "result">;
export const CertRecords = ({ result }: $CertRecords) => {
  if (!result?.length) return <NoRecords />;
  return (
    <Box className={styles.grid}>
      {result?.map(({ id, updated, name, cert, key, hosts }) => (
        <Card withBorder shadow="sm" key={updated}>
          <Stack gap={0}>
            <Group justify="space-between">
              <Text>Cert #{id.slice(0, 8)}</Text>
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
                    certValues={{ name, cert, key }}
                    certAction="Update"
                    certId={id}
                  />
                  <Menu.Label>Danger</Menu.Label>
                  <DeleteCert certId={id} />
                </Menu.Dropdown>
              </Menu>
            </Group>
            <Divider mt={15} />
            <Table
              data={{
                body: [
                  [<Text>Name</Text>, <Text>{name}</Text>],
                  [<Text>Certificate</Text>, <DataView text={cert} />],
                  [<Text>Private key</Text>, <DataView text={key} />],
                  [
                    <Text>Dependencies</Text>,
                    <Tooltip
                      withArrow
                      arrowPosition="center"
                      label="Proxy hosts that use this Certificate."
                      children={
                        <Badge variant="light" children={hosts.length} />
                      }
                    />,
                  ],
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

const DataView = ({ text }: { text: string }) => {
  return (
    <>
      <CopyBtn text={text} />
      <Popover>
        <Popover.Target>
          <Tooltip label="View" position="right" withArrow>
            <ActionIcon
              color="gray"
              variant="subtle"
              children={<Icon icon="tabler:eye" />}
            />
          </Tooltip>
        </Popover.Target>
        <Popover.Dropdown p={0}>
          <Textarea value={text} onChange={() => {}} w={300} rows={10} />
        </Popover.Dropdown>
      </Popover>
    </>
  );
};
