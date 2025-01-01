import { Router, Request, Response, NextFunction } from "express";
import { login, register } from "./auth.service";

const AuthRouter = Router();

// Register route
AuthRouter.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const result = await register(req.body);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

// Login a user with password verification
AuthRouter.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const result = await login(req.body);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

export default AuthRouter;
