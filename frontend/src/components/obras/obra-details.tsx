"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { EstadoObra, type Obra } from "@/types";

interface ObraDetailsProps {
  obra: Obra;
}

const getEstadoBadge = (estado: EstadoObra) => {
  const variants: Record<EstadoObra, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
    [EstadoObra.BUENO]: { variant: "default", label: "Bueno" },
    [EstadoObra.REGULAR]: { variant: "secondary", label: "Regular" },
    [EstadoObra.MALO]: { variant: "destructive", label: "Malo" },
    [EstadoObra.EN_RESTAURACION]: { variant: "outline", label: "En Restauración" },
  };
  return variants[estado];
};

export function ObraDetails({ obra }: ObraDetailsProps) {
  const badgeInfo = getEstadoBadge(obra.estado);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-serif text-2xl font-bold">{obra.titulo}</h3>
          <p className="text-lg text-muted-foreground">{obra.autor}</p>
        </div>
        <Badge variant={badgeInfo.variant}>{badgeInfo.label}</Badge>
      </div>

      <Separator />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Año de Creación
          </p>
          <p className="text-lg">{obra.anioCreacion}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Técnica</p>
          <p className="text-lg">{obra.tecnica}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Dimensiones
          </p>
          <p className="text-lg">{obra.dimensiones}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Ubicación</p>
          <p className="text-lg">{obra.ubicacion}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Fecha de Adquisición
          </p>
          <p className="text-lg">{formatDate(obra.fechaAdquisicion)}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Valor Estimado
          </p>
          <p className="text-lg font-semibold text-primary">
            {formatCurrency(obra.valorEstimado)}
          </p>
        </div>
      </div>

      <Separator />

      <div>
        <p className="text-sm font-medium text-muted-foreground">Descripción</p>
        <p className="mt-1 text-base">{obra.descripcion}</p>
      </div>
    </div>
  );
}
