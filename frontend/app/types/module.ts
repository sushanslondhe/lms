export type ModuleType = "youtube" | "DOCUMENT";

export interface Module {
  id: string;
  title: string;
  description: string;
  type: ModuleType;
  difficulty: string;
  duration: number;
  completed: boolean; // Add this line
}
