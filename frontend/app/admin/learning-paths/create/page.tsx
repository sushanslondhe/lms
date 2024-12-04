"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useState } from "react";

export default function CreatePage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    difficulty: "",
    estimatedDuration: 0,
    createdAt: new Date(),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:8080/api/admin/createpath", {
      name: formData.name,
      description: formData.description,
      difficulty: formData.difficulty,
      estimatedDuration: Number(formData.estimatedDuration),
      createdAt: formData.createdAt,
    });
    console.log(res);
    toast({
      title: "Learning Path Created",
      description: "Learning Path Created Successfully",
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className=" m-20  ">
      <div className="container  border flex flex-col items-center justify-center">
        <h1 className=" text-2xl font-bold mb-6">Create Learning Path</h1>
        <form
          className=" w-[30%] flex flex-col items-center gap-3 justify-center"
          onSubmit={handleSubmit}
        >
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            name="name"
            placeholder="Name"
          />
          <Label htmlFor="description">Description</Label>
          <Input
            type="text"
            required
            value={formData.description}
            onChange={handleChange}
            name="description"
            placeholder="Description"
          />
          <Label htmlFor="difficulty">Difficulty</Label>
          <Input
            type="text"
            required
            value={formData.difficulty}
            onChange={handleChange}
            name="difficulty"
            placeholder="Difficulty"
          />
          <Label htmlFor="estimatedDuration">EstimatedDuration</Label>
          <Input
            type="number"
            required
            value={formData.estimatedDuration}
            onChange={handleChange}
            name="estimatedDuration"
            placeholder="EstimatedDuration"
          />
          <Button variant="default" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
