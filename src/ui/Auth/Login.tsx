"use client";
import {
  Alert,
  Box,
  Button,
  LoadingOverlay,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Icon } from "@iconify/react";
import { useLogin } from "@/hooks/auth";
import classes from "./styles.module.scss";

export const Login = () => {
  const login = useLogin();

  return (
    <Box className={classes.box} p={20}>
      <form onSubmit={login.action}>
        <LoadingOverlay
          style={{ borderRadius: 10 }}
          visible={login?.status == "pending"}
        />
        <Stack>
          <Title>Login</Title>
          <Text c="dimmed">Login to access the dashboard.</Text>
          {login?.error && (
            <Alert
              variant="light"
              color="red"
              title={login?.error}
              icon={<Icon icon="tabler:info-circle" />}
            />
          )}
          <TextInput
            size="lg"
            label="Email"
            variant="filled"
            placeholder="Ex: user@domain.tld"
            {...login.emailProps}
            withAsterisk
          />
          <PasswordInput
            size="lg"
            label="Password"
            variant="filled"
            placeholder="Enter password"
            {...login.passProps}
            withAsterisk
          />
          <Button
            w="120px"
            size="md"
            type="submit"
            rightSection={<Icon icon="tabler:send-2" />}
          >
            Login
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
