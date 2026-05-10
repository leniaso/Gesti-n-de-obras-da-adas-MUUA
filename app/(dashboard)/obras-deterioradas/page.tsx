"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Search,
  AlertTriangle,
  Calendar,
  User,
  FileText,
  Edit,
} from "lucide-react";
import { formatDateShort } from "@/lib/utils";
import type { EstadoObra } from "@/lib/api";

// Mock data
const mockObrasDeterioradas = [
  {
    id: 1,
    obra: { id: 1, titulo: "La Virgen del Rosario", autor: "Gregorio Vásquez" },
    personal: { id: 1, nombre: "Carlos", apellido: "Martínez" },
    descripcion: "Presenta grietas en la capa pictórica y desprendimiento de pigmentos en la esquina inferior derecha.",
    estado: "tratamiento_urgente" as EstadoObra,
    fechaIdentificacion: "2024-01-15",
  },
  {
    id: 2,
    obra: { id: 2, titulo: "Paisaje Antioqueño", autor: "Francisco Antonio Cano" },
    personal: { id: 2, nombre: "María", apellido: "López" },
    descripcion: "Manchas de humedad visibles en el tercio superior del lienzo. Requiere tratamiento preventivo.",
    estado: "revision_y_tratamiento" as EstadoObra,
    fechaIdentificacion: "2024-01-14",
  },
  {
    id: 3,
    obra: { id: 3, titulo: "Busto del Libertador", autor: "Marco Tobón Mejía" },
    personal: { id: 1, nombre: "Carlos", apellido: "Martínez" },
    descripcion: "Oxidación superficial en zonas expuestas. Se recomienda limpieza y aplicación de protector.",
    estado: "revision_pendiente" as EstadoObra,
    fechaIdentificacion: "2024-01-13",
  },
  {
    id: 4,
    obra: { id: 4, titulo: "Naturaleza Muerta", autor: "Débora Arango" },
    personal: { id: 3, nombre: "Ana", apellido: "García" },
    descripcion: "Pequeñas fisuras en el barniz. Estado general aceptable pero requiere monitoreo.",
    estado: "estado_regular" as EstadoObra,
    fechaIdentificacion: "2024-01-12",
  },
  {
    id: 5,
    obra: { id: 5, titulo: "Retrato del Fundador", autor: "Desconocido" },
    personal: { id: 2, nombre: "María", apellido: "López" },
    descripcion: "Daño por insectos xilófagos en el marco original. La obra en sí está en buen estado.",
    estado: "tratamiento_urgente" as EstadoObra,
    fechaIdentificacion: "2024-01-10",
  },
];

const estadoConfig: Record<EstadoObra, { label: string; variant: "default" | "warning" | "destructive" | "success"; description: string }> = {
  estado_regular: { 
    label: "Estado Regular", 
    variant: "success",
    description: "La obra presenta deterioro menor y puede continuar en exhibición."
  },
  revision_pendiente: { 
    label: "Revisión Pendiente", 
    variant: "default",
    description: "Requiere evaluación por parte del equipo de conservación."
  },
  revision_y_tratamiento: { 
    label: "Revisión y Tratamiento", 
    variant: "warning",
    description: "Necesita intervención para prevenir mayor deterioro."
  },
  tratamiento_urgente: { 
    label: "Tratamiento Urgente", 
    variant: "destructive",
    description: "Requiere intervención inmediata para evitar daños irreversibles."
  },
};

export default function ObrasDeterioradasPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<string>("todas");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filteredObras = mockObrasDeterioradas.filter((item) => {
    const matchesSearch =
      item.obra.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "todas" || item.estado === activeTab;
    return matchesSearch && matchesTab;
  });

  const countByEstado = (estado: string) => 
    mockObrasDeterioradas.filter(o => o.estado === estado).length;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-amber-600" />
            Obras Deterioradas
          </h1>
          <p className="mt-2 text-muted-foreground">
            Registro y seguimiento de obras que requieren atención.
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Reportar Deterioro
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Reportar Obra Deteriorada</DialogTitle>
              <DialogDescription>
                Registre los detalles del deterioro identificado en la obra.
              </DialogDescription>
            </DialogHeader>
            <form className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="obra">Obra</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar obra" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">La Virgen del Rosario</SelectItem>
                    <SelectItem value="2">Paisaje Antioqueño</SelectItem>
                    <SelectItem value="3">Busto del Libertador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="estado">Estado</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(estadoConfig).map(([key, config]) => (
                        <SelectItem key={key} value={key}>
                          {config.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fecha">Fecha de Identificación</Label>
                  <Input id="fecha" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción del Deterioro</Label>
                <textarea
                  id="descripcion"
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Describa detalladamente el tipo y extensión del deterioro..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="personal">Reportado por (opcional)</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar personal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Carlos Martínez</SelectItem>
                    <SelectItem value="2">María López</SelectItem>
                    <SelectItem value="3">Ana García</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </form>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsCreateOpen(false)}>Guardar Reporte</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por título o descripción..."
          className="pl-10 max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
          <TabsTrigger value="todas" className="gap-2">
            Todas
            <Badge variant="secondary" className="ml-1">{mockObrasDeterioradas.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="tratamiento_urgente" className="gap-2">
            <span className="hidden sm:inline">Urgente</span>
            <Badge variant="destructive">{countByEstado("tratamiento_urgente")}</Badge>
          </TabsTrigger>
          <TabsTrigger value="revision_y_tratamiento" className="gap-2">
            <span className="hidden sm:inline">Tratamiento</span>
            <Badge variant="warning">{countByEstado("revision_y_tratamiento")}</Badge>
          </TabsTrigger>
          <TabsTrigger value="revision_pendiente" className="gap-2">
            <span className="hidden sm:inline">Pendiente</span>
            <Badge variant="secondary">{countByEstado("revision_pendiente")}</Badge>
          </TabsTrigger>
          <TabsTrigger value="estado_regular" className="gap-2">
            <span className="hidden sm:inline">Regular</span>
            <Badge variant="success">{countByEstado("estado_regular")}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid gap-4">
            {filteredObras.map((item) => (
              <Card key={item.id} className="group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-lg">{item.obra.titulo}</CardTitle>
                        <Badge variant={estadoConfig[item.estado].variant}>
                          {estadoConfig[item.estado].label}
                        </Badge>
                      </div>
                      <CardDescription>{item.obra.autor}</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <p className="text-sm text-foreground">{item.descripcion}</p>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Identificado: {formatDateShort(item.fechaIdentificacion)}</span>
                    </div>
                    {item.personal && (
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>Reportado por: {item.personal.nombre} {item.personal.apellido}</span>
                      </div>
                    )}
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">
                      {estadoConfig[item.estado].description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredObras.length === 0 && (
            <div className="text-center py-12">
              <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground">No se encontraron registros</h3>
              <p className="text-muted-foreground mt-1">
                No hay obras deterioradas que coincidan con los filtros seleccionados.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
