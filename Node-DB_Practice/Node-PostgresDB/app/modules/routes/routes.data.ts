import { Route, Routes } from "./routes.types";
import { IExcludedPaths } from "../auth/auth.types";
import { UserRouter } from "../user/user.routes";
import AuthRouter from "../auth/auth.routes";

export const routes: Routes = [
  new Route("/auth", AuthRouter),
  new Route("/user", UserRouter),
];

export const excludedPaths: IExcludedPaths[] = [
  { path: "/auth/login", method: "POST" },
  { path: "/auth/register", method: "POST" },
];
