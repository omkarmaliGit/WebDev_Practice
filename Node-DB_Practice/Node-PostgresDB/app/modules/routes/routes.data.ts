import { Route, Routes } from "./routes.types";
import { IExcludedPaths } from "../auth/auth.types";
import { DummyRouter } from "../dummy/dummy.routes";
import { userRouter } from "../user/user.routes";

export const routes: Routes = [
  new Route("/dummy", DummyRouter),
  new Route("/user", userRouter),
];

export const excludedPaths: IExcludedPaths[] = [
  { path: "auth/login", method: "POST" },
];
