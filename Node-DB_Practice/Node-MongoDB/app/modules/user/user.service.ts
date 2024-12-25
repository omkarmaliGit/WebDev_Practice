import userRepo from "./user.repo";
import { IUser } from "./user.types";

const userGet = async () => {
  const user = await userRepo.get();
  return user;
};

const userAdd = async (userData: IUser) => {
  const user = await userRepo.add(userData);
  return user;
};

export default {
  userGet,
  userAdd,
};
