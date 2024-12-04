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
exports.userAuthMiddleware = void 0;
const client_1 = require("@prisma/client");
// @ts-ignore
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
// @ts-ignore
const userAuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        const token = yield req.headers.authorization;
        const tokken = token.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                error: "Auth erorr",
                code: "UNAUTHORIZED",
            });
        }
        const verifyJWT = (yield jsonwebtoken_1.default.verify(tokken, process.env.JWT_SECRET));
        req.user = {
            name: verifyJWT.name,
            role: verifyJWT.role,
        };
        const info = {
            name: verifyJWT.name,
            Role: verifyJWT.role,
        };
        res.json({
            info,
        });
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(403).json({
            error: "Invalid token",
            code: "Token invalid",
        });
    }
});
exports.userAuthMiddleware = userAuthMiddleware;
