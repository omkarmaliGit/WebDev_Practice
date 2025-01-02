import { connect } from "mongoose";

export const connectToMongo = async () => {
  try {
    const { MONGO_CONNECTION_STRING } = process.env;
    const data = await connect(MONGO_CONNECTION_STRING as string);
    console.log("Connected to MongoDB");
    return true;
  } catch (error) {
    console.log(error);
    throw "could not connect to mongo db";
  }
};
