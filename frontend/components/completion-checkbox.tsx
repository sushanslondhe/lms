import { Check } from "lucide-react";

interface CompletionCheckboxProps {
  completed: boolean;
  onChange: () => void;
}

export function CompletionCheckbox({
  completed,
  onChange,
}: CompletionCheckboxProps) {
  return (
    <button
      className={`w-5 h-5 border rounded-sm flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
        completed ? "bg-green-500 border-green-500" : "bg-white border-gray-300"
      }`}
      onClick={(e) => {
        e.stopPropagation();
        onChange();
      }}
      aria-label={completed ? "Mark as incomplete" : "Mark as complete"}
      role="checkbox"
      aria-checked={completed}
    >
      {completed && <Check className="w-3 h-3 text-white" />}
    </button>
  );
}
