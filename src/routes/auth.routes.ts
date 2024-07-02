import Elysia, { redirect } from "elysia";
import {  login, protectedRoute } from "../controllers/auth.controllers";
import { authMiddleware } from "../middleware/auth.middleware";
export default new Elysia({ name: "auth" }).group("/auth", (app) => {
  app.get("/login", login);


  app.get("/p",  protectedRoute,  {
    beforeHandle: authMiddleware
  });

  app.get("/protected" , protectedRoute)
  return app;
});
