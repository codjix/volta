import { z } from "zod";

export const str = z.string();

export const ip = () => str.ip().nonempty("IP is required");

export const domain = () => {
  return str
    .toLowerCase()
    .regex(/^[a-z0-9.-]+$/, "Domain accepts: a-z, 0-9, ., -")
    .min(3, "Domain must contain at least 3 characters");
};
