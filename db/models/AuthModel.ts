import { db } from "@db/index";
import { users } from "@db/schema";
import { compareSync, hashSync } from "bcrypt";

class AuthModelClass {
  async register(credintals: Record<"name" | "email" | "password", string>) {
    const trx = await db
      .insert(users)
      .values({
        ...credintals,
        password: hashSync(credintals.password, 10),
        token: this.genToken(70),
      })
      .returning();

    return trx[0];
  }

  async login(credintals: Record<"email" | "password", string>) {
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, credintals.email),
    });

    if (!user) throw new Error("User not found");
    if (!compareSync(credintals.password, user.password)) {
      throw new Error("Incorrect password");
    }

    return user;
  }

  async session(token: string) {
    return await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.token, token),
    });
  }

  genToken(length: number, randomString = ""): string {
    randomString += Math.random().toString(20).slice(2, length);
    if (randomString.length > length) return randomString.slice(0, length);
    return this.genToken(length, randomString);
  }
}

export const AuthModel = new AuthModelClass();
