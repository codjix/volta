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
import { getCerts } from "@/actions/certActions";
import { HostControl, CertRecords } from "./_extra/index";

export const metadata = {
  title: "SSL Certificates - VoltaLink",
};

export default async () => {
  const { ok, result } = await getCerts();
  return (
    <>
      <Stack>
        <Flex justify="space-between" align="end">
          <Group>
            <ThemeIcon size="xl" variant="light">
              <Icon height={30} icon="ph:certificate" />
            </ThemeIcon>
            <Title order={1}>SSL Certificates</Title>
          </Group>
          <Button
            certAction="Create"
            component={HostControl}
            leftSection={<Icon height={20} icon="fluent:add-12-filled" />}
            children="New"
          />
        </Flex>
        <Divider />
        <CertRecords result={result ?? []} />
        {!ok && <Text c="red">Failed to load resources</Text>}
      </Stack>
    </>
  );
};
