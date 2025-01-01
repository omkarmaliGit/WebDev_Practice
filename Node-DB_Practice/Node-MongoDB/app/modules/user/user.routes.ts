import { Router, Request, Response, NextFunction } from "express";
import { ResponseHandler } from "../../utility/response.handler";
import userService from "./user.service";
import { Types } from "mongoose";
import { permit } from "../auth/auth.service";
import { USER_ROLE } from "./user.types";
import { USER_MESSAGES } from "./user.constants";

export const UserRouter = Router();

UserRouter.get(
  "/",
  permit([USER_ROLE.ADMIN, USER_ROLE.SEMIADMIN]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await userService.getUsers_service();
      res.send(new ResponseHandler(result, USER_MESSAGES.SHOW_All));
    } catch (e) {
      next(e);
    }
  }
);

UserRouter.get(
  "/:id",
  permit([USER_ROLE.USER, USER_ROLE.ADMIN, USER_ROLE.SEMIADMIN]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const objId = req.params.id;
      if (!Types.ObjectId.isValid(objId)) {
        throw new Error(USER_MESSAGES.INVALID_OBJID);
      }
      const _id: Types.ObjectId = new Types.ObjectId(objId);

      const result = await userService.getOneUser_service({ _id });
      res.send(new ResponseHandler(result, USER_MESSAGES.SHOW_SINGLE));
    } catch (e) {
      next(e);
    }
  }
);

UserRouter.post(
  "/",
  permit([USER_ROLE.ADMIN, USER_ROLE.SEMIADMIN]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await userService.addUser_service(req.body);
      res.send(new ResponseHandler(result, USER_MESSAGES.USER_ADD));
    } catch (e) {
      next(e);
    }
  }
);

UserRouter.delete(
  "/:id",
  permit([USER_ROLE.ADMIN]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const objId = req.params.id;
      if (!Types.ObjectId.isValid(objId)) {
        throw new Error(USER_MESSAGES.INVALID_OBJID);
      }
      const userId: Types.ObjectId = new Types.ObjectId(objId);
      const result = await userService.removeUser_service(userId);
      // console.log(result);
      res.send(new ResponseHandler(result, USER_MESSAGES.USER_DELETE));
    } catch (e) {
      next(e);
    }
  }
);

UserRouter.put(
  "/:id",
  permit([USER_ROLE.USER]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const objId = req.params.id;
      if (!Types.ObjectId.isValid(objId)) {
        throw new Error(USER_MESSAGES.INVALID_OBJID);
      }
      const userId: Types.ObjectId = new Types.ObjectId(objId);
      const result = await userService.updateUser_service(userId, req.body);
      console.log(result);
      res.send(new ResponseHandler(result, USER_MESSAGES.USER_UPDATE));
    } catch (e) {
      next(e);
    }
  }
);
