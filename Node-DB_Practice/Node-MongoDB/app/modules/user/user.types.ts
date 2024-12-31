type role = "USER" | "ADMIN" | "SEMIADMIN";

export interface IUser {
  firstName: string;
  lastName: string;
  age: number;
  userName: string;
  password: string;
  role: role;
  deletedAt: Date | null;
}

export const USER_ROLE = {
  USER: "USER",
  ADMIN: "ADMIN",
  SEMIADMIN: "SEMIADMIN",
};
