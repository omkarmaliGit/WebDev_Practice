import express, { Request, Response } from 'express';
import { readData, writeData } from '../helpers/fileHelpers';
import basicAuth from '../middleware/basicAuth';

const router = express.Router();
const POSTS_FILE = "./src/storage/posts.json";

interface Post {
  id: number;
  userId: number;
  content: string;
}

// Middleware applied to all post routes
router.use(basicAuth as any);

// Get all posts
router.get('/', (req: Request, res: Response) => {
  const posts = readData<Post[]>(POSTS_FILE);
  res.json(posts);
});

export default router;
