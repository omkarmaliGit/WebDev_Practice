import { appDataSource } from "../../connection/postgres.connect";
import { UserEntity } from "./user.schema";

const userRepository = appDataSource.getRepository(UserEntity);

const addUser = async (userData: any) => {
  try {
    return await userRepository.insert(userData);
  } catch (error) {
    throw error;
  }
};

export default {
  addUser,
};
