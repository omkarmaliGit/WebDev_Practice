import userRepo from "./user.repo";
import { IUser } from "./user.types";
import bcrypt from "bcrypt";

const userGet = async () => {
  const user = await userRepo.get();
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
  };

  const user = await userRepo.add(newUser);
  return user;
};

export default {
  userGet,
  userAdd,
};
