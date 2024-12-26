import userModel from "./user.schema";
import { IUser } from "./user.types";

const get = () => userModel.find();
const getOne = (_id: any) => userModel.findById(_id);
const add = (userData: IUser) => userModel.create(userData);

// const get = () => userModel.find({ firtName: "omkar" });

export default {
  get,
  getOne,
  add,
};
