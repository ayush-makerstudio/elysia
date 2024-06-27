import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { test, test2 } from "./controllers/user.controller";
import swagger from "@elysiajs/swagger";
const app = new Elysia()
  .use(swagger())
  .get("/", () => "Hello Elysia")
  .group("/api", (api) =>
    api
      .use(html())
      .get(
        "/user",
        () =>
          `<a href="http://localhost:4000/api/user/auth/google">Sign In with Google </a>`
      )
      .get("/test",test )
      .get("/test2", test2)
  )
  .listen(4000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
