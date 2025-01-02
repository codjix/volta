import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  dbCredentials: { url: "file:./data/sqlite.db" },
  schema: "./db/schema/index.ts",
  out: "./data/drizzle",
});
