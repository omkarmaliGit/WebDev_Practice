import userRepo from "./user.repo";
import { IUser } from "./user.types";
import bcrypt from "bcrypt";

const userGet = async () => {
  const users = await userRepo.get();
  return users;
};

const userGetOne = async (_id: any) => {
  const user = await userRepo.getOne(_id);
  return user;
};

const userAdd = async (userData: IUser) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const newUser: IUser = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    age: userData.age,
    userName: userData.userName,
    password: hashedPassword,
    role: "USER",
  };

  const user = await userRepo.add(newUser);
  return user;
};

const userRemove = async (_id: any) => {
  const user = await userRepo.remove(_id);
  return user;
};

const userUpdate = async (_id: any, userData: IUser) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const newUser: IUser = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    age: userData.age,
    userName: userData.userName,
    password: hashedPassword,
    role: "USER",
  };

  const user = await userRepo.update(_id, newUser);
  return user;
};

export default {
  userGet,
  userGetOne,
  userAdd,
  userRemove,
  userUpdate,
};
