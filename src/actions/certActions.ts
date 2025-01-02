"use server";
import { certs } from "@db/schema";
import { SafePromise } from "@/utils/safePromise";
import { _certSchema } from "@/lib/zodSchemas";
import { CertsModel } from "@db/models";

export const getCerts = async (standalone?: boolean) =>
  SafePromise<Awaited<ReturnType<typeof CertsModel.getAll>>>(
    async (resolve) => {
      const result = await CertsModel.getAll(standalone);
      resolve({ ok: true, result });
    },
  );

type $createValues = typeof certs.$inferInsert;
export const createCert = async (values: $createValues) =>
  SafePromise<Required<$createValues>>(async (resolve) => {
    const safe = _certSchema.safeParse(values);
    if (!safe.success) throw new Error("Invalid values");
    const result = await CertsModel.create(safe.data);
    resolve({ ok: true, result });
  });

type $updateValues = Partial<$createValues>;
export const updateCert = async (id: string, values: $updateValues) =>
  SafePromise<Required<$updateValues>>(async (resolve) => {
    const safe = _certSchema.safeParse(values);
    if (!safe.success) throw new Error("Invalid values");
    const result = await CertsModel.update(id, safe.data);
    resolve({ ok: true, result });
  });

export const deleteCert = async (id: string, force?: boolean) =>
  SafePromise(async (resolve) => {
    const result = await CertsModel.delete(id, force);
    resolve({ ok: true, result: result.toJSON() });
  });
