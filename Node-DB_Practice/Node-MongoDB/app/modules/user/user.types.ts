type role = "USER" | "ADMIN" | "SEMIADMIN";

export interface IUser {
  firstName: string;
  lastName: string;
  age: number;
  userName: string;
  password: string;
  role: role;
}
