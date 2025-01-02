import Link from "next/link";
import { Button, Center, Group, Stack, Text, Title } from "@mantine/core";
import BackBtn from "@/ui/widgets/BackBtn";

export const metadata = {
  title: "Settings - VoltaLink",
};

export default () => {
  return (
    <Center h="100%">
      <Stack gap={10} align="center">
        <Text c="yellow">501</Text>
        <Title order={2}>Not Ready</Title>
        <Text c="dimmed">This page is not implemented yet !</Text>
        <Group justify="center">
          <Button w={100} component={Link} href="/">
            Go Home
          </Button>
          <BackBtn w={100} />
        </Group>
      </Stack>
    </Center>
  );
};
