"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

interface Signuptype {
  name: string;
  email: string;
  password: string;
  role: string;
  jobtitle: string;
  department: string;
}
export default function SignupPage() {
  const { toast } = useToast();

  const [formData, setFormData] = useState<Signuptype>({
    name: "",
    email: "",
    password: "",
    role: "USER",
    jobtitle: "",
    department: "",
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
    } else {
      toast({
        title: "Signup Failed!!",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-4">
        <Link href="/" className="flex items-center space-x-2 w-fit">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">CorporateLearn</span>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md space-y-8 px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Create your account</h2>
            <p className="text-muted-foreground mt-2">
              Get started with CorporateLearn today
            </p>
            <Link href="/admin/signup">
              <Button variant="link">admin user ?</Button>
            </Link>
          </div>

          <form
            onSubmit={(e: React.FormEvent) => {
              e.preventDefault();

              userSignup();
            }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
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
              <div className="space-y-2">
                <Label htmlFor="jobtitle">Jobtitle</Label>
                <Input
                  name="jobtitle"
                  value={formData.jobtitle}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter your job title"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                name="department"
                value={formData.department}
                onChange={handleChange}
                type="text"
                placeholder="Enter your department"
                required
              />
            </div>
            <Button className="w-full" size="lg">
              Create account
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary hover:text-primary/90"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
