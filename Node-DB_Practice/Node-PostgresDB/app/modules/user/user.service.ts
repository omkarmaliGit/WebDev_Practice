import userRepo from "./user.repo";
import { IUser } from "./user.types";
import bcrypt from "bcrypt";

const getUsers_service = async () => {
  const users = await userRepo.getUsers_repo();
  return users;
};

const getOneUser_service = async (searchKey: Record<string, any>) => {
  const user = await userRepo.getOneUser_repo(searchKey);
  return user;
};

const addUser_service = async (userData: IUser) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const newUser: IUser = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    age: userData.age,
    userName: userData.userName,
    password: hashedPassword,
    role: "USER",
    deletedAt: null,
  };

  const user = await userRepo.addUser_repo(newUser);
  return user;
};

const removeUser_service = async (_id: any) => {
  const user = await userRepo.removeUser_repo(_id);
  return user;
};

const updateUser_service = async (_id: any, userData: IUser) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const newUser: IUser = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    age: userData.age,
    userName: userData.userName,
    password: hashedPassword,
    role: "USER",
    deletedAt: userData.deletedAt,
  };

  const user = await userRepo.updateUser_repo(_id, newUser);
  return user;
};

export default {
  getUsers_service,
  getOneUser_service,
  addUser_service,
  removeUser_service,
  updateUser_service,
};
