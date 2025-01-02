import { Badge, Box, Card, Stack, Text, Title } from "@mantine/core";
import { ChartsCard, features, Footer } from "./_extra/index";
import { getDashData } from "@/actions/dashActions";
import styles from "./_extra/styles.module.scss";

export const metadata = {
  title: "Dashboard - VoltaLink",
};

export default async () => {
  const { ok, result } = await getDashData();

  const chartsCards = [
    <ChartsCard title="DNS Hosts" {...result?.dns} url="/dns" />,
    <ChartsCard title="Proxy Hosts" {...result?.proxy} url="/proxy" />,
    <ChartsCard title="Certificates" {...result?.certs} url="/certs" />,
  ];

  return (
    <Stack align="center" py={50}>
      <Badge variant="light" size="xl" h={50}>
        Welcome back
      </Badge>

      <Title order={2} ta="center">
        Integrate effortlessly with any technology stack
      </Title>

      <Text c="dimmed" ta="center" maw={600}>
        Every once in a while, you’ll see a Golbat that’s missing some fangs.
        This happens when hunger drives it to try biting a Steel-type Pokémon.
      </Text>

      <Box className={styles.grid} w="100%">
        {chartsCards.map((chartsCard, index) => (
          <Card shadow="sm" className={styles.feature} key={index} withBorder>
            {features.length > index && features[index]}
            {chartsCard}
          </Card>
        ))}
      </Box>

      {!ok && <Text c="red">Failed to load resources</Text>}

      <Footer />
    </Stack>
  );
};
