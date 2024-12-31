import express, { NextFunction, Request, Response, Router } from "express";
import { IUser } from "../user/user.types";
import { ResponseHandler } from "../../utility/response.handler";
import { createToken, login, register } from "./auth.service";

const AuthRouter = Router();

// Register route
AuthRouter.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const result = await register(req.body);
      res.send(
        new ResponseHandler({
          Result: result,
          Message: "user registered successfully",
        })
      );
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
      const token = await login(req.body);
      console.log("after", token);
      res.send(
        new ResponseHandler({
          Token: token,
          Message: "user logged in successfully",
        })
      );
    } catch (error) {
      next(error);
    }
  }
);

export default AuthRouter;
