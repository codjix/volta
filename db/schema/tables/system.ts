import * as dz from "drizzle-orm/sqlite-core";
import { MainCols } from "@db/utils";

// @table
export const settings = dz.sqliteTable("settings", {
  ...MainCols,
  value: dz
    .text("value", { mode: "json" })
    .notNull()
    .$type<Record<string | number, any>>(),
  key: dz.text("key").unique().notNull(),
});
