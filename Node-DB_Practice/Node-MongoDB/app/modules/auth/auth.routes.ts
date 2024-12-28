import express, { NextFunction, Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import { IUser } from "../user/user.types";
import userService from "../user/user.service";
import { ResponseHandler } from "../../utility/response.handler";
import { createToken } from "./auth.service";

const AuthRouter = Router();

// Register route
AuthRouter.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { userName } = req.body;
      const users: IUser[] = await userService.userGet();

      if (users.find((user) => user.userName === userName)) {
        return res.status(400).json({ message: "userName already exists" });
      }

      const result = await userService.userAdd(req.body);
      res.send(new ResponseHandler(result, "user registered successfully"));
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
      const { userName, password } = req.body;
      const users: IUser[] = await userService.userGet();

      const user = users.find((u) => u.userName === userName);
      if (!user) {
        return res.status(401).json({ message: "User Not Found" });
      }

      // Compare the provided password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = createToken({ userName: user.userName, role: user.role });

      res.send(new ResponseHandler(token, "user logged in successfully"));
    } catch (error) {
      next(error);
    }
  }
);

export default AuthRouter;
