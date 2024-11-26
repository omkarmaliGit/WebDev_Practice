import express, { Request, Response, Router} from 'express';
import { readData, writeData } from '../helpers/fileHelpers';
import bcrypt from 'bcrypt';

const router = Router();
const USERS_FILE = "./src/storage/users.json";

interface User {
  id: number;
  email: string;
  password: string;
}

// Register route
router.post('/register', async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  const users: User[] = readData<User[]>(USERS_FILE);

  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = { id: users.length + 1, email, password: hashedPassword };
  users.push(newUser);
  writeData(USERS_FILE, users);

  res.status(201).json({ message: "User registered successfully" });
});

export default router;
