import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";
// import { Logger } from "drizzle-orm/logger";

// class MyLogger implements Logger {
//   logQuery(query: string, params: unknown[]): void {
//     console.log({ query, params });
//   }
// }
const client = createClient({ url: "file:./data/sqlite.db" });
export const db = drizzle(client, {
  schema,
  // logger: new MyLogger()
});
