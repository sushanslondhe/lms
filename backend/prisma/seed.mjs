import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.createMany({
    data: [
      {
        name: "temp1",
        email: "temp1234@email.com",
        password: "12345678",
        role: "USER",
      },
    ],
  });
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@mail.com" },
    update: {},
    create: {
      email: "admin@mail.com",
      name: "adminUser",
      password: "hashpasskey123",
      role: "ADMIN",
    },
  });
  const superAdminUser = await prisma.user.create({
    data: {
      email: "superadmin@mail.com",
      name: "superAdminUser",
      password: "admin12345",
      role: "SUPERADMIN",
    },
  });

  const softwareDevelopmentPath = await prisma.learningPath.create({
    data: {
      name: "Full Stack Web Development",
      description: "Comprehensive path to become a full stack web developer",
      difficulty: "INTERMEDIATE",
      estimatedDuration: 240, // 240 hours
      createdAt: new Date(),
      trainingModules: {
        create: [
          {
            title: "Frontend Fundamentals with React",
            description: "Learn modern frontend development using React",
            type: "DOCUMENT",
            difficulty: "BEGINNER",
            duration: 60,
            instructorId: adminUser.id,
            externalresources: {
              create: [
                {
                  title: "React Official Documentation",
                  url: "https://reactjs.org/docs/getting-started.html",
                  resourceType: "REFERENCE_MATERIAL",
                },
              ],
            },
          },
          {
            title: "Backend Development with Node.js and Express",
            description: "Build scalable backend services using Node.js",
            type: "DOCUMENT",
            difficulty: "INTERMEDIATE",
            duration: 80,
            instructorId: adminUser.id,
            externalresources: {
              create: [
                {
                  title: "Express.js Guide",
                  url: "https://expressjs.com/en/guide/routing.html",
                  resourceType: "TUTORIAL",
                },
              ],
            },
          },
        ],
      },
    },
  });
  console.log(
    "software development path created successfully",
    softwareDevelopmentPath
  );

  const dataSciencePath = await prisma.learningPath.create({
    data: {
      name: "Data Science and Machine Learning",
      description:
        "Comprehensive journey into data science and machine learning",
      difficulty: "ADVANCE",
      estimatedDuration: 300, // 300 hours
      createdAt: new Date(),
      trainingModules: {
        create: [
          {
            title: "Python for Data Science",
            description: "Master Python programming for data analysis",
            type: "VIDEO",
            difficulty: "ADVANCE",
            duration: 60,
            instructorId: adminUser.id,
            externalresources: {
              create: [
                {
                  title: "NumPy Documentation",
                  url: "https://numpy.org/doc/",
                  resourceType: "REFERENCE_MATERIAL",
                },
              ],
            },
          },
          {
            title: "Machine Learning Algorithms",
            description:
              "Deep dive into machine learning algorithms and implementation",
            type: "QUIZ",
            difficulty: "ADVANCE",
            duration: 90,
            instructorId: adminUser.id,
            externalresources: {
              create: [
                {
                  title: "Scikit-learn Tutorials",
                  url: "https://scikit-learn.org/stable/tutorials/",
                  resourceType: "TUTORIAL",
                },
              ],
            },
          },
        ],
      },
    },
  });
  console.log("data science path created successfully", dataSciencePath);

  console.log("seed data create successfully");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export default main;
