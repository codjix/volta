"use server";
import { SafePromise } from "@/utils/safePromise";
import { dataDir } from "@/utils/dataDir";
import { DnsModel, ProxyModel } from "@db/models";
import { fileWrite } from "@/utils/fileWrite";
import { ProxyWriter } from "./ProxyWriter";
import { DnsWriter } from "./DnsWriter";
import { exec } from "child_process";
import { promisify } from "util";
import { existsSync } from "fs";

export const genConfigs = async (reload?: boolean) =>
  SafePromise<[boolean, string][]>(async (resolve) => {
    const dir = dataDir();
    const dns = await DnsModel.getAll(true);
    const proxy = await ProxyModel.getAll(true);

    const lastSaved = JSON.stringify({ dns, proxy });
    await fileWrite(dir + "/last-saved.json", lastSaved);

    const proxyState = await ProxyWriter(proxy, dir);
    const dnsSate = await DnsWriter(dns, dir);

    const reloaded = reload
      ? await reloadServices()
      : { ok: false, message: "No service reloaded yet" };

    resolve({
      ok: true,
      result: [
        [dnsSate, "DNS configrations generation"],
        [proxyState, "Proxy configrations generation"],
        [reloaded.ok, reloaded.message + ""],
      ],
    });
  });

export const reloadServices = async () =>
  SafePromise(async (resolve) => {
    const script = dataDir() + "/reload.sh";

    if (existsSync(script)) {
      const shell = promisify(exec);
      await shell("sh " + script);

      resolve({ ok: true, message: "Services reloaded successfully" });
    } else {
      resolve({ ok: false, message: "No script to reload services" });
    }
  });
