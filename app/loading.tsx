import { LoadingOverlay } from "@mantine/core";

export default () => {
  return (
    <LoadingOverlay
      zIndex={1000}
      visible={true}
      overlayProps={{ radius: "sm", blur: 2 }}
      loaderProps={{ type: "bars" }}
    />
  );
};
