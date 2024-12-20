import userRepo from "./user.repo";

const createUser = async (userData: any) => {
  try {
    const result = userRepo.addUser(userData);
    return {
      result,
      message: "User Added Successfully",
    };
  } catch (error) {
    throw error;
  }
};

export default {
  createUser,
};
