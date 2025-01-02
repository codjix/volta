import Link from "next/link";
import { Button, Center, Group, Stack, Text, Title } from "@mantine/core";
import BackBtn from "@/ui/widgets/BackBtn";

export const metadata = {
  title: "Not Found - VoltaLink",
  description: "Sorry, couldn't find the page you're looking for.",
};

export default () => {
  return (
    <Center h="100%">
      <Stack gap={10} align="center">
        <Text c="yellow">404</Text>
        <Title order={2}>Not Found</Title>
        <Text c="dimmed">
          Sorry, couldn't find the page you're looking for.
        </Text>
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
