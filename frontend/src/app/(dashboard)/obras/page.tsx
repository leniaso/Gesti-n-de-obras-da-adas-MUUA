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
import { Plus, Search, Eye, Edit, Trash2 } from "lucide-react";
import { ObraForm } from "@/components/obras/obra-form";
import { ObraDetails } from "@/components/obras/obra-details";
import { EstadoObra, type Obra } from "@/types";

// Mock data
const mockObras: Obra[] = [
  {
    idObra: 1,
    titulo: "Retrato Colonial",
    autor: "Anónimo",
    anioCreacion: 1750,
    tecnica: "Óleo sobre lienzo",
    dimensiones: "80x60 cm",
    ubicacion: "Sala A",
    estado: EstadoObra.BUENO,
    descripcion: "Retrato de la época colonial",
    fechaAdquisicion: "2010-03-15",
    valorEstimado: 15000000,
  },
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
    idObra: 3,
    titulo: "Cerámica Muisca",
    autor: "Cultura Muisca",
    anioCreacion: 1200,
    tecnica: "Cerámica",
    dimensiones: "25x15 cm",
    ubicacion: "Sala Arqueología",
    estado: EstadoObra.REGULAR,
    descripcion: "Pieza arqueológica precolombina",
    fechaAdquisicion: "1998-11-10",
    valorEstimado: 8000000,
  },
  {
    idObra: 4,
    titulo: "Escultura Moderna",
    autor: "Fernando Botero",
    anioCreacion: 1985,
    tecnica: "Bronce",
    dimensiones: "150x80x60 cm",
    ubicacion: "Jardín Central",
    estado: EstadoObra.BUENO,
    descripcion: "Escultura de figura femenina",
    fechaAdquisicion: "2015-02-28",
    valorEstimado: 250000000,
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

const getEstadoBadge = (estado: EstadoObra) => {
  const variants: Record<EstadoObra, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
    [EstadoObra.BUENO]: { variant: "default", label: "Bueno" },
    [EstadoObra.REGULAR]: { variant: "secondary", label: "Regular" },
    [EstadoObra.MALO]: { variant: "destructive", label: "Malo" },
    [EstadoObra.EN_RESTAURACION]: { variant: "outline", label: "En Restauración" },
  };
  return variants[estado];
};

export default function ObrasPage() {
  const [obras] = useState<Obra[]>(mockObras);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedObra, setSelectedObra] = useState<Obra | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const filteredObras = obras.filter(
    (obra) =>
      obra.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      obra.autor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-3xl font-bold text-foreground">Obras</h1>
        <p className="text-muted-foreground">
          Gestión de la colección de obras del museo
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Listado de Obras</CardTitle>
              <CardDescription>
                {filteredObras.length} obras en la colección
              </CardDescription>
            </div>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus data-icon="inline-start" />
                  Nueva Obra
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Agregar Nueva Obra</DialogTitle>
                  <DialogDescription>
                    Complete los datos de la nueva obra para agregarla a la colección
                  </DialogDescription>
                </DialogHeader>
                <ObraForm onSuccess={() => setIsCreateOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por título o autor..."
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
                  <TableHead>Título</TableHead>
                  <TableHead>Autor</TableHead>
                  <TableHead>Año</TableHead>
                  <TableHead>Ubicación</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Valor Estimado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredObras.map((obra) => {
                  const badgeInfo = getEstadoBadge(obra.estado);
                  return (
                    <TableRow key={obra.idObra}>
                      <TableCell className="font-medium">{obra.titulo}</TableCell>
                      <TableCell>{obra.autor}</TableCell>
                      <TableCell>{obra.anioCreacion}</TableCell>
                      <TableCell>{obra.ubicacion}</TableCell>
                      <TableCell>
                        <Badge variant={badgeInfo.variant}>{badgeInfo.label}</Badge>
                      </TableCell>
                      <TableCell>{formatCurrency(obra.valorEstimado)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedObra(obra);
                              setIsDetailsOpen(true);
                            }}
                          >
                            <Eye className="size-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="size-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="size-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalles de la Obra</DialogTitle>
            <DialogDescription>
              Información completa de la obra seleccionada
            </DialogDescription>
          </DialogHeader>
          {selectedObra && <ObraDetails obra={selectedObra} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
