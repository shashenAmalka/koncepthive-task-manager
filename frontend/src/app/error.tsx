"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-danger/10 mb-6">
        <AlertTriangle className="h-10 w-10 text-danger" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
      <p className="text-sm text-muted-foreground mb-6 max-w-md">
        An unexpected error occurred. Please try again or contact support if the problem persists.
      </p>
      <Button onClick={reset}>Try Again</Button>
    </div>
  );
}
