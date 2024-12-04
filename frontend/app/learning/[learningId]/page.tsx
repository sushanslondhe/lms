"use client";
import { use, useEffect } from "react";
import { useState, useMemo } from "react";
import { ModuleCard } from "@/components/module-card";
import { ContentModal } from "@/components/content-modal";
import { ProgressBar } from "@/components/progress-bar";
import { Module } from "@/app/types/module";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import axios from "axios";

// @ts-expect-error asd
export default function Page({ params }) {
  const resolvedParams = use(params);
  console.log(localStorage.getItem("authorization"));

  const [modules, setModules] = useState<Module[]>([]);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    const response = await fetch(
      `http://localhost:8080/api/fetch/training/${resolvedParams.learningId}`
    );
    const data = await response.json();
    setModules(data.availablemodules);
  }

  const progress = useMemo(() => {
    const completedModules = modules.filter(
      (module) => module.completed
    ).length;
    return Math.round((completedModules / modules.length) * 100);
  }, [modules]);

  const handleModuleClick = async (module: Module) => {
    setSelectedModule(module);
    await axios.post(
      "http://localhost:8080/api/user/enroll",
      {
        moduleId: module.id,
      },
      {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      }
    );
  };

  const handleCloseModal = () => {
    setSelectedModule(null);
  };

  const handleModuleComplete = async (id: string) => {
    setModules(
      modules.map((module) =>
        module.id === id ? { ...module, completed: !module.completed } : module
      )
    );

    setSelectedModule((prevSelected) =>
      prevSelected && prevSelected.id === id
        ? { ...prevSelected, completed: !prevSelected.completed }
        : prevSelected
    );
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-4">
        <Link href="/" className="flex items-center space-x-2 w-fit">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">CorporateLearn</span>
        </Link>
      </div>

      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Modules</h1>
        <ProgressBar progress={progress} />
        <div className="flex flex-col px-[15rem] gap-4">
          {modules.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              onClick={() => handleModuleClick(module)}
              onComplete={() => handleModuleComplete(module.id)}
            />
          ))}
        </div>
        <ContentModal
          isOpen={!!selectedModule}
          onClose={handleCloseModal}
          module={selectedModule}
          onComplete={handleModuleComplete}
        />
      </div>
    </div>
  );
}
