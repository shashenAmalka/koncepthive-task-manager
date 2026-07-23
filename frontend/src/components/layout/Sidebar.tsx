"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ListTodo, LogOut, Hexagon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/tasks", label: "Tasks", icon: ListTodo },
];

interface SidebarProps {
  collapsed?: boolean;
  onNavigate?: () => void;
}

export function Sidebar({ collapsed = false, onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const logout = useAuthStore((s) => s.logout);

  return (
    <aside
      className={cn(
        "flex h-full flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-[68px]" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border px-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Hexagon className="h-5 w-5" />
        </div>
        {!collapsed && (
          <span className="text-base font-bold tracking-tight text-foreground">
            Koncept<span className="text-primary">hive</span>
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-active text-sidebar-active-foreground"
                  : "text-sidebar-foreground hover:bg-muted"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-sidebar-border p-3">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 text-sidebar-foreground hover:text-danger hover:bg-danger/10",
            collapsed && "justify-center px-0"
          )}
          onClick={logout}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </aside>
  );
}
