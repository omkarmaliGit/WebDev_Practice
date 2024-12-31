import { Request, Response, NextFunction } from "express";
import { sign, verify } from "jsonwebtoken";
import { IExcludedPaths } from "./auth.types";
import { IUser } from "../user/user.types";
import userService from "../user/user.service";
import bcrypt from "bcrypt";

export const createToken = (payload: any) => {
  const { JWT_SECRET } = process.env;
  const token = sign(payload, JWT_SECRET || "0123456789", {
    expiresIn: "2h",
  });
  return token;
};

export const verifyToken = (token: string) => {
  const { JWT_SECRET } = process.env;
  const payload = verify(token, JWT_SECRET || "0123456789");
  return payload;
};

export const authorize = (excludedPaths: IExcludedPaths[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (
        excludedPaths.find((e) => e.path === req.url && e.method === req.method)
      ) {
        return next();
      }

      const token = req.headers.authorization?.split(" ")[1] || "";

      const payload = verifyToken(token);

      res.locals.user = payload;

      next();
    } catch (e) {
      next({ statusCode: 403, message: "UNAUTHORIZED {invalid token}" });
    }
  };
};

export const permit = (permittedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (permittedRoles.includes(res.locals.user.role)) {
      return next();
    }

    next({
      statusCode: 403,
      message: "UNAUTHORIZED {permission not for this user role}",
    });
  };
};

export const register = async (reqBody: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userName } = reqBody;
      const users: IUser[] = await userService.userGet();

      if (users.find((user) => user.userName === userName)) {
        return res.status(400).json({ message: "userName already exists" });
      }

      const result = await userService.userAdd(reqBody);
      return result;
    } catch (e) {
      next({ statusCode: 403, message: "Registration Failed" });
    }
  };
};

export const login = async (reqBody: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("inside login");
      const { userName, password } = reqBody;
      const users: IUser[] = await userService.userGet();
      console.log("inside user");

      const user = users.find((u) => u.userName === userName);
      if (!user) {
        return res.status(401).json({ message: "User Not Found" });
      }
      console.log("inside password");

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      console.log("inside token");

      const token = createToken({ userName: user.userName, role: user.role });
      console.log("service after", token);
      return token;
    } catch (e) {
      next({ statusCode: 403, message: "Login Failed" });
    }
  };
};
