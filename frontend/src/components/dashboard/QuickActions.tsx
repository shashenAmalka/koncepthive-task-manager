"use client";

import Link from "next/link";
import { Plus, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface QuickActionsProps {
  onCreateTask: () => void;
}

export function QuickActions({ onCreateTask }: QuickActionsProps) {
  return (
    <Card className="animate-fade-in stagger-4">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          onClick={onCreateTask}
          className="w-full justify-start gap-2"
          variant="default"
        >
          <Plus className="h-4 w-4" />
          Create New Task
        </Button>
        <Button
          asChild
          variant="outline"
          className="w-full justify-start gap-2"
        >
          <Link href="/dashboard/tasks">
            <ArrowRight className="h-4 w-4" />
            View All Tasks
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
