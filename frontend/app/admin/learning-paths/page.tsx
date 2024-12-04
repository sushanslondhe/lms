"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useEffect, useState } from "react";

type LearningPath = {
  id: string;
  name: string;
  description: string;
  difficulty: string;
  estimatedDuration: number;
  createdAt: Date;
};

const columns: ColumnDef<LearningPath>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "difficulty",
    header: "difficulty",
  },
  {
    accessorKey: "estimatedDuration",
    header: "EstimatedDuration",
  },
  {
    accessorKey: "createdAt",
    header: "CreatedAt",
  },
];

export default function LearningPathsPage() {
  const [data, setData] = useState<LearningPath[]>([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/fetch/learning")
      .then((res) => res.json())
      .then((data) => {
        setData(data.availableLearnings);
      });
  }, []);
  return (
    <div className="container px-20 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold mb-6">Learning Paths</h1>
        <Link href="/admin/learning-paths/create">
          <Button>Create Learning Path</Button>
        </Link>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
