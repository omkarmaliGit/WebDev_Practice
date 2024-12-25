import userModel from "./user.schema";
import { IUser } from "./user.types";

const get = () => userModel.findOne();
const add = (userData: IUser) => userModel.create(userData);
// const get = () => userModel.find({ firtName: "omkar" });

export default {
  add,
  get,
};
