import { connect } from "mongoose";

export const connectToMongo = async () => {
  try {
    const { MONGO_CONNECTION_STRING } = process.env;
    // console.log(MONGO_CONNECTION_STRING);
    const data = await connect(MONGO_CONNECTION_STRING as string);
    // console.log(data);
    console.log("Connected to MongoDB");
    return true;
  } catch (error) {
    console.log(error);
    throw "could not connect to mongo db";
  }
};
