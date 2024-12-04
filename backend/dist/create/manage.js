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
exports.userEnroll = exports.admincreatePath = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
const zod_1 = __importDefault(require("zod"));
const TrainingModuleSchema = zod_1.default.object({
    title: zod_1.default.string().min(3, "Title must be at least 3 characters"),
    description: zod_1.default.string().optional(),
    type: zod_1.default.enum(["VIDEO", "DOCUMENT", "QUIZ", "WEBINAR"]),
    content: zod_1.default.string().url("Content must be a valid URL"),
    duration: zod_1.default.number().int().positive("Duration must be a positive number"),
    difficulty: zod_1.default.enum(["BEGINNER", "INTERMIDATE", "ADVANCED", "EXPERT"]),
});
const LearningPathSchema = zod_1.default.object({
    name: zod_1.default.string().min(3, "Name must be at least 3 characters"),
    description: zod_1.default.string().optional(),
    difficulty: zod_1.default.enum(["BEGINNER", "INTERMIDIATE", "ADVANCE", "EXPERT"]),
    estimatedDuration: zod_1.default
        .number()
        .int()
        .positive("Duration must be a positive number"),
    modules: zod_1.default
        .array(TrainingModuleSchema)
        .min(1, "At least one module is required"),
});
exports.admincreatePath = router.post("/createpath", middleware_1.userAuthMiddleware, 
// @ts-ignore
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        const user = req.user;
        if (!user || user.role !== "ADMIN") {
            return res.status(403).json({
                error: "Unauthorized",
                message: "Only admin can create learning paths",
            });
        }
        const validatedInputs = LearningPathSchema.safeParse(req.body);
        if (!validatedInputs.success) {
            return res.status(400).json({
                error: "Validation Failed",
                detatils: validatedInputs.error.errors,
            });
        }
        const { name, description, difficulty, estimatedDuration, modules, } = validatedInputs.data;
        const learningPath = yield prisma.learningPath.create({
            data: {
                name,
                description: description || "",
                // @ts-ignore
                difficulty: difficulty,
                estimatedDuration,
                createdAt: new Date(),
                trainingModules: {
                    // @ts-expect-error create error
                    create: modules === null || modules === void 0 ? void 0 : modules.map((module) => ({
                        title: module.title,
                        description: module.description,
                        type: module.type,
                        difficulty: module.difficulty,
                        duration: module.duration,
                        instructorId: user.id,
                    })),
                },
                updatedAt: new Date(),
            },
            include: {
                trainingModules: true,
            },
        });
        console.log(learningPath);
        res.status(201).json(learningPath);
    }
    catch (error) {
        console.log(error);
        res.json({
            error: "Failed to created learning path",
            details: error instanceof Error ? error.message : "Unknown error",
        });
    }
}));
exports.userEnroll = router.post("/enroll", middleware_1.userAuthMiddleware, 
// @ts-ignore
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const user = req.user;
    console.log(user);
    const moduleId = yield req.body.moduleId;
    try {
        const existingEnrollment = yield prisma.enrollment.findFirst({
            where: {
                userId: user.id,
                moduleId: moduleId,
            },
        });
        if (existingEnrollment) {
            return res.status(400).json({
                error: "User alredy enrolled in this module",
            });
        }
        const enrollUser = yield prisma.enrollment.create({
            data: {
                userId: user.id,
                moduleId: moduleId,
                status: "NOT_STARTED",
            },
        });
        const existingProgress = yield prisma.progress.findFirst({
            where: {
                userId: user.id,
                moduleId: moduleId,
            },
        });
        if (existingProgress) {
            return res.status(400).json({
                error: "User progress tracked is already being tracked",
            });
        }
        const initialProgress = yield prisma.progress.create({
            data: {
                userId: user.id,
                moduleId: moduleId,
                completedChapters: [], // Empty array to start
                totalProgress: 0, // Initial progress is 0
                lastAccessedAt: new Date(),
            },
        });
        res.status(201).json({
            message: `User successfully enrolled`,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            msg: "something went wrong here try again!",
            error: error,
        });
    }
}));
