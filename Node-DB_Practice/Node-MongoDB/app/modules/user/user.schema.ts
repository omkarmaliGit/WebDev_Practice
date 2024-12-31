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
  userName: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: true,
  },
  deletedAt: {
    type: Date,
    require: true,
  },
});

type IUserDocument = Document & IUser;

const userModel = model<IUserDocument>("User", userSchema);

export default userModel;
