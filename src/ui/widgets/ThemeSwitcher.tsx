"use client";
import { Icon, IconifyIcon } from "@iconify/react";
import {
  ActionIcon,
  SegmentedControl,
  Stack,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import Cookies from "universal-cookie";

export type $ThemeSwitcher = {
  wide?: boolean;
  fullWidth?: boolean;
  noLabels?: boolean;
};

const ThemeSwitcher = ({ wide, fullWidth, noLabels }: $ThemeSwitcher) => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const cookies = new Cookies(null, { path: "/" });

  const themeObject = (icon: string | IconifyIcon, title: string) => ({
    icon,
    value: title.toLowerCase(),
    title,
    label: (
      <Stack align="center" gap={5} aria-label={title} title={title}>
        <Icon height={20} icon={icon} />
        {!noLabels && <Text h={20}>{title}</Text>}
      </Stack>
    ),
  });

  const schemes = [
    themeObject("bi:square-half", "Auto"),
    themeObject("iconoir:half-moon", "Dark"),
    themeObject("iconamoon:mode-light", "Light"),
  ];

  const curentScheme = schemes.find((item) => item.value == colorScheme);
  const currentIndex = schemes.indexOf(curentScheme as any);

  return wide ? (
    <SegmentedControl
      my="md"
      size="xl"
      data={schemes}
      value={colorScheme}
      fullWidth={fullWidth}
      onChange={(nextScheme: any) => {
        cookies.set("color-scheme", nextScheme);
        setColorScheme(nextScheme);
      }}
    />
  ) : (
    <ActionIcon
      size="lg"
      color="gray"
      variant="subtle"
      title={curentScheme?.title}
      onClick={() => {
        const nextScheme: any = schemes[(currentIndex + 1) % 3];
        cookies.set("color-scheme", nextScheme.value);
        setColorScheme(nextScheme.value);
      }}
    >
      <Icon height={20} icon={curentScheme?.icon as any} />
    </ActionIcon>
  );
};

// export default dynamic(() => Promise.resolve(ThemeSwitcher), { ssr: false });
export default ThemeSwitcher;
