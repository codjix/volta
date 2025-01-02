"use client";
import {
  Alert,
  Anchor,
  Button,
  Checkbox,
  Divider,
  Group,
  LoadingOverlay,
  Modal,
  NumberInput,
  Portal,
  Select,
  Stack,
  Tabs,
  TagsInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import { Icon } from "@iconify/react";
import { FormBtns } from "@/ui/widgets/FormBtns";
import { useHostControl } from "./useHostControl";
import { $SharedProps } from "./index";
import Link from "next/link";

export const ModalView = (props: $SharedProps) => {
  const { Form, mutation, error } = useHostControl(props);

  return (
    <Portal>
      <Modal
        opened={props.isOpen}
        onClose={props.close}
        title={props.hostAction + " Host"}
        pos="relative"
        size="lg"
        centered
      >
        <form
          onReset={Form.reset}
          onSubmit={Form.onSubmit((fields) => mutation.mutate(fields))}
        >
          <Stack>
            <LoadingOverlay visible={mutation.isPending} zIndex={1000} />
            <Tabs variant="pills" defaultValue="details">
              <Divider mb={10} />
              <TabsList />
              {error && (
                <Alert
                  title={error}
                  icon={<Icon icon="tabler:info-circle" />}
                  color="red"
                  radius="md"
                  mt={10}
                />
              )}
              <Divider my={10} />
              <Tabs.Panel component={Stack} value="details" maw={600}>
                <TagsInput
                  label="Domains"
                  placeholder="Ex: example.com, example.io"
                  {...Form.getInputProps("domains")}
                  key={Form.key("domains")}
                  data-autofocus
                  withAsterisk
                  required
                />
                <Group>
                  <Select
                    w={80}
                    withAsterisk
                    label="Protocol"
                    allowDeselect={false}
                    {...Form.getInputProps("protocol")}
                    key={Form.key("protocol")}
                    data={["http", "https"]}
                    placeholder="http"
                    required
                  />
                  <TextInput
                    w="calc(100% - 197px)"
                    label="Hostname"
                    placeholder="ex: 172.0.0.2"
                    {...Form.getInputProps("host")}
                    key={Form.key("host")}
                    withAsterisk
                    required
                  />
                  <NumberInput
                    w={85}
                    min={0}
                    max={99999}
                    label="Port"
                    placeholder="ex: 80"
                    clampBehavior="strict"
                    {...Form.getInputProps("port")}
                    key={Form.key("port")}
                    withAsterisk
                    required
                  />
                </Group>
                <Select
                  required
                  clearable
                  withAsterisk
                  label="SSL Certificate"
                  nothingFoundMessage={noCerts}
                  placeholder="None selected"
                  key={Form.key("certId")}
                  {...Form.getInputProps("certId")}
                  data={props.certs?.map(({ id, name }) => ({
                    value: id,
                    label: name,
                  }))}
                />
                <Checkbox
                  label="Websocket"
                  description="Enable this to allow Websocket forwarding."
                  {...Form.getInputProps("ws", { type: "checkbox" })}
                  key={Form.key("ws")}
                />
              </Tabs.Panel>
              <Tabs.Panel component={Stack} value="config">
                <Textarea
                  rows={8}
                  label="Custom Configurations"
                  description="Apply custom Nginx configurations."
                  {...Form.getInputProps("conf")}
                  key={Form.key("conf")}
                  placeholder={ph}
                />
              </Tabs.Panel>
            </Tabs>
            <FormBtns submit={props.hostAction} />
          </Stack>
        </form>
      </Modal>
    </Portal>
  );
};

const noCerts = (
  <>
    No certificates yet,{" "}
    <Anchor component={Link} href="/certs" children="create one." />
  </>
);

const ph = `server {
  {{ CONFIG HERE }}
  location / {
    ...
  }
}`;

const TabsList = () => (
  <Tabs.List>
    <Tabs.Tab
      value="details"
      leftSection={<Icon width={20} icon="hugeicons:web-design-01" />}
      children="Details"
    />
    <Tabs.Tab
      value="config"
      leftSection={<Icon width={20} icon="eva:options-2-outline" />}
      children="Config"
    />
  </Tabs.List>
);
