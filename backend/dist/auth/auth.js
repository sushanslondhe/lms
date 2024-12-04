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
exports.userAuth = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
// @ts-ignore
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
const signupSchmea = zod_1.z.object({
    email: zod_1.z.string().email(),
    name: zod_1.z.string(),
    role: zod_1.z.string(),
    password: zod_1.z.string().min(8).max(15),
    jobtitle: (0, zod_1.string)().optional(),
    department: (0, zod_1.string)().optional(),
});
// @ts-ignore
exports.userAuth = router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const validateData = signupSchmea.safeParse(req.body);
    try {
        if (!validateData.success) {
            console.log(validateData.error.errors);
            return res.status(411).send("error while signup please check inputs");
        }
        const hashedPassword = yield bcrypt_1.default.hash(req.body.password, 10);
        const user = yield prisma.user.create({
            data: {
                email: ((_a = validateData.data) === null || _a === void 0 ? void 0 : _a.email) || req.body.email,
                name: ((_b = validateData.data) === null || _b === void 0 ? void 0 : _b.name) || req.body.name,
                password: hashedPassword,
                // @ts-ignore
                role: (_c = validateData.data) === null || _c === void 0 ? void 0 : _c.role,
                profile: {
                    create: {
                        jobTitle: (_d = validateData.data) === null || _d === void 0 ? void 0 : _d.jobtitle,
                        department: (_e = validateData.data) === null || _e === void 0 ? void 0 : _e.department,
                        skills: [],
                    },
                },
            },
        });
        const token = yield jsonwebtoken_1.default.sign({ user: req.body.email, role: req.body.role }, process.env.JWT_SECRET);
        res.json({
            msg: "user signup sucess",
            token,
        });
    }
    catch (error) {
        console.log(error);
        res.status(403).json({
            msg: "something went wrong try again",
        });
    }
}));
const siginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
// @ts-ignore
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g;
    const body = req.body;
    const validatedData = siginSchema.safeParse(body);
    try {
        if (!validatedData.success) {
            res.status(411).json({ msg: "Invalid inputs" });
        }
        const user = yield prisma.user.findUnique({
            where: {
                email: (_f = validatedData.data) === null || _f === void 0 ? void 0 : _f.email,
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                password: true,
            },
        });
        if (!user) {
            return res.status(411).json({ msg: "user not found" });
        }
        const checkPassword = yield bcrypt_1.default.compare(
        // @ts-ignore
        (_g = validatedData.data) === null || _g === void 0 ? void 0 : _g.password, user === null || user === void 0 ? void 0 : user.password);
        if (!checkPassword) {
            return res.status(403).json({
                msg: "Incorrect password try again!!",
            });
        }
        res.json({
            msg: "Sign in success ",
            email: user === null || user === void 0 ? void 0 : user.email,
            name: user === null || user === void 0 ? void 0 : user.name,
            role: user === null || user === void 0 ? void 0 : user.role,
        });
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            error: "Unauthorized",
            message: "Invalid token",
        });
    }
}));
