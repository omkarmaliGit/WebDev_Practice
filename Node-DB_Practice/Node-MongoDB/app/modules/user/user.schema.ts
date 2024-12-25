import { model, Schema } from "mongoose";
import { IUser } from "./user.types";

const userSchema = new Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
});

type IUserDocument = Document & IUser;

const userModel = model<IUserDocument>("User", userSchema);

export default userModel;
