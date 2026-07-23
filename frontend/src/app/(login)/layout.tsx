import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Koncepthive Task Manager",
  description: "Sign in to your Koncepthive Task Manager account.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      {children}
    </div>
  );
}
