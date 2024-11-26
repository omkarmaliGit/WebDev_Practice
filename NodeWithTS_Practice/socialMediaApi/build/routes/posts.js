"use strict";
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
exports.default = router;
