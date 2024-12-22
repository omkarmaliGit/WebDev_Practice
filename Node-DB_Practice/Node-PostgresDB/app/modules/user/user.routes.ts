import { Request, Response, NextFunction, Router } from "express";
import { createUser, removeUser, viewUser, viewUserById } from "./user.service";
import { ResponseHandler } from "../../utility/response.handler";

export const userRouter = Router();

userRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("inside routes");
    const result = createUser(req.body);
    res.send(new ResponseHandler(result));
  } catch (error) {
    throw error;
  }
});

userRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = viewUser();
    res.send(new ResponseHandler(result));
  } catch (error) {
    throw error;
  }
});

userRouter.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = viewUserById(req.body);
    res.send(new ResponseHandler(result));
  } catch (error) {
    throw error;
  }
});

userRouter.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = removeUser(req.body);
    res.send(new ResponseHandler(result));
  } catch (error) {
    throw error;
  }
});
