import { useQuery } from "@tanstack/react-query";
import { TaskService } from "@/services/task.service";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => TaskService.getDashboardStats(),
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
  });
}
