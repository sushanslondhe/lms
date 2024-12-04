import { PrismaClient } from "@prisma/client";
// @ts-ignore
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// @ts-ignore
export const userAuthMiddleware = async (req, res, next) => {
  // @ts-ignore
  const authHeader = await req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: "Auth erorr",
      code: "UNAUTHORIZED",
    });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Invalid token format",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded.user);

    const user = await prisma.user.findUnique({
      where: { email: decoded.user },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "user not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(403).send("unauthorized access");
  }
};
