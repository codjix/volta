import { Icon } from "@iconify/react";
import { Card, ThemeIcon, Text } from "@mantine/core";

const details = [
  {
    title: "DNS Management",
    description:
      "Easily define your custom domains with a local DNS server through a GUI.",
    icon: "eos-icons:dns",
  },
  {
    title: "Reverse Proxy",
    description:
      "Use the reverse proxy to direct client requests to the appropriate local server.",
    icon: "tabler:replace",
  },
  {
    title: "SSL Certificates",
    description:
      "Manage your SSL certificates and secure your connections with ease.",
    icon: "ph:certificate",
  },
];

export const features = details.map((feature) => (
  <Card key={feature.title} radius={0} padding="xl">
    <ThemeIcon size={60} variant="light">
      <Icon width={40} icon={feature.icon} />
    </ThemeIcon>
    <Text fz="lg" fw={500} mt="md">
      {feature.title}
    </Text>
    <Text fz="sm" c="dimmed" mt="sm">
      {feature.description}
    </Text>
  </Card>
));
