"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function LoginPage() {
  const { toast } = useToast();
  const userSigin = async () => {
    const res = await axios.post(
      "http://localhost:8080/api/auth/signin",
      formData
    );
    if (res) {
      toast({
        title: `user signed in success`,
        variant: "default",
      });
    }
  };
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-4">
        <Link href="/" className="flex items-center space-x-2 w-fit">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Corporate Learn</span>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md space-y-8 px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Welcome back</h2>
            <p className="text-muted-foreground mt-2">
              Sign in to your account to continue
            </p>
          </div>

          <form
            onSubmit={(e: React.FormEvent) => {
              e.preventDefault();
              userSigin();
            }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                value={formData.email}
                type="email"
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                value={formData.password}
                type="password"
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  href="/forgot-password"
                  className="text-primary hover:text-primary/90"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <Button className="w-full" size="lg">
              Sign in
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Dont have an account?{" "}
              <Link
                href="/signup"
                className="text-primary hover:text-primary/90"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
