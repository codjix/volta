import * as dz from "drizzle-orm/sqlite-core";
import { MainCols } from "@db/utils";

// @table
export const dnsHosts = dz.sqliteTable("dns_hosts", {
  ...MainCols,
  // TODO: add dns variation
  enabled: dz.integer("enabled", { mode: "boolean" }).notNull().default(true),
  domain: dz.text("domain").unique().notNull(),
  ip: dz.text("ip").notNull(),
});
