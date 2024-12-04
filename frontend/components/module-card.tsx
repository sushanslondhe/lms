import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Youtube, FileText, CheckCircle } from "lucide-react";
import { CompletionCheckbox } from "./completion-checkbox";
import { Module } from "@/app/types/module";
interface ModuleCardProps {
  module: Module;
  onClick: () => void;
  onComplete: () => void;
}

export function ModuleCard({ module, onClick, onComplete }: ModuleCardProps) {
  return (
    <Card
      className={`cursor-pointer hover:bg-accent ${
        module.completed ? "bg-green-50" : ""
      }`}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        {module.type === "youtube" ? (
          <Youtube className="h-4 w-4 text-red-500 mr-2" />
        ) : (
          <FileText className="h-4 w-4 text-blue-500 mr-2" />
        )}
        <CardTitle className="text-sm font-medium flex-grow flex items-center">
          <div className="flex flex-row items-center gap-10">
            <div>{module.title}</div>
            <div>({module.duration} mins) </div>
            <div>{module.difficulty} </div>
          </div>
          {module.completed && (
            <CheckCircle className="h-4 w-4 text-green-500 ml-2 flex-shrink-0" />
          )}
        </CardTitle>
        <CompletionCheckbox
          completed={module.completed}
          onChange={onComplete}
        />
      </CardHeader>
    </Card>
  );
}
