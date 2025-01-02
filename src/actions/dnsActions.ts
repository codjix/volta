"use server";
import { dnsHosts } from "@db/schema";
import { SafePromise } from "@/utils/safePromise";
import { _dnsHostSchema } from "@/lib/zodSchemas";
import { DnsModel } from "@db/models";

export const getDnsHosts = async () =>
  SafePromise<Awaited<ReturnType<typeof DnsModel.getAll>>>(async (resolve) => {
    const result = await DnsModel.getAll();
    resolve({ ok: true, result });
  });

type $createValues = typeof dnsHosts.$inferInsert;
export const createDnsHost = async (values: $createValues) =>
  SafePromise<Required<$createValues>>(async (resolve) => {
    const safe = _dnsHostSchema.safeParse(values);
    if (!safe.success) throw new Error("Invalid values");
    const result = await DnsModel.create(safe.data as any);
    resolve({ ok: true, result });
  });

type $updateValues = Partial<$createValues>;
export const updateDnsHost = async (id: string, values: $updateValues) =>
  SafePromise<Required<$updateValues>>(async (resolve) => {
    const safe = _dnsHostSchema.safeParse(values);
    if (!safe.success) throw new Error("Invalid values");
    const result = await DnsModel.update(id, safe.data as any);
    resolve({ ok: true, result });
  });

export const toggleDnsHost = async (id: string, enabled: boolean) =>
  SafePromise(async (resolve) => {
    const result = await DnsModel.toggle(id, enabled);
    resolve({ ok: true, result: result });
  });

export const deleteDnsHost = async (id: string) =>
  SafePromise(async (resolve) => {
    const result = await DnsModel.delete(id);
    resolve({ ok: true, result: result.toJSON() });
  });
