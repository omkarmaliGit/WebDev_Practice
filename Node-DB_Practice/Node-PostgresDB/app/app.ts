import express from "express";
import { registerRoutes } from "./modules/routes/routes.register";
import { connectToPostgres } from "./connection/postgres.connect";

export const startServer = async () => {
  try {
    const app = express();

    await connectToPostgres();

    registerRoutes(app);

    const { PORT } = process.env;

    app.listen(PORT, () =>
      console.log(`Server started on http://localhost:${PORT}`)
    );
  } catch (e) {
    console.log(e);
    console.log("Could not start the server");
    process.exit(1);
  }
};
