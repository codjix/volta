import path from "path";

export const dataDir = () => {
  return path.resolve(process.env.DATA_DIR || process.cwd() + "/data");
};
