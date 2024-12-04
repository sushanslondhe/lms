"use client";
import { User } from "lucide-react";
import { useEffect } from "react";

export default function Profile() {
  useEffect(() => {
    fetch("http://localhost:8080/api/fetch/user/profile")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);
  return (
    <div>
      <div>
        <div>
          <User className="h-8 w-8" />
        </div>
        <h1>Profile</h1>
      </div>
      <div>Enrollments</div>
      <div>Modules</div>
    </div>
  );
}
