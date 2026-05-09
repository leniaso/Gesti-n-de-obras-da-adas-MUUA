import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { DeteriorosContent } from "@/components/deterioros/deterioros-content";

export default function DeteriorosPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <Sidebar />
      <div className="ml-64">
        <Header 
          title="Reportes de Deterioro" 
          description="Gestiona los reportes de danos en obras de arte"
        />
        <main className="p-6">
          <DeteriorosContent />
        </main>
      </div>
    </div>
  );
}
