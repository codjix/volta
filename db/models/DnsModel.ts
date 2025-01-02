import { db } from "@db/index";
import { dnsHosts } from "@db/schema";
import { eq } from "drizzle-orm";

class DnsModelClass {
  async getAll(enabledOnly?: boolean) {
    return await db.query.dnsHosts.findMany({
      where: enabledOnly ? eq(dnsHosts.enabled, true) : undefined,
    });
  }

  async count() {
    return await db.$count(dnsHosts);
  }

  async create(values: typeof dnsHosts.$inferInsert) {
    return (await db.insert(dnsHosts).values(values).returning())[0];
  }

  async update(id: string, values: Partial<typeof dnsHosts.$inferInsert>) {
    return (
      await db
        .update(dnsHosts)
        .set(values)
        .where(eq(dnsHosts.id, id))
        .returning()
    )[0];
  }

  async delete(id: string) {
    return await db.delete(dnsHosts).where(eq(dnsHosts.id, id));
  }

  async toggle(id: string, current: boolean) {
    return await this.update(id, { enabled: !current });
  }
}

export const DnsModel = new DnsModelClass();
