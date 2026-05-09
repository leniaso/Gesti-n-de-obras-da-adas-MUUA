"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Palette,
  AlertTriangle,
  Wrench,
  CheckCircle,
  Clock,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const stats = [
  {
    title: "Total de Obras",
    value: "247",
    change: "+12 este mes",
    icon: Palette,
    color: "text-[hsl(var(--primary))]",
    bgColor: "bg-[hsl(var(--primary))]/10",
  },
  {
    title: "Obras Deterioradas",
    value: "18",
    change: "3 criticas",
    icon: AlertTriangle,
    color: "text-[hsl(var(--warning))]",
    bgColor: "bg-[hsl(var(--warning))]/10",
  },
  {
    title: "En Restauracion",
    value: "7",
    change: "2 por finalizar",
    icon: Wrench,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  {
    title: "Restauradas",
    value: "156",
    change: "+8 este mes",
    icon: CheckCircle,
    color: "text-[hsl(var(--success))]",
    bgColor: "bg-[hsl(var(--success))]/10",
  },
];

const recentDeteriorations = [
  {
    id: 1,
    obra: "La Noche Estrellada",
    autor: "Vincent van Gogh",
    estado: "CRITICO",
    fecha: "2024-01-15",
    descripcion: "Fisuras en la capa de pintura",
  },
  {
    id: 2,
    obra: "Retrato de Dora Maar",
    autor: "Pablo Picasso",
    estado: "MODERADO",
    fecha: "2024-01-14",
    descripcion: "Decoloracion por exposicion a la luz",
  },
  {
    id: 3,
    obra: "El Grito",
    autor: "Edvard Munch",
    estado: "LEVE",
    fecha: "2024-01-12",
    descripcion: "Pequenas manchas de humedad",
  },
  {
    id: 4,
    obra: "Guernica",
    autor: "Pablo Picasso",
    estado: "GRAVE",
    fecha: "2024-01-10",
    descripcion: "Danos estructurales en el lienzo",
  },
];

const activeRestorations = [
  {
    id: 1,
    obra: "Las Meninas",
    responsable: "Dr. Maria Garcia",
    progreso: 75,
    fechaInicio: "2024-01-01",
    estado: "EN_PROCESO",
  },
  {
    id: 2,
    obra: "La Persistencia de la Memoria",
    responsable: "Carlos Rodriguez",
    progreso: 45,
    fechaInicio: "2024-01-08",
    estado: "EN_PROCESO",
  },
  {
    id: 3,
    obra: "El Beso",
    responsable: "Ana Martinez",
    progreso: 90,
    fechaInicio: "2023-12-15",
    estado: "EN_PROCESO",
  },
];

function getEstadoBadge(estado: string) {
  switch (estado) {
    case "CRITICO":
      return <Badge variant="destructive">Critico</Badge>;
    case "GRAVE":
      return <Badge variant="destructive">Grave</Badge>;
    case "MODERADO":
      return <Badge variant="warning">Moderado</Badge>;
    case "LEVE":
      return <Badge variant="success">Leve</Badge>;
    default:
      return <Badge variant="secondary">{estado}</Badge>;
  }
}

export function DashboardContent() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    {stat.title}
                  </p>
                  <p className="mt-1 text-3xl font-bold text-[hsl(var(--foreground))]">
                    {stat.value}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))]">
                    <TrendingUp className="h-3 w-3" />
                    {stat.change}
                  </p>
                </div>
                <div className={`rounded-xl p-3 ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Deteriorations */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-[hsl(var(--warning))]" />
              Reportes Recientes de Deterioro
            </CardTitle>
            <Link
              href="/deterioros"
              className="flex items-center gap-1 text-sm text-[hsl(var(--primary))] hover:underline"
            >
              Ver todos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDeteriorations.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border border-[hsl(var(--border))] p-4"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-[hsl(var(--foreground))]">
                      {item.obra}
                    </p>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                      {item.autor}
                    </p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                      {item.descripcion}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {getEstadoBadge(item.estado)}
                    <span className="flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))]">
                      <Clock className="h-3 w-3" />
                      {item.fecha}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Restorations */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-blue-400" />
              Restauraciones en Curso
            </CardTitle>
            <Link
              href="/restauraciones"
              className="flex items-center gap-1 text-sm text-[hsl(var(--primary))] hover:underline"
            >
              Ver todas
              <ArrowRight className="h-4 w-4" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeRestorations.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-[hsl(var(--border))] p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[hsl(var(--foreground))]">
                        {item.obra}
                      </p>
                      <p className="text-sm text-[hsl(var(--muted-foreground))]">
                        Responsable: {item.responsable}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-[hsl(var(--primary))]">
                      {item.progreso}%
                    </span>
                  </div>
                  <div className="mt-3">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-[hsl(var(--secondary))]">
                      <div
                        className="h-full rounded-full bg-[hsl(var(--primary))] transition-all"
                        style={{ width: `${item.progreso}%` }}
                      />
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-[hsl(var(--muted-foreground))]">
                    Iniciado: {item.fechaInicio}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
