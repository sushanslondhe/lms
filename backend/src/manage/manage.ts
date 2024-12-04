import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import z from "zod";

const TrainingModuleSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  type: z.enum(["VIDEO", "DOCUMENT", "QUIZ", "WEBINAR"]),
  content: z.string().url("Content must be a valid URL"),
  instructorId: z.string(),
  duration: z.number().int().positive("Duration must be a positive number"),
  difficulty: z.string(),
});

const prisma = new PrismaClient();
const router = Router();

type LearningPathSchema = {
  name: string;
  description: string;
  difficulty: string;
  estimatedDuration: number;
  modules: {
    title: string;
    description: string;
    type: string;
    difficulty: string;
    duration: number;
  }[];
};

const LearningPathSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().optional(),
  difficulty: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCE", "EXPERT"]),
  estimatedDuration: z
    .number()
    .int()
    .positive("Duration must be a positive number"),
});

export const admincreatePath = router.post(
  "/createpath",
  // @ts-ignore
  async (req, res) => {
    try {
      // @ts-ignore
      const user = req.user;

      // if (!user || user.role !== "ADMIN") {
      //   return res.status(403).json({
      //     error: "Unauthorized",
      //     message: "Only admin can create learning paths",
      //   });
      // }

      const validatedInputs = LearningPathSchema.safeParse(req.body);
      if (!validatedInputs.success) {
        return res.status(400).json({
          error: "Validation Failed",
          detatils: validatedInputs.error.errors,
        });
      }

      const { name, description, difficulty, estimatedDuration } =
        validatedInputs.data;

      const learningPath = await prisma.learningPath.create({
        data: {
          name,
          description: description || "",
          // @ts-ignore
          difficulty: difficulty,
          estimatedDuration,
          createdAt: new Date(),

          updatedAt: new Date(),
        },
      });
      console.log(learningPath);

      res.status(201).json(learningPath);
    } catch (error) {
      console.log(error);
      res.json({
        error: "Failed to created learning path",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
);

export const createModule = router.post(
  "/createmodule",
  // @ts-ignore
  async (req, res) => {
    try {
      const validatedInputs = TrainingModuleSchema.safeParse(req.body);
      if (!validatedInputs.success) {
        return res.status(400).json({
          error: "Validation Failed",
          detatils: validatedInputs.error.errors,
        });
      }

      const { title, description, type, difficulty, duration, instructorId } =
        validatedInputs.data;

      const trainingModule = await prisma.trainingModule.create({
        data: {
          title,
          description: description || "",
          type: type,
          // @ts-ignore
          difficulty,
          duration,
          instructorId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      console.log(trainingModule);

      res.status(201).json(trainingModule);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: "Failed to create module",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
);

export const userEnroll = router.post(
  "/enroll",
  // @ts-ignore
  async (req, res) => {
    // @ts-ignore
    const user = req.user;
    console.log(user);

    const moduleId = await req.body.moduleId;

    try {
      const existingEnrollment = await prisma.enrollment.findFirst({
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
      const enrollUser = await prisma.enrollment.create({
        data: {
          userId: user.id,
          moduleId: moduleId,
          status: "NOT_STARTED",
        },
      });
      const existingProgress = await prisma.progress.findFirst({
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

      const initialProgress = await prisma.progress.create({
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
    } catch (error) {
      console.log(error);
      res.status(400).json({
        msg: "something went wrong here try again!",
        error: error,
      });
    }
  }
);
