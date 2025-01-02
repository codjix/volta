import * as dz from "drizzle-orm/sqlite-core";

export const mkUUID = () => crypto.randomUUID();
export const mkDate = () => new Date().toUTCString();

export const MainCols = {
  id: dz.text("id").primaryKey().notNull().$default(mkUUID),
  created: dz.text("created").notNull().$default(mkDate),
  updated: dz.text("updated").notNull().$onUpdate(mkDate),
};
