"use client";
import { Button, ButtonProps } from "@mantine/core";

const BackBtn = (props: ButtonProps) => {
  return (
    <Button onClick={() => history.back()} {...props}>
      Go Back
    </Button>
  );
};

export default BackBtn;
