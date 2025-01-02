import { Request, Response, NextFunction } from "express";
import { sign, verify } from "jsonwebtoken";
import { IExcludedPaths } from "./auth.types";
import userService from "../user/user.service";
import bcrypt from "bcrypt";
import { ResponseHandler } from "../../utility/response.handler";
import { AUTH_MESSAGES } from "./auth.constants";

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
      next({ statusCode: 403, message: AUTH_MESSAGES.USER_AUTHORIZE });
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
      message: AUTH_MESSAGES.USER_PERMIT,
    });
  };
};

export const register = async (reqBody: any) => {
  const { userName } = reqBody;
  const user = await userService.getOneUser_service(userName);

  if (user) {
    return new ResponseHandler(null, {
      statusCode: 403,
      message: AUTH_MESSAGES.USER_EXIST,
    });
  }

  const userdata = await userService.addUser_service(reqBody);

  return new ResponseHandler({
    Result: userdata,
    Message: AUTH_MESSAGES.SUCCESSFULL_REGISTRATION,
  });
};

export const login = async (reqBody: any) => {
  const { userName, password } = reqBody;

  const user = await userService.getOneUser_service({ userName });
  if (!user) {
    return new ResponseHandler(null, {
      statusCode: 403,
      message: AUTH_MESSAGES.USER_NOT_EXIST,
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return new ResponseHandler(null, {
      statusCode: 403,
      message: AUTH_MESSAGES.INVALID_PASS,
    });
  }

  const token = createToken({ userName: user.userName, role: user.role });

  return new ResponseHandler({
    Token: token,
    Message: AUTH_MESSAGES.SUCCESSFULL_LOGIN,
  });
};
