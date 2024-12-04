"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "ADMIN",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const userSignup = async () => {
    const res = await axios.post(
      "http://localhost:8080/api/auth/signup",
      formData
    );
    if (res.status === 200) {
      localStorage.setItem("authorization", `Bearer ${res.data.token}`);

      setTimeout(() => {
        toast({
          title: "User Signup Success!!",
          variant: "default",
        });
      }, 2000);
    } else if (res.status === 411) {
      toast({
        title: "Signup Failed!!",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
    {
      toast({
        title: "Signup Failed!!",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };
  return (
    <div className=" flex border flex-col items-center justify-center m-[5rem] gap-4">
      <h1>Admin Signup</h1>
      <form onSubmit={userSignup}>
        <div className="flex flex-col gap-4">
          <div className="space-y-2 ">
            <Label htmlFor="firstName">Name</Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your first name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Work email</Label>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your work email"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              minLength={8}
              maxLength={12}
              placeholder="Create a password"
              required
            />
          </div>
          <Link href={"/admin/dashboard"}>
            <Button variant="ghost">Signup</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
