"use server";
import { SafePromise } from "@/utils/safePromise";
import { _loginSchema, _registerSchema } from "@/lib/zodSchemas";
import { AuthModel, SettingsModel } from "@db/models";

type $login = { email: string; password: string };
export const loginAction = async (credintals: $login) =>
  SafePromise<string>(async (resolve) => {
    const check = _loginSchema.safeParse(credintals);
    if (!check.success) throw new Error("Invalid credintals");

    const { token } = await AuthModel.login(check.data);
    resolve({ ok: true, result: token });
  }, true);

type $register = { name: string; email: string; password: string };
export const registerAction = async (credintals: $register) =>
  SafePromise<string>(async (resolve) => {
    const check = _registerSchema.safeParse(credintals);
    if (!check.success) throw new Error("Invalid credintals");

    await SettingsModel.create({ key: "installed", value: [true] });

    const { token } = await AuthModel.register(check.data);
    resolve({ ok: true, result: token });
  }, true);

export const sessionAction = async (token: string) =>
  SafePromise<Awaited<ReturnType<typeof AuthModel.session>>>(
    async (resolve) => {
      const isInstalled = await SettingsModel.getOne("installed");
      if (!isInstalled) throw new Error("register");

      const session = await AuthModel.session(token);
      if (!session) throw new Error("Unauthorized");

      resolve({ ok: true, result: session });
    },
    true,
  );
