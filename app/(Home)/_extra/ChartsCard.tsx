import {
  Card,
  Flex,
  Stack,
  Group,
  RingProgress,
  Text,
  Button,
} from "@mantine/core";
import Link from "next/link";

type $ChartCard = {
  title: string;
  url: string;
  total?: number;
  used?: number;
};
export const ChartsCard = ({ title, total = 0, used = 0, url }: $ChartCard) => {
  const percentage = (used / total) * 100 || 0;

  return (
    <Card data-chart radius={0} padding="xl" withBorder>
      <Flex align="center" justify="space-between">
        <Stack gap={10}>
          <Text fz="xl">{title}</Text>

          <Group>
            <Text>{total}</Text>
            <Text fz="xs" c="dimmed">
              Total
            </Text>
          </Group>

          <Group>
            <Text>{used}</Text>
            <Text fz="xs" c="dimmed">
              In Service
            </Text>
          </Group>

          <Button component={Link} href={url} size="xs" variant="light">
            Learn More
          </Button>
        </Stack>

        <RingProgress
          roundCaps
          size={150}
          thickness={6}
          sections={[{ value: percentage, color: "green" }]}
          label={
            <>
              <Text ta="center" fz="lg">
                {percentage.toFixed(0) ?? "0"}%
              </Text>
              <Text ta="center" fz="xs" c="dimmed">
                In Service
              </Text>
            </>
          }
        />
      </Flex>
    </Card>
  );
};
