import express, { Request, Response } from 'express';
import { readData, writeData } from '../helpers/fileHelpers';
import basicAuth from '../middleware/basicAuth';

const router = express.Router();
const POSTS_FILE = "./src/storage/posts.json";

interface Post {
  id: number;
  userId: number;
  createdAt: string;
  content: string;
  likes: number[];
}

// Middleware applied to all post routes
router.use(basicAuth as any);

// Get all posts
router.get('/', async (req: Request, res: Response): Promise<any> => {
  const posts = readData<Post[]>(POSTS_FILE);
//   console.log('Fetched posts:', posts); // Debug log
  if (!posts) {
    return res.status(500).json({ message: "Error loading posts" });
  }
  res.json(posts);
});

// Create a post
router.post('/', (req: Request, res: Response) => {
    const { content } = req.body;
    const posts: Post[] = readData<Post[]>(POSTS_FILE);

     // Find the highest post ID
     const lastPostId = posts.length > 0 ? Math.max(...posts.map(post => post.id)) : 0;

    const newPost: Post = {
        id: lastPostId + 1,
        userId: req.userId!,
        createdAt: new Date().toLocaleDateString(),
        content,
        likes: [],
    };

    posts.push(newPost);
    writeData(POSTS_FILE, posts);

    console.log('New post created:', newPost); // Debug log
    res.status(201).json(newPost);
});

// Like a post
router.post('/:id/like', async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const posts: Post[] = readData<Post[]>(POSTS_FILE);

    const post = posts.find((p) => p.id === parseInt(id));
    if (!post) {
        console.log('Post not found for like:', id); // Debug log
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

// Edit a post
router.put('/:id/edit', async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const { content } = req.body;
    const posts: Post[] = readData<Post[]>(POSTS_FILE);

    const post = posts.find((p) => p.id === parseInt(id));
    if (!post) {
        console.log('Post not found for edit:', id); // Debug log
        return res.status(404).json({ message: "Post not found" });
    }

    if (!content) {
        return res.status(400).json({ message: "Content is required to update the post" });
    }

    post.content = content;
    // post.likes = []; // Optionally reset likes if content is changed
    writeData(POSTS_FILE, posts);

    console.log('Post updated:', post); // Debug log
    res.json({
        message: "Post updated successfully",
        post,
    });
});

// Delete a post
router.delete('/:id/delete', async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const posts: Post[] = readData<Post[]>(POSTS_FILE);

    const postIndex = posts.findIndex((p) => p.id === parseInt(id));
    if (postIndex === -1) {
        console.log('Post not found for delete:', id); // Debug log
        return res.status(404).json({ message: "Post not found" });
    }

    const deletedPost = posts.splice(postIndex, 1);
    writeData(POSTS_FILE, posts);

    console.log('Post deleted:', deletedPost[0]); // Debug log
    res.json({
        message: "Post deleted successfully",
        post: deletedPost[0],
    });
});

export default router;
