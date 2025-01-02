"use client";
import { Card, CardProps, Flex, Group, Text, Title } from "@mantine/core";

export type $InfoBox = {
  title: string;
  icon: React.ReactNode;
  description: string;
  cardProps?: CardProps;
  children?: React.ReactNode;
};

const InfoBox = ({
  icon,
  cardProps,
  title,
  description,
  children,
}: $InfoBox) => {
  return (
    <Card p={20} {...cardProps}>
      <Flex
        gap={10}
        align="center"
        justify="center"
        direction="column"
        mih={cardProps?.mih ?? 300}
      >
        {icon}
        <Title order={3} ta="center">
          {title}
        </Title>
        <Text c="dimmed" ta="center">
          {description}
        </Text>
        <Group justify="center">{children}</Group>
      </Flex>
    </Card>
  );
};

export default InfoBox;
