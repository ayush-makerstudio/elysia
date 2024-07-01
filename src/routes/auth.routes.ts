import Elysia, { redirect } from "elysia";
import { callback, login } from "../controllers/auth.controllers";
import { WorkOS } from "@workos-inc/node";
const workos = new WorkOS(Bun.env.WORKOS_API_KEY as string);
export default new Elysia({ name: "auth" }).group("/auth", (app) => {
  app.get("/login", login);
  
  app.get(
    "/callback",
    callback
  );

  return app;
});
