import { db } from "@db/index";
import { certs } from "@db/schema";
import { eq } from "drizzle-orm";
import { ProxyModel } from "./ProxyModel";

class CertsModelClass {
  async getAll(standalone?: boolean, inUse?: boolean) {
    const ctx = await db.query.certs.findMany({
      with: { hosts: standalone ? undefined : true },
    });
    return inUse ? ctx.filter((cert) => cert.hosts.length > 0) : ctx;
  }

  async count() {
    return await db.$count(certs);
  }

  async create(values: typeof certs.$inferInsert) {
    return (await db.insert(certs).values(values).returning())[0];
  }

  async update(id: string, values: Partial<typeof certs.$inferInsert>) {
    return (
      await db.update(certs).set(values).where(eq(certs.id, id)).returning()
    )[0];
  }

  async delete(id: string, force?: boolean) {
    if (force) {
      const hosts = await ProxyModel.getAll();
      for (const host of hosts) {
        if (host.certId === id) {
          await ProxyModel.update(host.id, { certId: null });
        }
      }
    }
    return await db.delete(certs).where(eq(certs.id, id));
  }
}

export const CertsModel = new CertsModelClass();
