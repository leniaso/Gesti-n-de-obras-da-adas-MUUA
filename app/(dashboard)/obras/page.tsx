"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  Image as ImageIcon,
  Calendar,
  MapPin,
  ExternalLink,
  Edit,
  Filter,
} from "lucide-react";
import { formatDateShort } from "@/lib/utils";

// Mock data
const mockObras = [
  {
    id: 1,
    titulo: "La Virgen del Rosario",
    autor: "Gregorio Vásquez de Arce y Ceballos",
    fechaCreacion: "1680-01-01",
    tipo: { id: 1, nombre: "Pintura" },
    fechaUltimaRevision: "2024-01-10",
    ubicacion: "Sala Principal",
    linkDrive: "https://drive.google.com/...",
    tecnica: { id: 1, nombre: "Óleo sobre lienzo" },
  },
  {
    id: 2,
    titulo: "Paisaje Antioqueño",
    autor: "Francisco Antonio Cano",
    fechaCreacion: "1910-06-15",
    tipo: { id: 1, nombre: "Pintura" },
    fechaUltimaRevision: "2024-01-08",
    ubicacion: "Galería Norte",
    linkDrive: "https://drive.google.com/...",
    tecnica: { id: 2, nombre: "Acuarela" },
  },
  {
    id: 3,
    titulo: "Busto del Libertador",
    autor: "Marco Tobón Mejía",
    fechaCreacion: "1925-07-20",
    tipo: { id: 2, nombre: "Escultura" },
    fechaUltimaRevision: "2024-01-05",
    ubicacion: "Entrada Principal",
    linkDrive: "https://drive.google.com/...",
    tecnica: { id: 3, nombre: "Bronce fundido" },
  },
  {
    id: 4,
    titulo: "Mural de la Independencia",
    autor: "Pedro Nel Gómez",
    fechaCreacion: "1936-08-07",
    tipo: { id: 3, nombre: "Mural" },
    fechaUltimaRevision: "2023-12-20",
    ubicacion: "Auditorio Central",
    linkDrive: "",
    tecnica: { id: 4, nombre: "Fresco" },
  },
  {
    id: 5,
    titulo: "Naturaleza Muerta",
    autor: "Débora Arango",
    fechaCreacion: "1940-03-12",
    tipo: { id: 1, nombre: "Pintura" },
    fechaUltimaRevision: "2024-01-12",
    ubicacion: "Sala de Arte Moderno",
    linkDrive: "https://drive.google.com/...",
    tecnica: { id: 1, nombre: "Óleo sobre lienzo" },
  },
];

const mockTecnicas = [
  { id: 1, nombre: "Óleo sobre lienzo" },
  { id: 2, nombre: "Acuarela" },
  { id: 3, nombre: "Bronce fundido" },
  { id: 4, nombre: "Fresco" },
  { id: 5, nombre: "Técnica mixta" },
];

const mockTipos = [
  { id: 1, nombre: "Pintura" },
  { id: 2, nombre: "Escultura" },
  { id: 3, nombre: "Mural" },
  { id: 4, nombre: "Fotografía" },
];

export default function ObrasPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTipo, setSelectedTipo] = useState<string>("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filteredObras = mockObras.filter((obra) => {
    const matchesSearch =
      obra.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      obra.autor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTipo = !selectedTipo || obra.tipo.id.toString() === selectedTipo;
    return matchesSearch && matchesTipo;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Obras</h1>
          <p className="mt-2 text-muted-foreground">
            Gestiona el catálogo de obras del museo.
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nueva Obra
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Registrar Nueva Obra</DialogTitle>
              <DialogDescription>
                Complete la información de la obra para agregarla al catálogo.
              </DialogDescription>
            </DialogHeader>
            <form className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="titulo">Título</Label>
                  <Input id="titulo" placeholder="Nombre de la obra" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="autor">Autor</Label>
                  <Input id="autor" placeholder="Nombre del artista" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fechaCreacion">Fecha de Creación</Label>
                  <Input id="fechaCreacion" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fechaRevision">Última Revisión</Label>
                  <Input id="fechaRevision" type="date" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de Obra</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockTipos.map((tipo) => (
                        <SelectItem key={tipo.id} value={tipo.id.toString()}>
                          {tipo.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tecnica">Técnica</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar técnica" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockTecnicas.map((tecnica) => (
                        <SelectItem key={tecnica.id} value={tecnica.id.toString()}>
                          {tecnica.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ubicacion">Ubicación</Label>
                <Input id="ubicacion" placeholder="Sala o lugar donde se encuentra" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkDrive">Enlace a Drive (opcional)</Label>
                <Input id="linkDrive" placeholder="https://drive.google.com/..." />
              </div>
            </form>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsCreateOpen(false)}>Guardar Obra</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por título o autor..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedTipo} onValueChange={setSelectedTipo}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filtrar por tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos los tipos</SelectItem>
            {mockTipos.map((tipo) => (
              <SelectItem key={tipo.id} value={tipo.id.toString()}>
                {tipo.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-4">
        Mostrando {filteredObras.length} de {mockObras.length} obras
      </p>

      {/* Obras Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredObras.map((obra) => (
          <Card key={obra.id} className="group hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg line-clamp-1">{obra.titulo}</CardTitle>
                  <CardDescription className="line-clamp-1">{obra.autor}</CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Editar</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{obra.tipo.nombre}</Badge>
                <Badge variant="outline">{obra.tecnica.nombre}</Badge>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Creación: {obra.fechaCreacion ? formatDateShort(obra.fechaCreacion) : "Sin fecha"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{obra.ubicacion}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  <span>Revisión: {formatDateShort(obra.fechaUltimaRevision)}</span>
                </div>
              </div>
              {obra.linkDrive && (
                <a
                  href={obra.linkDrive}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  <ExternalLink className="h-3 w-3" />
                  Ver documentación
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredObras.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground">No se encontraron obras</h3>
          <p className="text-muted-foreground mt-1">
            Intenta ajustar los filtros de búsqueda.
          </p>
        </div>
      )}
    </div>
  );
}
