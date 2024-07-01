import { WorkOS } from "@workos-inc/node";
import { Effect } from "effect";
import { redirect } from "elysia";
import { ApiError } from "../lib/utils";
const WORKOS_API_KEY = Bun.env.WORKOS_API_KEY as string;
const WORKOS_CLIENT_ID = Bun.env.WORKOS_CLIENT_ID as string;
const workos  = new WorkOS(WORKOS_API_KEY as string);
console.log("WORKOS_API_KEY", WORKOS_API_KEY);
console.log("WORKOS_CLIENT_ID", WORKOS_CLIENT_ID);

export const login =async ( {redirect } :{redirect:redirect}  )=> {
  console.log("login"); 
  const program = Effect.tryPromise ({
    try:async()=> {
      const authUrl = workos.userManagement.getAuthorizationUrl({
        provider: "authkit",
        redirectUri: "http://localhost:4000/auth/callback",
        clientId: WORKOS_CLIENT_ID ,
      });
      Effect.log("authUrl", authUrl);
      console.log("authUrl", authUrl);  
      return redirect(authUrl);
    },
    catch:(err)=> {
      return new Error(`Some error occured ${err}`);
    }
  });
  return Effect.runPromise(program);

}


export const callback = async ({query } : {
  query: {
    code: string;
  };
}) => {
  const program = Effect.tryPromise <Object, Error>  ({
    try:async()=> {
      const code = query.code;
      const { user } = await workos.userManagement.authenticateWithCode({
        code,
        clientId: WORKOS_CLIENT_ID,
      });
      return {user , code}
    },
    catch:(err)=> {
      throw Error(`Some error occured ${err}`);
    }
  });
  
  return Effect.runPromise(program);
}

