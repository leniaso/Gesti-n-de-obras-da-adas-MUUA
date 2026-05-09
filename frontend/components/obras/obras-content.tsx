"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Modal } from "@/components/ui/modal";
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
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  Filter,
  Palette,
} from "lucide-react";
import type { Obra } from "@/lib/types";

// Mock data - will be replaced with API calls
const mockObras: Obra[] = [
  {
    idObra: 1,
    titulo: "La Noche Estrellada",
    autor: "Vincent van Gogh",
    fechaCreacion: "1889-06-01",
    tipo: "Pintura",
    tecnica: "Oleo sobre lienzo",
    ubicacion: "Sala A - Impresionismo",
  },
  {
    idObra: 2,
    titulo: "Las Meninas",
    autor: "Diego Velazquez",
    fechaCreacion: "1656-01-01",
    tipo: "Pintura",
    tecnica: "Oleo sobre lienzo",
    ubicacion: "Sala B - Barroco",
  },
  {
    idObra: 3,
    titulo: "El Pensador",
    autor: "Auguste Rodin",
    fechaCreacion: "1904-01-01",
    tipo: "Escultura",
    tecnica: "Bronce",
    ubicacion: "Jardin Principal",
  },
  {
    idObra: 4,
    titulo: "Guernica",
    autor: "Pablo Picasso",
    fechaCreacion: "1937-06-01",
    tipo: "Pintura",
    tecnica: "Oleo sobre lienzo",
    ubicacion: "Sala C - Arte Moderno",
  },
  {
    idObra: 5,
    titulo: "La Persistencia de la Memoria",
    autor: "Salvador Dali",
    fechaCreacion: "1931-01-01",
    tipo: "Pintura",
    tecnica: "Oleo sobre lienzo",
    ubicacion: "Sala C - Arte Moderno",
  },
];

const tiposObra = [
  { value: "Pintura", label: "Pintura" },
  { value: "Escultura", label: "Escultura" },
  { value: "Fotografia", label: "Fotografia" },
  { value: "Instalacion", label: "Instalacion" },
  { value: "Grabado", label: "Grabado" },
];

export function ObrasContent() {
  const [obras, setObras] = useState<Obra[]>(mockObras);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTipo, setFilterTipo] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedObra, setSelectedObra] = useState<Obra | null>(null);
  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    fechaCreacion: "",
    tipo: "",
    tecnica: "",
    ubicacion: "",
  });

  const filteredObras = obras.filter((obra) => {
    const matchesSearch =
      obra.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      obra.autor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTipo = !filterTipo || obra.tipo === filterTipo;
    return matchesSearch && matchesTipo;
  });

  const handleCreate = () => {
    const newObra: Obra = {
      idObra: Math.max(...obras.map((o) => o.idObra)) + 1,
      ...formData,
    };
    setObras([...obras, newObra]);
    setIsCreateModalOpen(false);
    resetForm();
  };

  const handleEdit = () => {
    if (!selectedObra) return;
    setObras(
      obras.map((o) =>
        o.idObra === selectedObra.idObra ? { ...o, ...formData } : o
      )
    );
    setIsEditModalOpen(false);
    resetForm();
  };

  const handleDelete = (id: number) => {
    if (confirm("Esta seguro de eliminar esta obra?")) {
      setObras(obras.filter((o) => o.idObra !== id));
    }
  };

  const openEditModal = (obra: Obra) => {
    setSelectedObra(obra);
    setFormData({
      titulo: obra.titulo,
      autor: obra.autor,
      fechaCreacion: obra.fechaCreacion,
      tipo: obra.tipo,
      tecnica: obra.tecnica,
      ubicacion: obra.ubicacion,
    });
    setIsEditModalOpen(true);
  };

  const openViewModal = (obra: Obra) => {
    setSelectedObra(obra);
    setIsViewModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      titulo: "",
      autor: "",
      fechaCreacion: "",
      tipo: "",
      tecnica: "",
      ubicacion: "",
    });
    setSelectedObra(null);
  };

  return (
    <div className="space-y-6">
      {/* Actions Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
            <input
              type="text"
              placeholder="Buscar por titulo o autor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10 w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--input))] pl-10 pr-4 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            <select
              value={filterTipo}
              onChange={(e) => setFilterTipo(e.target.value)}
              className="h-10 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--input))] px-3 text-sm text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
            >
              <option value="">Todos los tipos</option>
              {tiposObra.map((tipo) => (
                <option key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Obra
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-[hsl(var(--primary))]" />
            Obras del Museo ({filteredObras.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titulo</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Tecnica</TableHead>
                <TableHead>Ubicacion</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredObras.map((obra) => (
                <TableRow key={obra.idObra}>
                  <TableCell className="font-medium">{obra.titulo}</TableCell>
                  <TableCell>{obra.autor}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{obra.tipo}</Badge>
                  </TableCell>
                  <TableCell>{obra.tecnica}</TableCell>
                  <TableCell>{obra.ubicacion}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openViewModal(obra)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditModal(obra)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(obra.idObra)}
                      >
                        <Trash2 className="h-4 w-4 text-[hsl(var(--destructive))]" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          resetForm();
        }}
        title="Nueva Obra"
        className="max-w-2xl"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreate();
          }}
          className="space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Titulo"
              value={formData.titulo}
              onChange={(e) =>
                setFormData({ ...formData, titulo: e.target.value })
              }
              required
            />
            <Input
              label="Autor"
              value={formData.autor}
              onChange={(e) =>
                setFormData({ ...formData, autor: e.target.value })
              }
              required
            />
            <Input
              label="Fecha de Creacion"
              type="date"
              value={formData.fechaCreacion}
              onChange={(e) =>
                setFormData({ ...formData, fechaCreacion: e.target.value })
              }
              required
            />
            <Select
              label="Tipo"
              value={formData.tipo}
              onChange={(e) =>
                setFormData({ ...formData, tipo: e.target.value })
              }
              options={tiposObra}
              required
            />
            <Input
              label="Tecnica"
              value={formData.tecnica}
              onChange={(e) =>
                setFormData({ ...formData, tecnica: e.target.value })
              }
              required
            />
            <Input
              label="Ubicacion"
              value={formData.ubicacion}
              onChange={(e) =>
                setFormData({ ...formData, ubicacion: e.target.value })
              }
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsCreateModalOpen(false);
                resetForm();
              }}
            >
              Cancelar
            </Button>
            <Button type="submit">Guardar Obra</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          resetForm();
        }}
        title="Editar Obra"
        className="max-w-2xl"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEdit();
          }}
          className="space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Titulo"
              value={formData.titulo}
              onChange={(e) =>
                setFormData({ ...formData, titulo: e.target.value })
              }
              required
            />
            <Input
              label="Autor"
              value={formData.autor}
              onChange={(e) =>
                setFormData({ ...formData, autor: e.target.value })
              }
              required
            />
            <Input
              label="Fecha de Creacion"
              type="date"
              value={formData.fechaCreacion}
              onChange={(e) =>
                setFormData({ ...formData, fechaCreacion: e.target.value })
              }
              required
            />
            <Select
              label="Tipo"
              value={formData.tipo}
              onChange={(e) =>
                setFormData({ ...formData, tipo: e.target.value })
              }
              options={tiposObra}
              required
            />
            <Input
              label="Tecnica"
              value={formData.tecnica}
              onChange={(e) =>
                setFormData({ ...formData, tecnica: e.target.value })
              }
              required
            />
            <Input
              label="Ubicacion"
              value={formData.ubicacion}
              onChange={(e) =>
                setFormData({ ...formData, ubicacion: e.target.value })
              }
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsEditModalOpen(false);
                resetForm();
              }}
            >
              Cancelar
            </Button>
            <Button type="submit">Actualizar Obra</Button>
          </div>
        </form>
      </Modal>

      {/* View Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Detalle de Obra"
      >
        {selectedObra && (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  Titulo
                </p>
                <p className="font-medium">{selectedObra.titulo}</p>
              </div>
              <div>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  Autor
                </p>
                <p className="font-medium">{selectedObra.autor}</p>
              </div>
              <div>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  Fecha de Creacion
                </p>
                <p className="font-medium">{selectedObra.fechaCreacion}</p>
              </div>
              <div>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  Tipo
                </p>
                <Badge variant="secondary">{selectedObra.tipo}</Badge>
              </div>
              <div>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  Tecnica
                </p>
                <p className="font-medium">{selectedObra.tecnica}</p>
              </div>
              <div>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  Ubicacion
                </p>
                <p className="font-medium">{selectedObra.ubicacion}</p>
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <Button
                variant="outline"
                onClick={() => setIsViewModalOpen(false)}
              >
                Cerrar
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
