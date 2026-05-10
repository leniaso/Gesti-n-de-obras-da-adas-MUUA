import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, History, Users, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Registro de Obras",
    description: "Gestiona el inventario completo de obras del museo con información detallada.",
  },
  {
    icon: History,
    title: "Seguimiento de Restauraciones",
    description: "Monitorea el estado de las restauraciones y su progreso en tiempo real.",
  },
  {
    icon: Users,
    title: "Gestión de Personal",
    description: "Administra el equipo de trabajo y asigna responsabilidades.",
  },
  {
    icon: BarChart3,
    title: "Reportes y Estadísticas",
    description: "Visualiza datos y genera reportes del estado del patrimonio.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20UDEA.jpg-uupwoVI4nBUvQqevKP0WmWBdbRthTx.jpeg"
                alt="Universidad de Antioquia"
                width={40}
                height={50}
                className="h-12 w-auto bg-white rounded p-1"
              />
              <div>
                <h1 className="text-lg font-bold">MUUA</h1>
                <p className="text-xs text-primary-foreground/80">Museo Universitario</p>
              </div>
            </div>
            <Link href="/dashboard">
              <Button variant="secondary" size="sm">
                Ingresar al Sistema
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Content */}
        <section className="relative bg-gradient-to-b from-primary/5 to-background py-20 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
                  Sistema de Gestión de Obras Dañadas
                </h2>
                <p className="mt-6 text-lg text-muted-foreground text-pretty">
                  Plataforma integral para el registro, seguimiento y gestión de las obras 
                  del Museo Universitario Universidad de Antioquia que requieren 
                  conservación y restauración.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/dashboard">
                    <Button size="lg" className="gap-2">
                      Acceder al Dashboard
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/obras">
                    <Button variant="outline" size="lg">
                      Ver Catálogo de Obras
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20facultad_ingenieria-5ThzHY7pO67GBXmi5INzfrhSCNlEm1.png"
                  alt="Facultad de Ingenieria - Universidad de Antioquia"
                  width={500}
                  height={200}
                  className="w-full max-w-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-foreground">
                Funcionalidades del Sistema
              </h3>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Herramientas diseñadas para la gestión efectiva del patrimonio cultural universitario.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">{feature.title}</h4>
                  <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="bg-primary rounded-2xl px-8 py-16 text-center text-primary-foreground">
              <h3 className="text-3xl font-bold">
                Preservando el Patrimonio Cultural
              </h3>
              <p className="mt-4 text-lg text-primary-foreground/90 max-w-2xl mx-auto">
                Únete al esfuerzo de conservación y documentación de las obras del 
                Museo Universitario Universidad de Antioquia.
              </p>
              <Link href="/dashboard" className="inline-block mt-8">
                <Button size="lg" variant="secondary" className="gap-2">
                  Comenzar Ahora
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20UDEA.jpg-uupwoVI4nBUvQqevKP0WmWBdbRthTx.jpeg"
                alt="Universidad de Antioquia"
                width={32}
                height={40}
                className="h-10 w-auto"
              />
              <span className="text-sm text-muted-foreground">
                Universidad de Antioquia - 1803
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} MUUA. Sistema de Gestión de Obras.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
