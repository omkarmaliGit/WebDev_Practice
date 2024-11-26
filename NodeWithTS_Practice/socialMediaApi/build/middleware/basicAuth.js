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
const fileHelpers_1 = require("../helpers/fileHelpers");
const bcrypt_1 = __importDefault(require("bcrypt"));
const USERS_FILE = "./src/storage/users.json";
const basicAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }
    const [email, password] = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    const users = (0, fileHelpers_1.readData)(USERS_FILE);
    const user = users.find((u) => u.email === email);
    if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    req.userId = user.id;
    next();
});
exports.default = basicAuth;
