import { createInsertSchema } from "drizzle-zod";
import { certs, dnsHosts, proxyHosts } from "@db/schema";
import { ip, domain } from "./generals";
export * from "./auth";

export const _certSchema = createInsertSchema(certs);
export const _proxyHostSchema = createInsertSchema(proxyHosts);
export const _dnsHostSchema = createInsertSchema(dnsHosts, {
  domain,
  ip,
});
