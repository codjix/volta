"use server";

import { SafePromise } from "@/utils/safePromise";
import { CertsModel, DnsModel, ProxyModel } from "@db/models";

type $DataType = Record<
  "dns" | "proxy" | "certs",
  {
    total: number;
    used: number;
  }
>;

export const getDashData = async () =>
  SafePromise<$DataType>(async (resolve) => {
    const dns = {
      total: await DnsModel.count(),
      used: (await DnsModel.getAll(true)).length,
    };

    const proxy = {
      total: await ProxyModel.count(),
      used: (await ProxyModel.getAll(true)).length,
    };

    const certs = {
      total: await CertsModel.count(),
      used: (await CertsModel.getAll(false, true)).length,
    };

    resolve({
      ok: true,
      result: { dns, proxy, certs },
    });
  });
