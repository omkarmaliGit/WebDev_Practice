import { DataSource } from "typeorm";
import { UserEntity } from "../modules/user/user.schema";

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

export const appDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  logging: true,
  entities: [UserEntity],
  subscribers: [],
  migrations: [],
});

export const connectToPostgres = async () => {
  try {
    return await appDataSource
      .initialize()
      .then(() => console.log("Connected to DB"));
  } catch (error) {
    throw error;
  }
};
