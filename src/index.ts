import { Cookie, Elysia, redirect } from "elysia";
import { html } from "@elysiajs/html";
import { test, test2 } from "./controllers/user.controller";
import swagger from "@elysiajs/swagger";
const app = new Elysia();
import authRoutes from "./routes/auth.routes";
import { Effect } from "effect";
import { WorkOS } from "@workos-inc/node";
import db from "./lib/db";
import { users } from "./lib/db/schema";
import dotenv from "dotenv";
import { sealData } from "iron-session";
import { cookie } from "@elysiajs/cookie";
import { eq } from "drizzle-orm";
dotenv.config();
const workos = new WorkOS(Bun.env.WORKOS_API_KEY as string);
const WORKOS_CLIENT_ID = Bun.env.WORKOS_CLIENT_ID as string;

app.use(swagger());
app.use(cookie());

app.get("/", () => "Hello Elysia");
app.group("/api", (api) =>
  api
    .use(html())
    .get(
      "/user",
      () =>
        `<a href="http://localhost:4000/api/user/auth/google">Sign In with Google </a>`
    )
    .get("/test", test)
    .get("/test2", test2)
);

app.use(authRoutes);
app.get("/callback", ({ cookie: { wos }, query }) => {
  const program = Effect.tryPromise<Object, Error>({
    try: async () => {
      const code = query.code as string;
      const { user, accessToken, refreshToken, impersonator } =
        await workos.userManagement.authenticateWithCode({
          code,
          clientId: WORKOS_CLIENT_ID,
        });
      const encryptedSession = await sealData(
        { accessToken, refreshToken, user, impersonator },
        { password: process.env.WORKOS_COOKIE_PASSWORD as string }
      );
      
      wos.value= encryptedSession;
      wos.path = "/";
      wos.httpOnly = true;
      wos.secure = true;
      wos.sameSite = "lax";
      let existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, user.email))
        .execute();

      if (existingUser.length>0) {
        return { savedUser: existingUser };
      }

      const savedUser = await db
        .insert(users)
        .values({
          id: user.id,
          email: user.email,
          first_name: user.firstName,
          last_name: user.lastName,
          role: "user",
        })
        .returning();

      return {"user" :  savedUser };
    },
    catch: (err) => {
      wos.remove();
      throw Error(`Some error occured ${err}`);
    },
  });

  return Effect.runPromise(program);
});

app.listen(4000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
