import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { ObrasContent } from "@/components/obras/obras-content";

export default function ObrasPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <Sidebar />
      <div className="ml-64">
        <Header 
          title="Catalogo de Obras" 
          description="Gestiona las obras de arte del museo"
        />
        <main className="p-6">
          <ObrasContent />
        </main>
      </div>
    </div>
  );
}
