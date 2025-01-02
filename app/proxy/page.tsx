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
import { getProxyHosts } from "@/actions/proxyActions";
import { HostControl, ProxyRecords } from "./_extra/index";
import { getCerts } from "@/actions/certActions";

export const metadata = {
  title: "Reverse Proxy - VoltaLink",
};

export default async () => {
  const { ok, result } = await getProxyHosts();
  const { ok: okCerts, result: certs } = await getCerts();
  return (
    <>
      <Stack>
        <Flex justify="space-between" align="end">
          <Group>
            <ThemeIcon size="xl" variant="light">
              <Icon height={30} icon="tabler:replace" />
            </ThemeIcon>
            <Title order={1}>Reverse Proxy</Title>
          </Group>
          <Button
            hostAction="Create"
            component={HostControl}
            leftSection={<Icon height={20} icon="fluent:add-12-filled" />}
            children="New"
          />
        </Flex>
        <Divider />
        <ProxyRecords result={result ?? []} certs={certs} />
        {(!ok || !okCerts) && <Text c="red">Failed to load resources</Text>}
      </Stack>
    </>
  );
};
