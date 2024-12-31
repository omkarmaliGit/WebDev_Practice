import { Route, Routes } from "./routes.types";
import { IExcludedPaths } from "../auth/auth.types";
import { DummyRouter } from "../dummy/dummy.routes";

export const routes: Routes = [new Route("/dummy", DummyRouter)];

export const excludedPaths: IExcludedPaths[] = [
  { path: "auth/login", method: "POST" },
];
