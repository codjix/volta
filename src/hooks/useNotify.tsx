"use client";
import { notifications } from "@mantine/notifications";
import { DefaultMantineColor, ThemeIcon } from "@mantine/core";
import { Icon, IconifyIcon } from "@iconify/react";

export interface $Notify {
  title: React.ReactNode;
  message: React.ReactNode;
  color?: DefaultMantineColor;
  icon?: string | IconifyIcon;
}

const Notify = ({ title, message, color, icon }: $Notify) => {
  notifications.show({
    title,
    color,
    message,
    withBorder: true,
    autoClose: true,
    icon: icon ? (
      <ThemeIcon color={color} size="35px">
        <Icon
          style={{ width: "70%", height: "70%" }}
          icon={icon ?? "tabler:info-circle"}
        />
      </ThemeIcon>
    ) : null,
  });
};

export const useNotify = () => Notify;
