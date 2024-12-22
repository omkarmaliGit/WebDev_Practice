import { appDataSource } from "../../connection/postgres.connect";
import { UserEntity } from "./user.schema";
import { user } from "./user.types";

const userRepository = appDataSource.getRepository(UserEntity);

export const addUser = async (userData: user) => {
  try {
    console.log("inside repo");
    return await userRepository.insert(userData);
  } catch (error) {
    throw error;
  }
};

export const findUser = async () => {
  try {
    return await userRepository.find();
  } catch (error) {
    throw error;
  }
};

export const findUserById = async (id: number) => {
  try {
    return await userRepository.findOneBy({ id });
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  try {
    return await userRepository.delete(id);
  } catch (error) {
    throw error;
  }
};
