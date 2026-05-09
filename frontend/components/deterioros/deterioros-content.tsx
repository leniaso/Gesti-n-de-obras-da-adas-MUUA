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
  AlertTriangle,
  Calendar,
  Wrench,
} from "lucide-react";
import type { ObraDeteriorada, Obra } from "@/lib/types";

// Mock data
const mockObras: Obra[] = [
  { idObra: 1, titulo: "La Noche Estrellada", autor: "Vincent van Gogh", fechaCreacion: "1889-06-01", tipo: "Pintura", tecnica: "Oleo sobre lienzo", ubicacion: "Sala A" },
  { idObra: 2, titulo: "Las Meninas", autor: "Diego Velazquez", fechaCreacion: "1656-01-01", tipo: "Pintura", tecnica: "Oleo sobre lienzo", ubicacion: "Sala B" },
  { idObra: 3, titulo: "El Pensador", autor: "Auguste Rodin", fechaCreacion: "1904-01-01", tipo: "Escultura", tecnica: "Bronce", ubicacion: "Jardin" },
  { idObra: 4, titulo: "Guernica", autor: "Pablo Picasso", fechaCreacion: "1937-06-01", tipo: "Pintura", tecnica: "Oleo sobre lienzo", ubicacion: "Sala C" },
  { idObra: 5, titulo: "La Persistencia de la Memoria", autor: "Salvador Dali", fechaCreacion: "1931-01-01", tipo: "Pintura", tecnica: "Oleo sobre lienzo", ubicacion: "Sala C" },
];

const mockDeteriorados: ObraDeteriorada[] = [
  {
    idObraDeteriorada: 1,
    obra: mockObras[0],
    descripcionDano: "Fisuras visibles en la capa superior de pintura, principalmente en la zona del cielo. Se observa craqueladuras en forma de red.",
    estado: "CRITICO",
    fechaIdentificacion: "2024-01-15",
  },
  {
    idObraDeteriorada: 2,
    obra: mockObras[1],
    descripcionDano: "Decoloracion parcial en el area central debido a exposicion prolongada a la luz. Perdida de pigmentacion en tonos rojos.",
    estado: "MODERADO",
    fechaIdentificacion: "2024-01-14",
  },
  {
    idObraDeteriorada: 3,
    obra: mockObras[3],
    descripcionDano: "Danos estructurales en el bastidor del lienzo. Se detectan deformaciones en las esquinas superiores.",
    estado: "GRAVE",
    fechaIdentificacion: "2024-01-10",
  },
  {
    idObraDeteriorada: 4,
    obra: mockObras[2],
    descripcionDano: "Oxidacion superficial en la base de la escultura. Manchas verdes caracteristicas de corrosion de bronce.",
    estado: "LEVE",
    fechaIdentificacion: "2024-01-08",
  },
];

const estadosDeterioro = [
  { value: "LEVE", label: "Leve" },
  { value: "MODERADO", label: "Moderado" },
  { value: "GRAVE", label: "Grave" },
  { value: "CRITICO", label: "Critico" },
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

function getEstadoColor(estado: string) {
  switch (estado) {
    case "CRITICO":
      return "border-l-[hsl(var(--destructive))]";
    case "GRAVE":
      return "border-l-[hsl(var(--destructive))]";
    case "MODERADO":
      return "border-l-[hsl(var(--warning))]";
    case "LEVE":
      return "border-l-[hsl(var(--success))]";
    default:
      return "border-l-[hsl(var(--border))]";
  }
}

export function DeteriorosContent() {
  const [deterioros, setDeteriorados] = useState<ObraDeteriorada[]>(mockDeteriorados);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEstado, setFilterEstado] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedDeterioro, setSelectedDeterioro] = useState<ObraDeteriorada | null>(null);
  const [formData, setFormData] = useState({
    idObra: "",
    descripcionDano: "",
    estado: "",
    fechaIdentificacion: new Date().toISOString().split("T")[0],
  });

  const filteredDeteriorados = deterioros.filter((d) => {
    const matchesSearch =
      d.obra.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.obra.autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.descripcionDano.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEstado = !filterEstado || d.estado === filterEstado;
    return matchesSearch && matchesEstado;
  });

  // Stats
  const stats = {
    total: deterioros.length,
    critico: deterioros.filter((d) => d.estado === "CRITICO").length,
    grave: deterioros.filter((d) => d.estado === "GRAVE").length,
    moderado: deterioros.filter((d) => d.estado === "MODERADO").length,
    leve: deterioros.filter((d) => d.estado === "LEVE").length,
  };

  const handleCreate = () => {
    const obra = mockObras.find((o) => o.idObra === parseInt(formData.idObra));
    if (!obra) return;

    const newDeterioro: ObraDeteriorada = {
      idObraDeteriorada: Math.max(...deterioros.map((d) => d.idObraDeteriorada)) + 1,
      obra,
      descripcionDano: formData.descripcionDano,
      estado: formData.estado,
      fechaIdentificacion: formData.fechaIdentificacion,
    };
    setDeteriorados([...deterioros, newDeterioro]);
    setIsCreateModalOpen(false);
    resetForm();
  };

  const handleEdit = () => {
    if (!selectedDeterioro) return;
    setDeteriorados(
      deterioros.map((d) =>
        d.idObraDeteriorada === selectedDeterioro.idObraDeteriorada
          ? {
              ...d,
              descripcionDano: formData.descripcionDano,
              estado: formData.estado,
            }
          : d
      )
    );
    setIsEditModalOpen(false);
    resetForm();
  };

  const handleDelete = (id: number) => {
    if (confirm("Esta seguro de eliminar este reporte?")) {
      setDeteriorados(deterioros.filter((d) => d.idObraDeteriorada !== id));
    }
  };

  const openEditModal = (deterioro: ObraDeteriorada) => {
    setSelectedDeterioro(deterioro);
    setFormData({
      idObra: deterioro.obra.idObra.toString(),
      descripcionDano: deterioro.descripcionDano,
      estado: deterioro.estado,
      fechaIdentificacion: deterioro.fechaIdentificacion,
    });
    setIsEditModalOpen(true);
  };

  const openViewModal = (deterioro: ObraDeteriorada) => {
    setSelectedDeterioro(deterioro);
    setIsViewModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      idObra: "",
      descripcionDano: "",
      estado: "",
      fechaIdentificacion: new Date().toISOString().split("T")[0],
    });
    setSelectedDeterioro(null);
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-[hsl(var(--muted-foreground))]" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-[hsl(var(--destructive))]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">Criticos</p>
                <p className="text-2xl font-bold text-[hsl(var(--destructive))]">{stats.critico}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-[hsl(var(--destructive))]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">Graves</p>
                <p className="text-2xl font-bold text-[hsl(var(--destructive))]">{stats.grave}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-[hsl(var(--warning))]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">Moderados</p>
                <p className="text-2xl font-bold text-[hsl(var(--warning))]">{stats.moderado}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-[hsl(var(--success))]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">Leves</p>
                <p className="text-2xl font-bold text-[hsl(var(--success))]">{stats.leve}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
            <input
              type="text"
              placeholder="Buscar por obra, autor o descripcion..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10 w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--input))] pl-10 pr-4 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            <select
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value)}
              className="h-10 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--input))] px-3 text-sm text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
            >
              <option value="">Todos los estados</option>
              {estadosDeterioro.map((estado) => (
                <option key={estado.value} value={estado.value}>
                  {estado.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Reporte
        </Button>
      </div>

      {/* Cards View for Deteriorations */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredDeteriorados.map((deterioro) => (
          <Card
            key={deterioro.idObraDeteriorada}
            className={`border-l-4 ${getEstadoColor(deterioro.estado)}`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">
                    {deterioro.obra.titulo}
                  </h3>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    {deterioro.obra.autor}
                  </p>
                </div>
                {getEstadoBadge(deterioro.estado)}
              </div>

              <p className="mt-4 text-sm text-[hsl(var(--foreground))]">
                {deterioro.descripcionDano}
              </p>

              <div className="mt-4 flex items-center gap-4 text-xs text-[hsl(var(--muted-foreground))]">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {deterioro.fechaIdentificacion}
                </span>
                <span>Ubicacion: {deterioro.obra.ubicacion}</span>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openViewModal(deterioro)}
                >
                  <Eye className="mr-1 h-4 w-4" />
                  Ver
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openEditModal(deterioro)}
                >
                  <Edit2 className="mr-1 h-4 w-4" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                >
                  <Wrench className="mr-1 h-4 w-4" />
                  Restaurar
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(deterioro.idObraDeteriorada)}
                >
                  <Trash2 className="h-4 w-4 text-[hsl(var(--destructive))]" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          resetForm();
        }}
        title="Nuevo Reporte de Deterioro"
        className="max-w-2xl"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreate();
          }}
          className="space-y-4"
        >
          <Select
            label="Obra Afectada"
            value={formData.idObra}
            onChange={(e) => setFormData({ ...formData, idObra: e.target.value })}
            options={mockObras.map((o) => ({
              value: o.idObra.toString(),
              label: `${o.titulo} - ${o.autor}`,
            }))}
            required
          />
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">
              Descripcion del Dano
            </label>
            <textarea
              value={formData.descripcionDano}
              onChange={(e) =>
                setFormData({ ...formData, descripcionDano: e.target.value })
              }
              rows={4}
              className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--input))] px-3 py-2 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
              placeholder="Describe detalladamente el dano observado..."
              required
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Select
              label="Estado/Gravedad"
              value={formData.estado}
              onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
              options={estadosDeterioro}
              required
            />
            <Input
              label="Fecha de Identificacion"
              type="date"
              value={formData.fechaIdentificacion}
              onChange={(e) =>
                setFormData({ ...formData, fechaIdentificacion: e.target.value })
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
            <Button type="submit">Crear Reporte</Button>
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
        title="Editar Reporte de Deterioro"
        className="max-w-2xl"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEdit();
          }}
          className="space-y-4"
        >
          <div className="rounded-lg bg-[hsl(var(--secondary))] p-4">
            <p className="text-sm text-[hsl(var(--muted-foreground))]">Obra</p>
            <p className="font-medium">{selectedDeterioro?.obra.titulo}</p>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              {selectedDeterioro?.obra.autor}
            </p>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">
              Descripcion del Dano
            </label>
            <textarea
              value={formData.descripcionDano}
              onChange={(e) =>
                setFormData({ ...formData, descripcionDano: e.target.value })
              }
              rows={4}
              className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--input))] px-3 py-2 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
              required
            />
          </div>
          <Select
            label="Estado/Gravedad"
            value={formData.estado}
            onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
            options={estadosDeterioro}
            required
          />
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
            <Button type="submit">Actualizar Reporte</Button>
          </div>
        </form>
      </Modal>

      {/* View Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Detalle del Reporte"
        className="max-w-2xl"
      >
        {selectedDeterioro && (
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  {selectedDeterioro.obra.titulo}
                </h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  {selectedDeterioro.obra.autor}
                </p>
              </div>
              {getEstadoBadge(selectedDeterioro.estado)}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">Tipo de Obra</p>
                <p className="font-medium">{selectedDeterioro.obra.tipo}</p>
              </div>
              <div>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">Tecnica</p>
                <p className="font-medium">{selectedDeterioro.obra.tecnica}</p>
              </div>
              <div>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">Ubicacion</p>
                <p className="font-medium">{selectedDeterioro.obra.ubicacion}</p>
              </div>
              <div>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">Fecha de Identificacion</p>
                <p className="font-medium">{selectedDeterioro.fechaIdentificacion}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">Descripcion del Dano</p>
              <p className="mt-1 rounded-lg bg-[hsl(var(--secondary))] p-4">
                {selectedDeterioro.descripcionDano}
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                Cerrar
              </Button>
              <Button>
                <Wrench className="mr-2 h-4 w-4" />
                Iniciar Restauracion
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
