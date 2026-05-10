"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Image as ImageIcon,
  AlertTriangle,
  Wrench,
  Users,
  CheckCircle,
  Clock,
} from "lucide-react";
import { StatsChart } from "@/components/dashboard/stats-chart";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { RestauracionesChart } from "@/components/dashboard/restauraciones-chart";

// Mock data for demonstration
const stats = {
  totalObras: 156,
  obrasDeterioradas: 23,
  restauracionesEnProceso: 8,
  restauracionesCompletadas: 45,
  personalActivo: 12,
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Resumen general del estado del museo y sus obras
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Obras</CardTitle>
            <ImageIcon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalObras}</div>
            <p className="text-xs text-muted-foreground">
              En la colección del museo
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Obras Deterioradas
            </CardTitle>
            <AlertTriangle className="size-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {stats.obrasDeterioradas}
            </div>
            <p className="text-xs text-muted-foreground">
              Requieren atención
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Restauraciones Activas
            </CardTitle>
            <Clock className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">
                {stats.restauracionesEnProceso}
              </span>
              <Badge variant="secondary">En proceso</Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Trabajos en curso
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Restauraciones Completadas
            </CardTitle>
            <CheckCircle className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {stats.restauracionesCompletadas}
            </div>
            <p className="text-xs text-muted-foreground">
              Este año
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Estado de Obras</CardTitle>
            <CardDescription>
              Distribución del estado de conservación de las obras
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <StatsChart />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Restauraciones por Tipo</CardTitle>
            <CardDescription>
              Tipos de restauraciones realizadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RestauracionesChart />
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>
              Últimos movimientos y acciones en el sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Personal Activo</CardTitle>
            <CardDescription>
              Equipo de trabajo del museo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary">
                <Users className="size-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.personalActivo}</p>
                <p className="text-sm text-muted-foreground">
                  Miembros del equipo
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-muted p-3">
                <p className="text-sm font-medium">Restauradores</p>
                <p className="text-xl font-bold">5</p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <p className="text-sm font-medium">Curadores</p>
                <p className="text-xl font-bold">3</p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <p className="text-sm font-medium">Conservadores</p>
                <p className="text-xl font-bold">2</p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <p className="text-sm font-medium">Administrativos</p>
                <p className="text-xl font-bold">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
