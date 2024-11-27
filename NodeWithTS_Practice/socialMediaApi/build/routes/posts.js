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
    res.json(posts);
});
// Create a post
router.post('/', (req, res) => {
    const { content } = req.body;
    const posts = (0, fileHelpers_1.readData)(POSTS_FILE);
    const newPost = {
        id: posts.length + 1,
        userId: req.userId,
        content,
        likes: [],
    };
    posts.push(newPost);
    (0, fileHelpers_1.writeData)(POSTS_FILE, posts);
    res.status(201).json(newPost);
});
// Like a post
router.post('/:id/like', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const posts = (0, fileHelpers_1.readData)(POSTS_FILE);
    const post = posts.find((p) => p.id === parseInt(id));
    if (!post) {
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
exports.default = router;
