"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Search, Eye, AlertTriangle, Wrench } from "lucide-react";
import { DeterioroForm } from "@/components/deterioros/deterioro-form";
import { DeterioroDetails } from "@/components/deterioros/deterioro-details";
import { EstadoObra, type ObraDeteriorada, type Obra, type PersonalMuseo } from "@/types";

// Mock data
const mockObras: Obra[] = [
  {
    idObra: 2,
    titulo: "Paisaje Antioqueño",
    autor: "Francisco Cano",
    anioCreacion: 1920,
    tecnica: "Óleo sobre tela",
    dimensiones: "120x80 cm",
    ubicacion: "Sala B",
    estado: EstadoObra.EN_RESTAURACION,
    descripcion: "Paisaje de montañas antioqueñas",
    fechaAdquisicion: "2005-07-20",
    valorEstimado: 45000000,
  },
  {
    idObra: 5,
    titulo: "Mural Contemporáneo",
    autor: "Débora Arango",
    anioCreacion: 1960,
    tecnica: "Fresco",
    dimensiones: "300x200 cm",
    ubicacion: "Entrada Principal",
    estado: EstadoObra.MALO,
    descripcion: "Mural con escenas sociales",
    fechaAdquisicion: "2000-05-12",
    valorEstimado: 180000000,
  },
];

const mockPersonal: PersonalMuseo = {
  idPersonal: 1,
  nombre: "María",
  apellido: "García",
  cargo: "Conservadora",
  email: "maria.garcia@udea.edu.co",
  telefono: "3001234567",
  activo: true,
};

const mockDeteriorados: ObraDeteriorada[] = [
  {
    idDeterioro: 1,
    obra: mockObras[0],
    fechaDeteccion: "2024-01-15",
    tipoDeterioro: "Craqueladuras",
    descripcionDano: "Se observan múltiples craqueladuras en la superficie pictórica, especialmente en la zona central del lienzo.",
    nivelGravedad: 7,
    causaDeterioro: "Cambios de humedad y temperatura",
    reportadoPor: mockPersonal,
    observaciones: "Se recomienda intervención urgente para evitar pérdida de pigmentos.",
    requiereRestauracion: true,
  },
  {
    idDeterioro: 2,
    obra: mockObras[1],
    fechaDeteccion: "2024-02-20",
    tipoDeterioro: "Desprendimiento",
    descripcionDano: "Desprendimiento de la capa pictórica en varias zonas del mural, con pérdida parcial de la imagen.",
    nivelGravedad: 9,
    causaDeterioro: "Filtraciones de agua en el muro",
    reportadoPor: mockPersonal,
    observaciones: "Daño crítico. Requiere intervención inmediata y revisión estructural del muro.",
    requiereRestauracion: true,
  },
];

const getGravedadColor = (nivel: number) => {
  if (nivel <= 3) return "bg-green-500";
  if (nivel <= 6) return "bg-yellow-500";
  return "bg-red-500";
};

const getGravedadLabel = (nivel: number) => {
  if (nivel <= 3) return "Leve";
  if (nivel <= 6) return "Moderado";
  return "Grave";
};

export default function ObrasDeterioradasPage() {
  const [deteriorados] = useState<ObraDeteriorada[]>(mockDeteriorados);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDeterioro, setSelectedDeterioro] = useState<ObraDeteriorada | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const filteredDeteriorados = deteriorados.filter(
    (d) =>
      d.obra.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.tipoDeterioro.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Obras Deterioradas
        </h1>
        <p className="text-muted-foreground">
          Registro y seguimiento de obras con daños detectados
        </p>
      </div>

      {/* Alert Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Críticos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-5 text-red-500" />
              <span className="text-2xl font-bold">
                {deteriorados.filter((d) => d.nivelGravedad > 6).length}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Moderados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-5 text-yellow-500" />
              <span className="text-2xl font-bold">
                {deteriorados.filter((d) => d.nivelGravedad > 3 && d.nivelGravedad <= 6).length}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Leves</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-5 text-green-500" />
              <span className="text-2xl font-bold">
                {deteriorados.filter((d) => d.nivelGravedad <= 3).length}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Registro de Deterioros</CardTitle>
              <CardDescription>
                {filteredDeteriorados.length} obras con daños registrados
              </CardDescription>
            </div>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus data-icon="inline-start" />
                  Reportar Deterioro
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Reportar Nuevo Deterioro</DialogTitle>
                  <DialogDescription>
                    Registre los detalles del daño detectado en la obra
                  </DialogDescription>
                </DialogHeader>
                <DeterioroForm onSuccess={() => setIsCreateOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por obra o tipo de deterioro..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Obra</TableHead>
                  <TableHead>Tipo de Deterioro</TableHead>
                  <TableHead>Fecha Detección</TableHead>
                  <TableHead>Gravedad</TableHead>
                  <TableHead>Restauración</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDeteriorados.map((deterioro) => (
                  <TableRow key={deterioro.idDeterioro}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{deterioro.obra.titulo}</p>
                        <p className="text-sm text-muted-foreground">
                          {deterioro.obra.autor}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{deterioro.tipoDeterioro}</TableCell>
                    <TableCell>{formatDate(deterioro.fechaDeteccion)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className={`size-3 rounded-full ${getGravedadColor(
                            deterioro.nivelGravedad
                          )}`}
                        />
                        <span>
                          {deterioro.nivelGravedad}/10 -{" "}
                          {getGravedadLabel(deterioro.nivelGravedad)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {deterioro.requiereRestauracion ? (
                        <Badge variant="destructive">Requerida</Badge>
                      ) : (
                        <Badge variant="secondary">No requerida</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedDeterioro(deterioro);
                            setIsDetailsOpen(true);
                          }}
                        >
                          <Eye className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Wrench className="size-4 text-primary" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalles del Deterioro</DialogTitle>
            <DialogDescription>
              Información completa del daño reportado
            </DialogDescription>
          </DialogHeader>
          {selectedDeterioro && <DeterioroDetails deterioro={selectedDeterioro} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
