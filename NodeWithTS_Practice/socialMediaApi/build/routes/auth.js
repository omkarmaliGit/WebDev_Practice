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
const express_1 = require("express");
const fileHelpers_1 = require("../helpers/fileHelpers");
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = (0, express_1.Router)();
const USERS_FILE = "./src/storage/users.json";
// Register route
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const users = (0, fileHelpers_1.readData)(USERS_FILE);
    if (users.find(user => user.email === email)) {
        return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const newUser = { id: users.length + 1, email, password: hashedPassword };
    users.push(newUser);
    (0, fileHelpers_1.writeData)(USERS_FILE, users);
    res.status(201).json({ message: "User registered successfully" });
}));
exports.default = router;
