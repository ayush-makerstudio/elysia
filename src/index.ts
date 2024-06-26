import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { Effect } from "effect";
import { authenticateWithGoogle } from "./controllers/user.controller";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .group("/api", (api) =>
    api
      .use(html())
      .get(
        "/user",
        () =>
          `<a href="http://localhost:4000/api/user/auth/google">Sign In with Google </a>`
      )
      .get("/user/auth/google",async  () => authenticateWithGoogle)
  )
  .listen(4000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
