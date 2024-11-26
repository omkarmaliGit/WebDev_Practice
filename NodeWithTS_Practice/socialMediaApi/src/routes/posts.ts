import express, { Request, Response } from 'express';
import { readData, writeData } from '../helpers/fileHelpers';
import basicAuth from '../middleware/basicAuth';

const router = express.Router();
const POSTS_FILE = "./src/storage/posts.json";

interface Post {
  id: number;
  userId: number;
  content: string;
  likes: number[];
}

// Middleware applied to all post routes
router.use(basicAuth as any);

// Get all posts
router.get('/', (req: Request, res: Response) => {
  const posts = readData<Post[]>(POSTS_FILE);
  res.json(posts);
});

// Create a post
router.post('/', (req: Request, res: Response) => {
    const { content } = req.body;
    const posts: Post[] = readData<Post[]>(POSTS_FILE);

    const newPost: Post = {
        id: posts.length + 1,
        userId: req.userId!,
        content,
        likes: [],
    };

    posts.push(newPost);
    writeData(POSTS_FILE, posts);

    res.status(201).json(newPost);
});

// Like a post
router.post('/:id/like', async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const posts: Post[] = readData<Post[]>(POSTS_FILE);

    const post = posts.find((p) => p.id === parseInt(id));
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    if (post.likes.includes(req.userId!)) {
        post.likes = post.likes.filter((uid) => uid !== req.userId);
    } else {
        post.likes.push(req.userId!);
    }

    writeData(POSTS_FILE, posts);
    res.json(post);
});

export default router;
