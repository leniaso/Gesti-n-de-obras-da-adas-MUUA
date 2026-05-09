import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { DashboardContent } from "@/components/dashboard/dashboard-content";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <Sidebar />
      <div className="ml-64">
        <Header 
          title="Dashboard" 
          description="Vista general del estado de las obras del museo"
        />
        <main className="p-6">
          <DashboardContent />
        </main>
      </div>
    </div>
  );
}
