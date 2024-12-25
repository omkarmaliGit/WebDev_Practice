import express from "express";
import { registerRoutes } from "./modules/routes/routes.register";
import { connectToMongo } from "./connections/mongo.connect";

export const startServer = async () => {
  try {
    const app = express();
    await connectToMongo();

    registerRoutes(app);

    const { PORT } = process.env;

    app.listen(PORT, () => console.log(`Server started on Port: ${PORT}`));
  } catch (e) {
    console.log(e);
    console.log("Could not start the server");
    process.exit(1);
  }
};
