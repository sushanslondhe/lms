"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { useState } from "react";

export default function CreateModulePage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    difficulty: "",
    duration: 0,
    instructorId: "",
    learningPathId: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    const res = await axios.post(
      "http://localhost:8080/api/admin/createmodule",
      {
        title: formData.title,
        description: formData.description,
        type: formData.type,
        difficulty: formData.difficulty,
        duration: Number(formData.duration),
        instructorId: formData.instructorId,
        learningPathId: formData.learningPathId,
        content: "https://github.com/rust-lang/rust/issues/77501",
      }
    );
    if (res.status === 200) {
      toast({
        title: "Module Created",
        description: "Module Created Successfully",
        variant: "default",
      });
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <div className=" text-2xl font-bold mb-6">Create Training Module</div>
      <div className="w-full max-w-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            value={formData.title}
            onChange={handleChange}
            name="title"
            placeholder="Title"
          />
          <Label htmlFor="description">Description</Label>
          <Input
            value={formData.description}
            onChange={handleChange}
            type="text"
            name="description"
            placeholder="Description"
          />
          <Label htmlFor="type">Type</Label>

          <Input
            value={formData.type}
            onChange={handleChange}
            type="text"
            name="type"
            placeholder="Type of Module"
          />
          <Label htmlFor="difficulty">Difficulty</Label>
          <Input
            value={formData.difficulty}
            onChange={handleChange}
            type="text"
            name="difficulty"
            placeholder="Difficulty"
          />
          <Label htmlFor="duration">Duration</Label>
          <Input
            value={Number(formData.duration)}
            onChange={handleChange}
            type="number"
            name="duration"
            placeholder="Duration"
          />
          <Label htmlFor="instructorId">Instructor Id</Label>
          <Input
            value={formData.instructorId}
            onChange={handleChange}
            type="text"
            name="instructorId"
            placeholder="Instructor Id"
          />
          <Label htmlFor="learningPathId">Learning Path Id</Label>
          <Input
            value={formData.learningPathId}
            onChange={handleChange}
            type="text"
            name="learningPathId"
            placeholder="Learning Path Id"
          />
          <Button variant="default">Create</Button>
        </form>
      </div>
    </div>
  );
}
