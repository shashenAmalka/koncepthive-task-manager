"use client";

import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { StatusChart } from "@/components/dashboard/StatusChart";
import { RecentTasks } from "@/components/dashboard/RecentTasks";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { TaskForm } from "@/components/forms/TaskForm";
import { useAuthStore } from "@/store/authStore";

export default function DashboardPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const user = useAuthStore((s) => s.user);

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome back${user?.name ? `, ${user.name}` : ""}`}
        description="Here's an overview of your tasks and progress."
      />

      <StatsGrid />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <RecentTasks />
        </div>
        <div className="space-y-6">
          <StatusChart />
          <QuickActions onCreateTask={() => setCreateOpen(true)} />
        </div>
      </div>

      <TaskForm open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  );
}
