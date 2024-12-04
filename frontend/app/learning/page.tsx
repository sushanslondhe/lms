"use client";
import { Button } from "@/components/ui/button";
import { BookOpen, PlayCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
type learning = {
  id: string;
  name: string;
  description: string;
  difficulty: string;
  estimatedDuration: number;
};
export default function Page() {
  const [courses, setCourses] = useState<learning[]>([]);
  async function fetchData() {
    const res = await fetch("http://localhost:8080/api/fetch/learning");
    const data = await res.json();
    setCourses(data.availableLearnings);
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-50">
      <div className="container mx-auto px-4 py-4">
        <Link href="/" className="flex items-center space-x-2 w-fit">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">CorporateLearn</span>
        </Link>
      </div>

      <div className="text-center m-10 hover:underline underline-offset-2 text-3xl">
        Available Learning Paths
      </div>
      <div className="grid grid-cols-1 md:grid md:grid-cols-2 gap-10">
        {courses.map((course) => (
          <div key={course.id}>
            <Container
              id={course.id}
              title={course.name}
              description={course.description}
              difficulty={course.difficulty}
              duration={course.estimatedDuration}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function Container({
  id,
  title,
  description,
  difficulty,
  duration,
}: {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  duration: number;
}) {
  return (
    <div
      key={id}
      className="container relative  cursor-pointer  border h-[25rem] rounded-lg p-5 shadow-md flex flex-col items-center  "
    >
      <div className="h-[50%] relative w-full rounded-t-lg bg-gradient-to-r from-slate-100 to-gray-800 ">
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-500">
          <div className=" absolute  font-bold text-3xl animate-ping duration-1000">
            {difficulty}
          </div>
          <PlayCircle className="w-16 h-16 text-white" />
        </div>
        <div className="flex justify-end items-center text-white font-mono font-sm m-5">
          {duration} mins
        </div>
      </div>
      <div className="  w-full">
        <div className=" text-2xl text-center font-bold">{title}</div>
        <div className="text-center text-sm text-muted-foreground mx-[100px]">
          {description}
        </div>
      </div>
      <Link className="w-full " href={`/learning/${id}`}>
        <Button
          onClick={() => {
            console.log(id);
          }}
          className="w-[70%] mt-10 mx-[10%]  "
          variant="default"
        >
          Start Learning
        </Button>
      </Link>
    </div>
  );
}
