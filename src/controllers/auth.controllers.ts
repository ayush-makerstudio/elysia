import { WorkOS } from "@workos-inc/node";
import { Effect } from "effect";
import { redirect } from "elysia";
import { ApiError } from "../lib/utils";
const WORKOS_API_KEY = Bun.env.WORKOS_API_KEY as string;
const WORKOS_CLIENT_ID = Bun.env.WORKOS_CLIENT_ID as string;
const workos = new WorkOS(WORKOS_API_KEY as string);

export const login = async ({ redirect }: { redirect: redirect }) => {
  const program = Effect.tryPromise({
    try: async () => {
      const authUrl = workos.userManagement.getAuthorizationUrl({
        provider: "authkit",
        redirectUri: "http://localhost:4000/auth/callback",
        clientId: WORKOS_CLIENT_ID,
      });
      Effect.log("authUrl", authUrl);
      return redirect(authUrl);
    },
    catch: (err) => {
      return new Error(`Some error occured ${err}`);
    },
  });
  return Effect.runPromise(program);
};

export async function protectedRoute({ cookie }: { cookie: any }) {
  return {
    message: "I am in the protected Route",
    cookie: cookie.name.value,
  };
}
