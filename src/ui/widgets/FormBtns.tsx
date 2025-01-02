"use client";

import { ButtonGroup, Button } from "@mantine/core";
import { Icon, IconifyIcon } from "@iconify/react";

type $FormBtns = {
  submit?: React.ReactNode;
  resetIcon?: string | IconifyIcon;
};
export const FormBtns = ({ submit, resetIcon }: $FormBtns) => {
  return (
    <ButtonGroup>
      <Button type="reset" title="Form Reset" color="red" p={5}>
        <Icon height="100%" icon={resetIcon ?? "lucide:list-restart"} />
      </Button>
      <Button type="submit" title="Form Submit">
        {submit ?? "Submit"}
      </Button>
    </ButtonGroup>
  );
};

export default FormBtns;
