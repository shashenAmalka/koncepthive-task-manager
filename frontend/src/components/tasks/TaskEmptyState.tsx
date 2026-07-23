import { ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TaskEmptyStateProps {
  hasFilters: boolean;
  onCreateTask: () => void;
}

export function TaskEmptyState({ hasFilters, onCreateTask }: TaskEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted mb-4">
        <ClipboardList className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-1">
        {hasFilters ? "No tasks found" : "No tasks yet"}
      </h3>
      <p className="text-sm text-muted-foreground mb-4 max-w-sm">
        {hasFilters
          ? "Try adjusting your filters or search term to find what you're looking for."
          : "Get started by creating your first task. Stay organized and productive!"}
      </p>
      {!hasFilters && (
        <Button onClick={onCreateTask}>Create Your First Task</Button>
      )}
    </div>
  );
}
