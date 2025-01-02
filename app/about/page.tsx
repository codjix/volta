import { Center, Image, Stack, Text, Title } from "@mantine/core";
import logo from "@/images/logo.svg";
import { description, version } from "@/../package.json";

export const metadata = {
  title: "About - VoltaLink",
};

export default () => {
  return (
    <Center h="100%">
      <Stack gap={5} align="center">
        <Image src={logo.src} w={250} />
        <Title order={2}>VoltaLink</Title>
        <Text c="dimmed" ta="center">
          {description}
        </Text>
        <Text c="green" fw={900}>
          v{version}
        </Text>
      </Stack>
    </Center>
  );
};
