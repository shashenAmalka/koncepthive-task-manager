"use client";

import { ListTodo, Clock, Play, CheckCircle2, AlertTriangle } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { useDashboardStats } from "@/hooks/useDashboard";
import { Skeleton } from "@/components/ui/skeleton";

const statConfig = [
  {
    key: "total" as const,
    title: "Total Tasks",
    icon: ListTodo,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    key: "pending" as const,
    title: "Pending",
    icon: Clock,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-100 dark:bg-amber-900/30",
  },
  {
    key: "inProgress" as const,
    title: "In Progress",
    icon: Play,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    key: "completed" as const,
    title: "Completed",
    icon: CheckCircle2,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
  },
  {
    key: "overdue" as const,
    title: "Overdue",
    icon: AlertTriangle,
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-100 dark:bg-red-900/30",
  },
];

export function StatsGrid() {
  const { data: stats, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-[104px] rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {statConfig.map((stat, index) => (
        <StatCard
          key={stat.key}
          title={stat.title}
          value={stats?.[stat.key] ?? 0}
          icon={stat.icon}
          color={stat.color}
          bgColor={stat.bgColor}
          index={index}
        />
      ))}
    </div>
  );
}
