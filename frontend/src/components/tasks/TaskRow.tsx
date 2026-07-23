"use client";

import { Pencil, Trash2 } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/StatusBadge";
import { PriorityBadge } from "@/components/common/PriorityBadge";
import { formatDate, isOverdue, cn } from "@/lib/utils";
import type { Task } from "@/types/task";

interface TaskRowProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export function TaskRow({ task, onEdit, onDelete }: TaskRowProps) {
  const overdue = isOverdue(task.dueDate, task.status);

  return (
    <TableRow className="group">
      <TableCell className="font-medium max-w-[250px]">
        <span className="truncate block">{task.title}</span>
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        <PriorityBadge priority={task.priority} />
      </TableCell>
      <TableCell>
        <StatusBadge status={task.status} />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <span
          className={cn(
            "text-sm",
            overdue ? "text-danger font-medium" : "text-muted-foreground"
          )}
        >
          {formatDate(task.dueDate)}
          {overdue && " (Overdue)"}
        </span>
      </TableCell>
      <TableCell className="hidden lg:table-cell text-muted-foreground text-sm">
        {formatDate(task.createdAt)}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onEdit(task)}
            aria-label={`Edit task ${task.title}`}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-danger hover:text-danger hover:bg-danger/10"
            onClick={() => onDelete(task)}
            aria-label={`Delete task ${task.title}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
