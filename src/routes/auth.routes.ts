import Elysia from "elysia";
import { authGoogle } from "../controllers/auth.controllers";

export default new Elysia({ name: "auth" }).group("/auth", (app) => {
  app.get("/", () => "Hello Auth");
  app.get("/google/", authGoogle);
  app.get("/google/callback", () => "Hello  callback ");

  return app;
});
