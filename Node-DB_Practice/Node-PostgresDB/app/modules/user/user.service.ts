import { addUser, deleteUser, findUser, findUserById } from "./user.repo";
import { user } from "./user.types";
import bcrypt from "bcrypt";

export const createUser = async (userData: user) => {
  try {
    console.log("inside service");

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser: user = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      age: userData.age,
      userName: userData.userName,
      password: hashedPassword,
    };

    const result = addUser(newUser);
    return {
      result,
      message: "User Added Successfully",
    };
  } catch (error) {
    throw error;
  }
};

export const viewUser = async () => {
  try {
    const result = findUser();
    return {
      result,
      message: "Users fetched Successfully",
    };
  } catch (error) {
    throw error;
  }
};

export const viewUserById = async (id: number) => {
  try {
    const result = findUserById(id);
    return {
      result,
      message: "User fetched Successfully",
    };
  } catch (error) {
    throw error;
  }
};

export const removeUser = async (id: number) => {
  try {
    const result = deleteUser(id);
    return {
      result,
      message: "User Deleted Successfully",
    };
  } catch (error) {
    throw error;
  }
};
