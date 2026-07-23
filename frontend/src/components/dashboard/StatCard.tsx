"use client";

import { type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  index: number;
}

export function StatCard({ title, value, icon: Icon, color, bgColor, index }: StatCardProps) {
  return (
    <Card className={cn("animate-fade-in", `stagger-${index + 1}`)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className={cn("text-3xl font-bold animate-count-up", color)}>
              {value}
            </p>
          </div>
          <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", bgColor)}>
            <Icon className={cn("h-6 w-6", color)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
