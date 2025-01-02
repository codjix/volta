import { cookies } from "next/headers";
import { AuthModel } from "@db/models";

type Resolver<ResultType> = (
  resolve: (response: {
    ok: boolean;
    result?: ResultType;
    message?: string;
  }) => void,
) => PromiseLike<void>;

export const SafePromise = <ResultType extends unknown>(
  resolver: Resolver<ResultType>,
  privileged?: boolean,
) =>
  new Promise<{ ok: boolean; result?: ResultType; message?: string }>(
    async (resolve) => {
      try {
        if (!privileged) {
          const token = (await cookies()).get("token");
          const access = await AuthModel.session(token?.value ?? "");
          if (!access && !privileged) throw new Error("Unauthorized");
        }
        await resolver(resolve);
      } catch (error: any) {
        resolve({
          ok: false,
          message:
            typeof error?.message === "string"
              ? error?.message
              : "something went wrong",
        });
      }
    },
  );
