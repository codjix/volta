import * as dz from "drizzle-orm/sqlite-core";
import { MainCols } from "@db/utils";
import { relations } from "drizzle-orm";

// @table
export const proxyHosts = dz.sqliteTable("proxy_hosts", {
  ...MainCols,
  // TODO: group protocol, host, port and conf in one column named target
  // TODO: add host rewrites
  protocol: dz
    .text("protocol", { enum: ["http", "https"] })
    .notNull()
    .default("http"),
  host: dz.text("host").notNull(),
  port: dz.integer("port").notNull(),
  domains: dz.text("domains", { mode: "json" }).notNull().$type<string[]>(),
  enabled: dz.integer("enabled", { mode: "boolean" }).notNull().default(true),
  ws: dz.integer("ws", { mode: "boolean" }).notNull().default(true),
  certId: dz.text("certId").references(() => certs.id),
  conf: dz.text("conf"),
});

// @table
export const certs = dz.sqliteTable("certs", {
  ...MainCols,
  name: dz.text("name").notNull(),
  cert: dz.text("cert").notNull(),
  key: dz.text("key").notNull(),
});

export const CertWithHostsJoin = relations(certs, ({ many }) => ({
  hosts: many(proxyHosts),
}));

export const HostWithCertJoin = relations(proxyHosts, ({ one }) => ({
  cert: one(certs, {
    fields: [proxyHosts.certId],
    references: [certs.id],
  }),
}));
