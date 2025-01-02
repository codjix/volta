import { db } from "@db/index";
import { proxyHosts } from "@db/schema";
import { eq } from "drizzle-orm";

class ProxyModelClass {
  async getAll(enabledOnly?: boolean) {
    return await db.query.proxyHosts.findMany({
      where: enabledOnly ? eq(proxyHosts.enabled, true) : undefined,
      with: { cert: true },
    });
  }

  async count() {
    return await db.$count(proxyHosts);
  }

  async create(values: typeof proxyHosts.$inferInsert) {
    return (await db.insert(proxyHosts).values(values).returning())[0];
  }

  async update(id: string, values: Partial<typeof proxyHosts.$inferInsert>) {
    return (
      await db
        .update(proxyHosts)
        .set(values)
        .where(eq(proxyHosts.id, id))
        .returning()
    )[0];
  }

  async delete(id: string) {
    return await db.delete(proxyHosts).where(eq(proxyHosts.id, id));
  }

  async toggle(id: string, current: boolean) {
    return await this.update(id, { enabled: !current });
  }
}

export const ProxyModel = new ProxyModelClass();
