import * as dz from "drizzle-orm/sqlite-core";
import { MainCols } from "@db/utils";

// @table
export const users = dz.sqliteTable("users", {
  ...MainCols,
  name: dz.text("name").notNull(),
  email: dz.text("email").unique().notNull(),
  password: dz.text("password").notNull(),
  token: dz.text("token").notNull(),
  avatar: dz.text("avatar"),
});
