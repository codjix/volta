import { db } from "@db/index";
import { settings } from "@db/schema";
import { eq } from "drizzle-orm";

class SettingsModelClass {
  async getAll() {
    return await db.query.settings.findMany();
  }

  async getOne<T extends Record<string | number, any>>(key: string) {
    const trx = await db.query.settings.findFirst({
      where: () => eq(settings.key, key),
    });
    return trx as typeof trx & { value: T };
  }

  async create(values: typeof settings.$inferInsert) {
    return (await db.insert(settings).values(values).returning())[0];
  }

  async update(key: string, values: Partial<typeof settings.$inferInsert>) {
    return (
      await db
        .update(settings)
        .set(values)
        .where(eq(settings.key, key))
        .returning()
    )[0];
  }

  async delete(key: string) {
    return await db.delete(settings).where(eq(settings.key, key));
  }
}

export const SettingsModel = new SettingsModelClass();
