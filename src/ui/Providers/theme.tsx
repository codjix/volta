"use client";

import { Avatar, Badge, createTheme, Menu, Modal, Stack } from "@mantine/core";

export const themeProps = createTheme({
  fontFamily: "Open Sans, sans-serif",
  primaryColor: "green",
  defaultRadius: 5,
  components: {
    Badge: Badge.extend({
      defaultProps: { radius: 5 },
    }),
    Avatar: Avatar.extend({
      defaultProps: { radius: 5 },
    }),
    Stack: Stack.extend({
      defaultProps: { gap: 20 },
    }),
    Modal: Modal.extend({
      defaultProps: {
        centered: true,
        transitionProps: { transition: "fade-up" },
        overlayProps: { blur: 5 },
      },
    }),
    Menu: Menu.extend({
      defaultProps: {
        shadow: "sm",
        keepMounted: true, // keep in DOM, required for modals
        arrowPosition: "center",
        withArrow: true,
        arrowSize: 12,
      },
    }),
  },
});
