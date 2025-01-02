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
import { useRegister } from "@/hooks/auth";
import classes from "./styles.module.scss";

export const Register = () => {
  const register = useRegister();

  return (
    <Box className={classes.box} p={20}>
      <form onSubmit={register.action}>
        <LoadingOverlay
          style={{ borderRadius: 10 }}
          visible={register?.status == "pending"}
        />
        <Stack>
          <Title>Register</Title>
          <Text c="dimmed">Create admin account to access the dashboard.</Text>
          {register?.error && (
            <Alert
              variant="light"
              color="red"
              title={register?.error}
              icon={<Icon icon="tabler:info-circle" />}
            />
          )}
          <TextInput
            size="lg"
            label="Name"
            variant="filled"
            placeholder="Ex: Mohamed"
            {...register.nameProps}
            withAsterisk
          />
          <TextInput
            size="lg"
            label="Email"
            variant="filled"
            placeholder="Ex: user@domain.tld"
            {...register.emailProps}
            withAsterisk
          />
          <PasswordInput
            size="lg"
            label="Password"
            variant="filled"
            placeholder="Enter password"
            {...register.passProps}
            withAsterisk
          />
          <Button
            w="120px"
            size="md"
            type="submit"
            rightSection={<Icon icon="tabler:send-2" />}
          >
            Register
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
