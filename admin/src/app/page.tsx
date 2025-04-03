import Dashboard from "@/components/dashboard";
import AuthGuard from "@/components/AuthGuard";

export default function Home() {
  return (
    <AuthGuard>
      <Dashboard />
    </AuthGuard>
  );
}
