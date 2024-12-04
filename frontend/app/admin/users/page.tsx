"use client";

import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
];

export default function UsersPage() {
  const [data, setData] = useState<User[]>([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/fetch/users")
      .then((res) => res.json())
      .then((data) => {
        setData(data.userCount);
      });
  }, []);
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
