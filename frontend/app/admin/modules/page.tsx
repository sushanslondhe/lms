"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useEffect, useState } from "react";

type TrainingModule = {
  id: string;
  title: string;
  description: string;
  type: string;
  difficulty: string;
  duration: number;
  instructorId: string;
  learningPathId: string;
  createdAt: Date;
};

const columns: ColumnDef<TrainingModule>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "title",
    header: "title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "type",
    header: "type",
  },
  {
    accessorKey: "duration",
    header: "Duration",
  },
  {
    accessorKey: "instructorId",
    header: "instructorId",
  },
  {
    accessorKey: "learningPathId",
    header: "learningPathId",
  },
  {
    accessorKey: "createdAt",
    header: "CreatedAt",
  },
];

export default function ModulesPage() {
  const [data, setData] = useState<TrainingModule[]>([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/fetch/modules")
      .then((res) => res.json())
      .then((data) => {
        setData(data.availablemodules);
      });
  }, []);
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold mb-6">Training Modules</h1>
        <Link href="/admin/modules/create">
          <Button>Create Training Module</Button>
        </Link>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
