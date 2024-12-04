import e, { Router } from "express";
import { string, z } from "zod";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
// @ts-ignore
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const router = Router();

const signupSchmea = z.object({
  email: z.string().email(),
  name: z.string(),
  role: z.string(),
  password: z.string().min(8).max(15),
  jobtitle: string().optional(),
  department: string().optional(),
});
// @ts-ignore
export const userAuth = router.post("/signup", async (req, res) => {
  const validateData = signupSchmea.safeParse(req.body);

  try {
    if (!validateData.success) {
      console.log(validateData.error.errors);

      return res.status(411).send("error while signup please check inputs");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await prisma.user.create({
      data: {
        email: validateData.data?.email || req.body.email,
        name: validateData.data?.name || req.body.name,
        password: hashedPassword,
        // @ts-ignore
        role: validateData.data?.role,
        profile: {
          create: {
            jobTitle: validateData.data?.jobtitle,
            department: validateData.data?.department,
            skills: [],
          },
        },
      },
    });

    const token = await jwt.sign(
      { user: req.body.email, role: req.body.role },
      process.env.JWT_SECRET
    );

    res.json({
      msg: "user signup sucess",
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(403).json({
      msg: "something went wrong try again",
    });
  }
});

const siginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
// @ts-ignore
router.post("/signin", async (req, res) => {
  const body = req.body;
  const validatedData = siginSchema.safeParse(body);

  try {
    if (!validatedData.success) {
      res.status(411).json({ msg: "Invalid inputs" });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: validatedData.data?.email,
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

    const checkPassword = await bcrypt.compare(
      // @ts-ignore
      validatedData.data?.password,
      user?.password
    );
    if (!checkPassword) {
      return res.status(403).json({
        msg: "Incorrect password try again!!",
      });
    }
    res.json({
      msg: "Sign in success ",
      email: user?.email,
      name: user?.name,
      role: user?.role,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "Unauthorized",
      message: "Invalid token",
    });
  }
});
