import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { PersonalContent } from "@/components/personal/personal-content";

export default function PersonalPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <Sidebar />
      <div className="ml-64">
        <Header 
          title="Personal del Museo" 
          description="Gestiona el personal y restauradores del museo"
        />
        <main className="p-6">
          <PersonalContent />
        </main>
      </div>
    </div>
  );
}
