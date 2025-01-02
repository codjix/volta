"use server";
import { proxyHosts } from "@db/schema";
import { SafePromise } from "@/utils/safePromise";
import { _proxyHostSchema } from "@/lib/zodSchemas";
import { ProxyModel } from "@db/models";

export const getProxyHosts = async () =>
  SafePromise<Awaited<ReturnType<typeof ProxyModel.getAll>>>(
    async (resolve) => {
      const result = await ProxyModel.getAll();
      resolve({ ok: true, result });
    },
  );

type $createValues = typeof proxyHosts.$inferInsert;
export const createProxyHost = async (values: $createValues) =>
  SafePromise<Required<$createValues>>(async (resolve) => {
    const safe = _proxyHostSchema.safeParse(values);
    if (!safe.success) throw new Error("Invalid values");
    const result = await ProxyModel.create(safe.data as any);
    resolve({ ok: true, result });
  });

type $updateValues = Partial<$createValues>;
export const updateProxyHost = async (id: string, values: $updateValues) =>
  SafePromise<Required<$updateValues>>(async (resolve) => {
    const safe = _proxyHostSchema.safeParse(values);
    if (!safe.success) throw new Error("Invalid values");
    const result = await ProxyModel.update(id, safe.data as any);
    resolve({ ok: true, result });
  });

export const toggleProxyHost = async (id: string, enabled: boolean) =>
  SafePromise(async (resolve) => {
    const result = await ProxyModel.toggle(id, enabled);
    resolve({ ok: true, result });
  });

export const deleteProxyHost = async (id: string) =>
  SafePromise(async (resolve) => {
    const result = await ProxyModel.delete(id);
    resolve({ ok: true, result: result.toJSON() });
  });
