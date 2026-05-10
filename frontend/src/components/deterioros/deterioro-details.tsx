"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { type ObraDeteriorada } from "@/types";
import { AlertTriangle, User, Calendar } from "lucide-react";

interface DeterioroDetailsProps {
  deterioro: ObraDeteriorada;
}

const getGravedadColor = (nivel: number) => {
  if (nivel <= 3) return "text-green-600";
  if (nivel <= 6) return "text-yellow-600";
  return "text-red-600";
};

const getGravedadLabel = (nivel: number) => {
  if (nivel <= 3) return "Leve";
  if (nivel <= 6) return "Moderado";
  return "Grave";
};

const getProgressColor = (nivel: number) => {
  if (nivel <= 3) return "[&>div]:bg-green-500";
  if (nivel <= 6) return "[&>div]:bg-yellow-500";
  return "[&>div]:bg-red-500";
};

export function DeterioroDetails({ deterioro }: DeterioroDetailsProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Obra Info */}
      <div className="rounded-lg bg-muted p-4">
        <p className="text-sm font-medium text-muted-foreground">Obra Afectada</p>
        <h3 className="font-serif text-xl font-bold">{deterioro.obra.titulo}</h3>
        <p className="text-muted-foreground">{deterioro.obra.autor}</p>
        <p className="text-sm">
          {deterioro.obra.tecnica} | {deterioro.obra.dimensiones} | {deterioro.obra.ubicacion}
        </p>
      </div>

      <Separator />

      {/* Deterioro Info */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className={`size-5 ${getGravedadColor(deterioro.nivelGravedad)}`} />
            <span className="font-medium">{deterioro.tipoDeterioro}</span>
          </div>
          {deterioro.requiereRestauracion ? (
            <Badge variant="destructive">Restauración Requerida</Badge>
          ) : (
            <Badge variant="secondary">No requiere restauración</Badge>
          )}
        </div>

        {/* Gravedad */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Nivel de Gravedad</span>
            <span className={`font-bold ${getGravedadColor(deterioro.nivelGravedad)}`}>
              {deterioro.nivelGravedad}/10 - {getGravedadLabel(deterioro.nivelGravedad)}
            </span>
          </div>
          <Progress
            value={deterioro.nivelGravedad * 10}
            className={`h-2 ${getProgressColor(deterioro.nivelGravedad)}`}
          />
        </div>
      </div>

      <Separator />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex items-start gap-2">
          <Calendar className="mt-0.5 size-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Fecha de Detección
            </p>
            <p>{formatDate(deterioro.fechaDeteccion)}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <User className="mt-0.5 size-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Reportado por
            </p>
            <p>
              {deterioro.reportadoPor.nombre} {deterioro.reportadoPor.apellido}
            </p>
            <p className="text-sm text-muted-foreground">
              {deterioro.reportadoPor.cargo}
            </p>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <p className="text-sm font-medium text-muted-foreground">Causa del Deterioro</p>
        <p className="mt-1">{deterioro.causaDeterioro}</p>
      </div>

      <div>
        <p className="text-sm font-medium text-muted-foreground">Descripción del Daño</p>
        <p className="mt-1">{deterioro.descripcionDano}</p>
      </div>

      {deterioro.observaciones && (
        <div>
          <p className="text-sm font-medium text-muted-foreground">Observaciones</p>
          <p className="mt-1">{deterioro.observaciones}</p>
        </div>
      )}
    </div>
  );
}
