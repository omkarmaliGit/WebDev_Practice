import { appDataSource } from "../../connection/postgres.connect";
import { UserEntity } from "./user.schema";
import { IUser } from "./user.types";

const userModel = appDataSource.getRepository(UserEntity);

const getUsers_repo = () => userModel.find();

const getOneUser_repo = (searchKey: Record<string, any>) =>
  userModel.findOne({ where: { ...searchKey } });

const addUser_repo = (userData: IUser) => userModel.insert(userData);

const removeUser_repo = (_id: any) =>
  userModel.update(_id, { deletedAt: new Date() });

const updateUser_repo = (_id: any, userData: IUser) =>
  userModel.update(_id, userData);

export default {
  getUsers_repo,
  getOneUser_repo,
  addUser_repo,
  removeUser_repo,
  updateUser_repo,
};
