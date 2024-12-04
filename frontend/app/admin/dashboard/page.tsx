"use client";
import { Sidebar } from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, FileText } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [data, setData] = useState<{
    userCount: number;
    learningCount: number;
    moduleCount: number;
    // @ts-expect-error abc
  }>({});
  useEffect(() => {
    fetch("http://localhost:8080/api/fetch/count")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  return (
    <div className="p-6 flex">
      <div>
        <Sidebar />
      </div>
      <div className="flex flex-col w-full gap-5 mx-auto px-5 border">
        <div className="text-3xl font-bold mb-6">Admin Dashboard</div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Total Users"
            value={data.userCount}
            icon={<Users className="h-6 w-6" />}
            description="Active users on the platform"
          />
          <StatCard
            title="Learning Paths"
            value={data.learningCount}
            icon={<BookOpen className="h-6 w-6" />}
            description="Available learning paths"
          />
          <StatCard
            title="Training Modules"
            value={data.moduleCount}
            icon={<FileText className="h-6 w-6" />}
            description="Individual training modules"
          />
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  description: string;
}

function StatCard({ title, value, icon, description }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
