"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const auth_1 = __importDefault(require("./routes/auth"));
const posts_1 = __importDefault(require("./routes/posts"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// Routes
app.use('/auth', auth_1.default);
app.use('/posts', posts_1.default);
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
