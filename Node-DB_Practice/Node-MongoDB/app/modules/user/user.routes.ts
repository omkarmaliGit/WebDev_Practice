import { Router, Request, Response, NextFunction } from "express";
import { ResponseHandler } from "../../utility/response.handler";
import userService from "./user.service";
import { Types } from "mongoose";

export const UserRouter = Router();

UserRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.userGet();
    res.send(new ResponseHandler(result, "showing all users"));
  } catch (e) {
    next(e);
  }
});

UserRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const objId = req.params.id;
      if (!Types.ObjectId.isValid(objId)) {
        throw new Error("Invalid ObjectId format");
      }
      const userId: Types.ObjectId = new Types.ObjectId(objId);
      const result = await userService.userGetOne(userId);
      console.log(result);
      res.send(new ResponseHandler(result, "showing single user"));
    } catch (e) {
      next(e);
    }
  }
);

UserRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await userService.userAdd(req.body);
      res.send(new ResponseHandler(result, "user added successfully"));
    } catch (e) {
      next(e);
    }
  }
);

UserRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const objId = req.params.id;
      if (!Types.ObjectId.isValid(objId)) {
        throw new Error("Invalid ObjectId format");
      }
      const userId: Types.ObjectId = new Types.ObjectId(objId);
      const result = await userService.userRemove(userId);
      console.log(result);
      res.send(new ResponseHandler(result, "user deleted successfully"));
    } catch (e) {
      next(e);
    }
  }
);

UserRouter.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const objId = req.params.id;
      if (!Types.ObjectId.isValid(objId)) {
        throw new Error("Invalid ObjectId format");
      }
      const userId: Types.ObjectId = new Types.ObjectId(objId);
      const result = await userService.userUpdate(userId, req.body);
      console.log(result);
      res.send(new ResponseHandler(result, "user updated successfully"));
    } catch (e) {
      next(e);
    }
  }
);