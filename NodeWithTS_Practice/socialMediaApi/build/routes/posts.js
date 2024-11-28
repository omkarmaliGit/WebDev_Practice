"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fileHelpers_1 = require("../helpers/fileHelpers");
const basicAuth_1 = __importDefault(require("../middleware/basicAuth"));
const router = express_1.default.Router();
const POSTS_FILE = "./src/storage/posts.json";
// Middleware applied to all post routes
router.use(basicAuth_1.default);
// Get all posts
router.get('/', (req, res) => {
    const posts = (0, fileHelpers_1.readData)(POSTS_FILE);
    console.log('Fetched posts:', posts); // Debug log
    res.json(posts);
});
// Create a post
router.post('/', (req, res) => {
    const { content } = req.body;
    const posts = (0, fileHelpers_1.readData)(POSTS_FILE);
    // Find the highest post ID
    const lastPostId = posts.length > 0 ? Math.max(...posts.map(post => post.id)) : 0;
    const newPost = {
        id: lastPostId + 1,
        userId: req.userId,
        content,
        likes: [],
    };
    posts.push(newPost);
    (0, fileHelpers_1.writeData)(POSTS_FILE, posts);
    console.log('New post created:', newPost); // Debug log
    res.status(201).json(newPost);
});
// Like a post
router.post('/:id/like', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const posts = (0, fileHelpers_1.readData)(POSTS_FILE);
    const post = posts.find((p) => p.id === parseInt(id));
    if (!post) {
        console.log('Post not found for like:', id); // Debug log
        return res.status(404).json({ message: "Post not found" });
    }
    if (post.likes.includes(req.userId)) {
        post.likes = post.likes.filter((uid) => uid !== req.userId);
    }
    else {
        post.likes.push(req.userId);
    }
    (0, fileHelpers_1.writeData)(POSTS_FILE, posts);
    res.json(post);
}));
// Edit a post
router.put('/:id/edit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { content } = req.body;
    const posts = (0, fileHelpers_1.readData)(POSTS_FILE);
    const post = posts.find((p) => p.id === parseInt(id));
    if (!post) {
        console.log('Post not found for edit:', id); // Debug log
        return res.status(404).json({ message: "Post not found" });
    }
    if (!content) {
        return res.status(400).json({ message: "Content is required to update the post" });
    }
    post.content = content;
    post.likes = []; // Optionally reset likes if content is changed
    (0, fileHelpers_1.writeData)(POSTS_FILE, posts);
    console.log('Post updated:', post); // Debug log
    res.json({
        message: "Post updated successfully",
        post,
    });
}));
// Delete a post
router.delete('/:id/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const posts = (0, fileHelpers_1.readData)(POSTS_FILE);
    const postIndex = posts.findIndex((p) => p.id === parseInt(id));
    if (postIndex === -1) {
        console.log('Post not found for delete:', id); // Debug log
        return res.status(404).json({ message: "Post not found" });
    }
    const deletedPost = posts.splice(postIndex, 1);
    (0, fileHelpers_1.writeData)(POSTS_FILE, posts);
    console.log('Post deleted:', deletedPost[0]); // Debug log
    res.json({
        message: "Post deleted successfully",
        post: deletedPost[0],
    });
}));
exports.default = router;
