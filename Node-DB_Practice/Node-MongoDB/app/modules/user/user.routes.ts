import { Router, Request, Response, NextFunction } from "express";
import { ResponseHandler } from "../../utility/response.handler";
import userService from "./user.service";

export const UserRouter = Router();

UserRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = userService.userGet();
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
});

UserRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = userService.userAdd(req.body);
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
});
