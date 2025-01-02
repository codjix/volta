import {
  Stack,
  Title,
  Text,
  Flex,
  Divider,
  ThemeIcon,
  Group,
  Button,
} from "@mantine/core";
import { Icon } from "@iconify/react";
import { getDnsHosts } from "@/actions/dnsActions";
import { HostControl, DnsRecords } from "./_extra/index";

export const metadata = {
  title: "DNS Manager - VoltaLink",
};

export default async () => {
  const { ok, result } = await getDnsHosts();
  return (
    <>
      <Stack>
        <Flex justify="space-between" align="end">
          <Group>
            <ThemeIcon size="xl" variant="light">
              <Icon height={30} icon="eos-icons:dns" />
            </ThemeIcon>
            <Title order={1}>DNS Manager</Title>
          </Group>
          <Button
            hostAction="Create"
            component={HostControl}
            leftSection={<Icon height={20} icon="fluent:add-12-filled" />}
            children="New"
          />
        </Flex>
        <Divider />
        <DnsRecords hosts={result ?? []} />
        {!ok && <Text c="red">Failed to load resources</Text>}
      </Stack>
    </>
  );
};
