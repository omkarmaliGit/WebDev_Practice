import userModel from "./user.schema";
import { IUser } from "./user.types";

const getUsers_repo = () => userModel.find({ deletedAt: null });

const getOneUser_repo = (searchKey: Record<string, any>) => {
  if (searchKey._id) {
    return userModel.findById({ ...searchKey, deletedAt: null });
  } else {
    return userModel.findOne({ ...searchKey, deletedAt: null });
  }
};

const addUser_repo = (userData: IUser) => userModel.create(userData);

const removeUser_repo = (_id: any) =>
  userModel.findByIdAndUpdate(_id, { deletedAt: new Date() });

const updateUser_repo = (_id: any, userData: IUser) =>
  userModel.findByIdAndUpdate(_id, userData);

export default {
  getUsers_repo,
  getOneUser_repo,
  addUser_repo,
  removeUser_repo,
  updateUser_repo,
};
