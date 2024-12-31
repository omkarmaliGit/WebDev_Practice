import userModel from "./user.schema";
import { IUser } from "./user.types";

const get = () => userModel.find({ deletedAt: null });

const getOne = (_id: any) => userModel.findById(_id, { deletedAt: null });

const add = (userData: IUser) => userModel.create(userData);

const remove = (_id: any) =>
  userModel.findByIdAndUpdate(_id, { deletedAt: new Date() });

const update = (_id: any, userData: IUser) =>
  userModel.findByIdAndUpdate(_id, userData);

// const get = () => userModel.find({ firtName: "omkar" });

export default {
  get,
  getOne,
  add,
  remove,
  update,
};
