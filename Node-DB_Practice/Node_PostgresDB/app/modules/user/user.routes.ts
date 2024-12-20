import { Request, Response, NextFunction, Router } from "express";
import userService from "./user.service";
import { ResponseHandler } from "../../utility/response.handler";

export const userRouter = Router();

userRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = userService.createUser(req.body);
    res.send(new ResponseHandler(result));
  } catch (error) {
    throw error;
  }
});
