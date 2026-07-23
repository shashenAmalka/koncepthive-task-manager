"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useAuthStore } from "@/store/authStore";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const { isAuthenticated, hydrate } = useAuthStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (!isAuthenticated) {
      const token = typeof window !== "undefined" ? localStorage.getItem("koncepthive_token") : null;
      if (!token) {
        router.push("/login");
      }
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      {/* Mobile Sidebar (Sheet) */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <SheetDescription className="sr-only">Application navigation sidebar</SheetDescription>
          <Sidebar onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
