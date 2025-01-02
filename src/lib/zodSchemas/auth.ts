import { z } from "zod";
import { str } from "./generals";

export const _loginSchema = z.object({
  email: str.email().nonempty("Email is required"),
  password: str
    .nonempty("Password is required")
    .min(4, "Password must be at least 4 characters"),
});

export const _registerSchema = z.object({
  email: str.email().nonempty("Email is required"),
  password: str
    .nonempty("Password is required")
    .min(4, "Password must be at least 4 characters"),
  name: str
    .nonempty("Name is required")
    .min(3, "Name must be at least 3 characters"),
});
