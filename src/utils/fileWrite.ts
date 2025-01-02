import { resolve, dirname } from "path";
import { mkdir, writeFile } from "fs/promises";

export const fileWrite = async (target: string, content: string) => {
  const file = resolve(target);
  const parent = dirname(file);

  return mkdir(parent, { recursive: true }).then(() => {
    return writeFile(file, content);
  });
};
