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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchData = void 0;
const express_1 = require("express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
exports.fetchData = router.get("/learning", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const availableLearnings = yield prisma.learningPath.findMany({});
        res.status(200).json({
            message: "fetched available learning paths",
            availableLearnings,
            count: availableLearnings.length,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            message: "cannot fetch data",
            error: error,
        });
    }
}));
router.get("/modules", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const availablemodules = yield prisma.trainingModule.findMany({});
        res.status(200).json({
            message: "fetched available training Modules",
            availablemodules,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            message: "cannot fetch data",
            error: error,
        });
    }
}));
router.get("/training/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const moduleId = yield req.params.id;
    try {
        const availablemodules = yield prisma.trainingModule.findMany({
            where: {
                learningPathId: moduleId,
            },
        });
        res.status(200).json({
            message: "fetched available training Modules",
            availablemodules,
            count: availablemodules.length,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            message: "cannot fetch data",
            error: error,
        });
    }
}));
router.get("/count", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userCount = yield prisma.user.findMany({});
        const learningCount = yield prisma.learningPath.findMany({});
        const moduleCount = yield prisma.trainingModule.findMany({});
        res.status(200).json({
            message: "fetched count",
            userCount: userCount.length,
            learningCount: learningCount.length,
            moduleCount: moduleCount.length,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            message: "cannot fetch data",
            error: error,
        });
    }
}));
router.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userCount = yield prisma.user.findMany({});
        res.status(200).json({
            message: "fetched available users",
            userCount,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            message: "cannot fetch data",
            error: error,
        });
    }
}));
router.get("/user/profile", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        const userId = req.user.id;
        console.log(userId);
        const myUser = prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                profile: true,
                enrollments: true,
                trainingModules: true,
            },
        });
        res.status(200).json({
            message: "fetched profile",
            myUser,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            message: "cannot fetch data",
            error: error,
        });
    }
}));
