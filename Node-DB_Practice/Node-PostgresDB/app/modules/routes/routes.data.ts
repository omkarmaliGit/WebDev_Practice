import { Route, Routes } from "./routes.types";
import { IExcludedPaths } from "../auth/auth.types";
import { userRouter } from "../user/user.routes";

export const routes: Routes = [new Route("/user", userRouter)];

export const excludedPaths: IExcludedPaths[] = [
  { path: "auth/login", method: "POST" },
];
