import { Box, Divider, Group, Anchor, Text } from "@mantine/core";
import styles from "./styles.module.scss";

export const Footer = () => (
  <Box w="100%">
    <Divider />
    <Box component="footer" className={styles.footer}>
      <Text ta="center" p={10}>
        &copy;VoltaLink {new Date().getFullYear()} - All rights reserved.
      </Text>
      <Group justify="center" gap="xs">
        <Anchor href="https://github.com/codjix/volta" target="_blank">
          GitHub
        </Anchor>
        <Text>|</Text>
        <Anchor
          href="https://hub.docker.com/r/codjix/volta"
          target="_blank"
        >
          Docker
        </Anchor>
        <Text>|</Text>
        <Anchor
          href="https://github.com/codjix/volta/issues/new"
          target="_blank"
        >
          Report an issue
        </Anchor>
      </Group>
    </Box>
  </Box>
);
