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
  Wrench,
  Calendar,
  User,
  FileText,
  Edit,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { formatDateShort } from "@/lib/utils";

// Mock data
const mockRestauraciones = [
  {
    id: 1,
    fechaRestauracion: "2024-01-20",
    estado: "en_proceso",
    tipoRestauracion: "intensivo",
    responsable: "Dr. Fernando Restrepo",
    personalMuseo: { id: 1, nombre: "Carlos", apellido: "Martínez" },
    obraDeteriorada: {
      id: 1,
      obra: { id: 1, titulo: "La Virgen del Rosario", autor: "Gregorio Vásquez" },
      estado: "tratamiento_urgente",
    },
    observaciones: "Se inició el proceso de consolidación de la capa pictórica. Se aplicó adhesivo reversible en las zonas con desprendimiento.",
  },
  {
    id: 2,
    fechaRestauracion: "2024-01-18",
    estado: "finalizado",
    tipoRestauracion: "mantenimiento",
    responsable: "Dra. Laura Piedrahita",
    personalMuseo: { id: 2, nombre: "María", apellido: "López" },
    obraDeteriorada: {
      id: 2,
      obra: { id: 2, titulo: "Paisaje Antioqueño", autor: "Francisco Antonio Cano" },
      estado: "revision_y_tratamiento",
    },
    observaciones: "Limpieza superficial completada. Se aplicó tratamiento fungicida en zonas afectadas por humedad. La obra está lista para exhibición.",
  },
  {
    id: 3,
    fechaRestauracion: "2024-01-15",
    estado: "en_proceso",
    tipoRestauracion: "intensivo",
    responsable: "Dr. Fernando Restrepo",
    personalMuseo: { id: 1, nombre: "Carlos", apellido: "Martínez" },
    obraDeteriorada: {
      id: 5,
      obra: { id: 5, titulo: "Retrato del Fundador", autor: "Desconocido" },
      estado: "tratamiento_urgente",
    },
    observaciones: "Tratamiento contra xilófagos en progreso. Se ha fumigado el marco y se está monitoreando la efectividad del tratamiento.",
  },
  {
    id: 4,
    fechaRestauracion: "2024-01-10",
    estado: "finalizado",
    tipoRestauracion: "mantenimiento",
    responsable: "Dra. Laura Piedrahita",
    personalMuseo: { id: 3, nombre: "Ana", apellido: "García" },
    obraDeteriorada: {
      id: 3,
      obra: { id: 3, titulo: "Busto del Libertador", autor: "Marco Tobón Mejía" },
      estado: "revision_pendiente",
    },
    observaciones: "Limpieza de oxidación completada. Se aplicó capa protectora de cera microcristalina.",
  },
];

const estadoConfig = {
  en_proceso: { label: "En Proceso", variant: "info" as const, icon: Clock },
  finalizado: { label: "Finalizado", variant: "success" as const, icon: CheckCircle2 },
};

const tipoConfig = {
  mantenimiento: { label: "Mantenimiento", description: "Limpieza, protección y cuidado preventivo" },
  intensivo: { label: "Intensivo", description: "Intervención mayor para reparar daños significativos" },
};

export default function RestauracionesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<string>("todas");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filteredRestauraciones = mockRestauraciones.filter((item) => {
    const matchesSearch =
      item.obraDeteriorada.obra.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.responsable.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.observaciones.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "todas" || item.estado === activeTab;
    return matchesSearch && matchesTab;
  });

  const countByEstado = (estado: string) =>
    mockRestauraciones.filter((r) => r.estado === estado).length;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Wrench className="h-8 w-8 text-blue-600" />
            Restauraciones
          </h1>
          <p className="mt-2 text-muted-foreground">
            Seguimiento de procesos de restauración y conservación.
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nueva Restauración
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Registrar Nueva Restauración</DialogTitle>
              <DialogDescription>
                Registre los detalles del proceso de restauración.
              </DialogDescription>
            </DialogHeader>
            <form className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="obraDeteriorada">Obra Deteriorada</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar obra" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">La Virgen del Rosario - Tratamiento Urgente</SelectItem>
                    <SelectItem value="2">Paisaje Antioqueño - Revisión y Tratamiento</SelectItem>
                    <SelectItem value="3">Busto del Libertador - Revisión Pendiente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipoRestauracion">Tipo de Restauración</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(tipoConfig).map(([key, config]) => (
                        <SelectItem key={key} value={key}>
                          {config.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
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
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fechaRestauracion">Fecha de Restauración</Label>
                  <Input id="fechaRestauracion" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responsable">Responsable</Label>
                  <Input id="responsable" placeholder="Nombre del restaurador" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="personal">Personal del Museo (opcional)</Label>
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
              <div className="space-y-2">
                <Label htmlFor="observaciones">Observaciones</Label>
                <textarea
                  id="observaciones"
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Describa el proceso de restauración, técnicas utilizadas, materiales, etc."
                />
              </div>
            </form>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsCreateOpen(false)}>Guardar Restauración</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por obra, responsable o descripción..."
          className="pl-10 max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="todas" className="gap-2">
            Todas
            <Badge variant="secondary">{mockRestauraciones.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="en_proceso" className="gap-2">
            <Clock className="h-4 w-4" />
            En Proceso
            <Badge variant="info">{countByEstado("en_proceso")}</Badge>
          </TabsTrigger>
          <TabsTrigger value="finalizado" className="gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Finalizadas
            <Badge variant="success">{countByEstado("finalizado")}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid gap-4">
            {filteredRestauraciones.map((item) => {
              const EstadoIcon = estadoConfig[item.estado as keyof typeof estadoConfig].icon;
              return (
                <Card key={item.id} className="group">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-lg">
                            {item.obraDeteriorada.obra.titulo}
                          </CardTitle>
                          <Badge variant={estadoConfig[item.estado as keyof typeof estadoConfig].variant}>
                            <EstadoIcon className="h-3 w-3 mr-1" />
                            {estadoConfig[item.estado as keyof typeof estadoConfig].label}
                          </Badge>
                          <Badge variant="outline">
                            {tipoConfig[item.tipoRestauracion as keyof typeof tipoConfig].label}
                          </Badge>
                        </div>
                        <CardDescription>
                          {item.obraDeteriorada.obra.autor}
                        </CardDescription>
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
                      <p className="text-sm text-foreground">{item.observaciones}</p>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Fecha: {formatDateShort(item.fechaRestauracion)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wrench className="h-4 w-4" />
                        <span>Responsable: {item.responsable}</span>
                      </div>
                      {item.personalMuseo && (
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>
                            Supervisor: {item.personalMuseo.nombre} {item.personalMuseo.apellido}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredRestauraciones.length === 0 && (
            <div className="text-center py-12">
              <Wrench className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground">No se encontraron restauraciones</h3>
              <p className="text-muted-foreground mt-1">
                No hay restauraciones que coincidan con los filtros seleccionados.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
