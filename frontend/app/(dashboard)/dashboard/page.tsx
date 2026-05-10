"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Image as ImageIcon,
  AlertTriangle,
  Wrench,
  Users,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

// Mock data for demo - in production this would come from the API
const stats = [
  {
    title: "Total Obras",
    value: "1,247",
    description: "En el inventario",
    icon: ImageIcon,
    href: "/obras",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Obras Deterioradas",
    value: "43",
    description: "Requieren atención",
    icon: AlertTriangle,
    href: "/obras-deterioradas",
    color: "text-amber-600",
    bgColor: "bg-amber-100",
  },
  {
    title: "Restauraciones",
    value: "12",
    description: "En proceso",
    icon: Wrench,
    href: "/restauraciones",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Personal",
    value: "8",
    description: "Miembros activos",
    icon: Users,
    href: "/personal",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
];

const recentDeterioradas = [
  {
    id: 1,
    obra: "La Virgen del Rosario",
    estado: "tratamiento_urgente",
    fecha: "2024-01-15",
  },
  {
    id: 2,
    obra: "Paisaje Antioqueño",
    estado: "revision_y_tratamiento",
    fecha: "2024-01-14",
  },
  {
    id: 3,
    obra: "Retrato del Fundador",
    estado: "revision_pendiente",
    fecha: "2024-01-13",
  },
  {
    id: 4,
    obra: "Naturaleza Muerta",
    estado: "estado_regular",
    fecha: "2024-01-12",
  },
];

const recentRestauraciones = [
  {
    id: 1,
    obra: "El Libertador",
    tipo: "intensivo",
    estado: "en_proceso",
    responsable: "Juan García",
  },
  {
    id: 2,
    obra: "Escena Colonial",
    tipo: "mantenimiento",
    estado: "finalizado",
    responsable: "María López",
  },
  {
    id: 3,
    obra: "Mural Universitario",
    tipo: "intensivo",
    estado: "en_proceso",
    responsable: "Carlos Ruiz",
  },
];

const estadoLabels: Record<string, { label: string; variant: "default" | "warning" | "destructive" | "success" }> = {
  estado_regular: { label: "Regular", variant: "success" },
  revision_pendiente: { label: "Revisión Pendiente", variant: "default" },
  revision_y_tratamiento: { label: "Revisión y Tratamiento", variant: "warning" },
  tratamiento_urgente: { label: "Urgente", variant: "destructive" },
};

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Resumen general del estado de las obras del museo.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              <Link href={stat.href}>
                <Button variant="link" className="px-0 mt-2 h-auto text-primary">
                  Ver detalles
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Deterioradas */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  Obras Deterioradas Recientes
                </CardTitle>
                <CardDescription>Últimos reportes de deterioro</CardDescription>
              </div>
              <Link href="/obras-deterioradas">
                <Button variant="outline" size="sm">
                  Ver todas
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDeterioradas.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div>
                    <p className="font-medium text-sm">{item.obra}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3" />
                      {new Date(item.fecha).toLocaleDateString("es-CO")}
                    </p>
                  </div>
                  <Badge
                    variant={
                      item.estado === "tratamiento_urgente"
                        ? "destructive"
                        : item.estado === "revision_y_tratamiento"
                        ? "warning"
                        : item.estado === "estado_regular"
                        ? "success"
                        : "secondary"
                    }
                  >
                    {estadoLabels[item.estado]?.label || item.estado}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Restauraciones */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-blue-600" />
                  Restauraciones en Curso
                </CardTitle>
                <CardDescription>Estado de las restauraciones activas</CardDescription>
              </div>
              <Link href="/restauraciones">
                <Button variant="outline" size="sm">
                  Ver todas
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRestauraciones.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div>
                    <p className="font-medium text-sm">{item.obra}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.responsable} - {item.tipo === "intensivo" ? "Intensivo" : "Mantenimiento"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.estado === "en_proceso" ? (
                      <Badge variant="info" className="flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        En Proceso
                      </Badge>
                    ) : (
                      <Badge variant="success" className="flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Finalizado
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
