"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { TaskTable } from "@/components/tasks/TaskTable";
import { TaskFiltersBar } from "@/components/tasks/TaskFilters";
import { TaskForm } from "@/components/forms/TaskForm";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { useTasks, useDeleteTask } from "@/hooks/useTasks";
import { useDebounce } from "@/hooks/useDebounce";
import type { Task, TaskFilters } from "@/types/task";

export default function TasksPage() {
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState<TaskFilters>({
    status: "",
    priority: "",
    sortBy: "newest",
  });

  const debouncedSearch = useDebounce(searchValue, 300);

  const activeFilters: TaskFilters = {
    ...filters,
    search: debouncedSearch || undefined,
    status: filters.status || undefined,
    priority: filters.priority || undefined,
  };

  const { data: tasks = [], isLoading } = useTasks(activeFilters);
  const deleteTask = useDeleteTask();

  // Modal state
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Task | null>(null);

  const hasFilters = !!(debouncedSearch || filters.status || filters.priority);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setFormOpen(true);
  };

  const handleCreate = () => {
    setEditingTask(null);
    setFormOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteTask.mutateAsync(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Tasks" description="Manage and organize all your tasks.">
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Task
        </Button>
      </PageHeader>

      <TaskFiltersBar
        filters={filters}
        onFiltersChange={setFilters}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />

      <TaskTable
        tasks={tasks}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={setDeleteTarget}
        onCreateTask={handleCreate}
        hasFilters={hasFilters}
      />

      {/* Create / Edit Modal */}
      <TaskForm
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditingTask(null);
        }}
        task={editingTask}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        title="Delete Task"
        description={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        isLoading={deleteTask.isPending}
      />
    </div>
  );
}
