import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Module } from "@/app/types/module";

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  module: Module | null;
  onComplete: (id: string) => void;
}

export function ContentModal({
  isOpen,
  onClose,
  module,
  onComplete,
}: ContentModalProps) {
  if (!module) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{module.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {module.type === "youtube" ? (
            <iframe
              width="100%"
              height="450"
              src={`https://www.youtube.com/embed/${module.content}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="prose max-w-none">
              <p>{module.description}</p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            onClick={() => onComplete(module.id)}
            variant={module.completed ? "outline" : "default"}
          >
            {module.completed ? "Mark as Incomplete" : "Mark as Complete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
