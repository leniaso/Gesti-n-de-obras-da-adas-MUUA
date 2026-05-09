import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { RestauracionesContent } from "@/components/restauraciones/restauraciones-content";

export default function RestauracionesPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <Sidebar />
      <div className="ml-64">
        <Header 
          title="Restauraciones" 
          description="Seguimiento de procesos de restauracion de obras"
        />
        <main className="p-6">
          <RestauracionesContent />
        </main>
      </div>
    </div>
  );
}
