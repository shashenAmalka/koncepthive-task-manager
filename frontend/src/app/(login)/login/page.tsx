"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Hexagon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "@/components/forms/LoginForm";
import { isAuthenticated } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <div className="w-full max-w-md animate-scale-in">
      {/* Branding */}
      <div className="flex flex-col items-center mb-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground mb-4 shadow-lg shadow-primary/25">
          <Hexagon className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">
          Koncept<span className="text-primary">hive</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Task Management System</p>
      </div>

      {/* Login Card */}
      <Card className="shadow-xl border-border/50">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
