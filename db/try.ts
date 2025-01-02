import { db } from "@db/index";
import * as dzs from "@db/schema";
import * as dzm from "@db/models";

export const $run = () => {
  return new Promise(async (resolve) => {
    try {
      // const x = await db.$count(dzs.certs)
      // const x = await dzm.AuthModel.login({
      //   // name: "admin4", // for register
      //   email: "admin4@example.com",
      //   password: "admin",
      // });
      // resolve([true, x]);
    } catch (error: any) {
      resolve([false, error?.message]);
    }
  });
};

const result = await $run();
console.log(JSON.stringify(result, null, 2));
