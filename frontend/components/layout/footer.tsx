import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20UDEA.jpg-uupwoVI4nBUvQqevKP0WmWBdbRthTx.jpeg"
              alt="Universidad de Antioquia"
              width={48}
              height={60}
              className="h-14 w-auto"
            />
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20facultad_ingenieria-5ThzHY7pO67GBXmi5INzfrhSCNlEm1.png"
              alt="Facultad de Ingenieria - Universidad de Antioquia"
              width={280}
              height={80}
              className="h-16 w-auto"
            />
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground">
              Museo Universitario Universidad de Antioquia
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Sistema de Gestión de Obras Dañadas
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              © {new Date().getFullYear()} Universidad de Antioquia. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
