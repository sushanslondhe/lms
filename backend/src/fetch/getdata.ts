import { Router } from "express";
import { userAuthMiddleware } from "../middleware";
import { PrismaClient } from "@prisma/client";
import { count } from "console";
const prisma = new PrismaClient();
const router = Router();
export const fetchData = router.get(
  "/learning",

  async (req, res) => {
    try {
      const availableLearnings = await prisma.learningPath.findMany({});

      res.status(200).json({
        message: "fetched available learning paths",
        availableLearnings,
        count: availableLearnings.length,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "cannot fetch data",
        error: error,
      });
    }
  }
);

router.get("/modules", async (req, res) => {
  try {
    const availablemodules = await prisma.trainingModule.findMany({});

    res.status(200).json({
      message: "fetched available training Modules",
      availablemodules,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "cannot fetch data",
      error: error,
    });
  }
});

router.get("/training/:id", async (req, res) => {
  // @ts-ignore
  const moduleId = await req.params.id;
  try {
    const availablemodules = await prisma.trainingModule.findMany({
      where: {
        learningPathId: moduleId,
      },
    });
    res.status(200).json({
      message: "fetched available training Modules",
      availablemodules,
      count: availablemodules.length,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "cannot fetch data",
      error: error,
    });
  }
});

router.get("/count", async (req, res) => {
  try {
    const userCount = await prisma.user.findMany({});
    const learningCount = await prisma.learningPath.findMany({});
    const moduleCount = await prisma.trainingModule.findMany({});

    res.status(200).json({
      message: "fetched count",
      userCount: userCount.length,
      learningCount: learningCount.length,
      moduleCount: moduleCount.length,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "cannot fetch data",
      error: error,
    });
  }
});

router.get("/users", async (req, res) => {
  try {
    const userCount = await prisma.user.findMany({});
    res.status(200).json({
      message: "fetched available users",
      userCount,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "cannot fetch data",
      error: error,
    });
  }
});

router.get("/user/profile", userAuthMiddleware, async (req, res) => {
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
  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: "cannot fetch data",
      error: error,
    });
  }
});
