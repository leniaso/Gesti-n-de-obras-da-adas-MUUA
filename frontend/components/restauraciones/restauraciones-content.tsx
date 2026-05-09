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
  Wrench,
  Calendar,
  User,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import type { Restauracion, ObraDeteriorada, PersonalMuseo, Obra } from "@/lib/types";

// Mock data
const mockObras: Obra[] = [
  { idObra: 1, titulo: "La Noche Estrellada", autor: "Vincent van Gogh", fechaCreacion: "1889-06-01", tipo: "Pintura", tecnica: "Oleo sobre lienzo", ubicacion: "Sala A" },
  { idObra: 2, titulo: "Las Meninas", autor: "Diego Velazquez", fechaCreacion: "1656-01-01", tipo: "Pintura", tecnica: "Oleo sobre lienzo", ubicacion: "Sala B" },
  { idObra: 4, titulo: "Guernica", autor: "Pablo Picasso", fechaCreacion: "1937-06-01", tipo: "Pintura", tecnica: "Oleo sobre lienzo", ubicacion: "Sala C" },
];

const mockPersonal: PersonalMuseo[] = [
  { idPersonal: 1, nombre: "Maria", apellido: "Garcia", email: "maria.garcia@muua.edu", celular: "555-0101" },
  { idPersonal: 2, nombre: "Carlos", apellido: "Rodriguez", email: "carlos.rodriguez@muua.edu", celular: "555-0102" },
  { idPersonal: 3, nombre: "Ana", apellido: "Martinez", email: "ana.martinez@muua.edu", celular: "555-0103" },
];

const mockDeterioradas: ObraDeteriorada[] = [
  { idObraDeteriorada: 1, obra: mockObras[0], descripcionDano: "Fisuras en pintura", estado: "CRITICO", fechaIdentificacion: "2024-01-15" },
  { idObraDeteriorada: 2, obra: mockObras[1], descripcionDano: "Decoloracion", estado: "MODERADO", fechaIdentificacion: "2024-01-14" },
  { idObraDeteriorada: 3, obra: mockObras[2], descripcionDano: "Danos estructurales", estado: "GRAVE", fechaIdentificacion: "2024-01-10" },
];

const mockRestauraciones: Restauracion[] = [
  {
    idRestauracion: 1,
    obraDeteriorada: mockDeterioradas[0],
    responsable: mockPersonal[0],
    fechaInicio: "2024-01-01",
    fechaFin: null,
    tipoRestauracion: "CONSERVACION",
    estadoRestauracion: "EN_PROCESO",
    observaciones: "Se esta aplicando tratamiento de consolidacion en las areas afectadas.",
  },
  {
    idRestauracion: 2,
    obraDeteriorada: mockDeterioradas[1],
    responsable: mockPersonal[1],
    fechaInicio: "2024-01-08",
    fechaFin: null,
    tipoRestauracion: "LIMPIEZA",
    estadoRestauracion: "EN_PROCESO",
    observaciones: "Proceso de limpieza superficial con solventes especializados.",
  },
  {
    idRestauracion: 3,
    obraDeteriorada: mockDeterioradas[2],
    responsable: mockPersonal[2],
    fechaInicio: "2023-12-15",
    fechaFin: "2024-01-20",
    tipoRestauracion: "ESTRUCTURAL",
    estadoRestauracion: "COMPLETADA",
    observaciones: "Refuerzo del bastidor completado exitosamente.",
  },
];

const tiposRestauracion = [
  { value: "LIMPIEZA", label: "Limpieza" },
  { value: "CONSERVACION", label: "Conservacion" },
  { value: "ESTRUCTURAL", label: "Estructural" },
  { value: "RETOQUE", label: "Retoque" },
  { value: "COMPLETA", label: "Restauracion Completa" },
];

const estadosRestauracion = [
  { value: "PENDIENTE", label: "Pendiente" },
  { value: "EN_PROCESO", label: "En Proceso" },
  { value: "COMPLETADA", label: "Completada" },
  { value: "CANCELADA", label: "Cancelada" },
];

function getEstadoBadge(estado: string) {
  switch (estado) {
    case "PENDIENTE":
      return (
        <Badge variant="secondary" className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Pendiente
        </Badge>
      );
    case "EN_PROCESO":
      return (
        <Badge variant="default" className="flex items-center gap-1">
          <Wrench className="h-3 w-3" />
          En Proceso
        </Badge>
      );
    case "COMPLETADA":
      return (
        <Badge variant="success" className="flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          Completada
        </Badge>
      );
    case "CANCELADA":
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <XCircle className="h-3 w-3" />
          Cancelada
        </Badge>
      );
    default:
      return <Badge variant="secondary">{estado}</Badge>;
  }
}

export function RestauracionesContent() {
  const [restauraciones, setRestauraciones] = useState<Restauracion[]>(mockRestauraciones);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEstado, setFilterEstado] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedRestauracion, setSelectedRestauracion] = useState<Restauracion | null>(null);
  const [formData, setFormData] = useState({
    idObraDeteriorada: "",
    idResponsable: "",
    fechaInicio: new Date().toISOString().split("T")[0],
    fechaFin: "",
    tipoRestauracion: "",
    estadoRestauracion: "PENDIENTE",
    observaciones: "",
  });

  const filteredRestauraciones = restauraciones.filter((r) => {
    const matchesSearch =
      r.obraDeteriorada.obra.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${r.responsable.nombre} ${r.responsable.apellido}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEstado = !filterEstado || r.estadoRestauracion === filterEstado;
    return matchesSearch && matchesEstado;
  });

  // Stats
  const stats = {
    total: restauraciones.length,
    enProceso: restauraciones.filter((r) => r.estadoRestauracion === "EN_PROCESO").length,
    completadas: restauraciones.filter((r) => r.estadoRestauracion === "COMPLETADA").length,
    pendientes: restauraciones.filter((r) => r.estadoRestauracion === "PENDIENTE").length,
  };

  const handleCreate = () => {
    const obraDeteriorada = mockDeterioradas.find(
      (d) => d.idObraDeteriorada === parseInt(formData.idObraDeteriorada)
    );
    const responsable = mockPersonal.find(
      (p) => p.idPersonal === parseInt(formData.idResponsable)
    );
    if (!obraDeteriorada || !responsable) return;

    const newRestauracion: Restauracion = {
      idRestauracion: Math.max(...restauraciones.map((r) => r.idRestauracion)) + 1,
      obraDeteriorada,
      responsable,
      fechaInicio: formData.fechaInicio,
      fechaFin: formData.fechaFin || null,
      tipoRestauracion: formData.tipoRestauracion,
      estadoRestauracion: formData.estadoRestauracion,
      observaciones: formData.observaciones,
    };
    setRestauraciones([...restauraciones, newRestauracion]);
    setIsCreateModalOpen(false);
    resetForm();
  };

  const handleEdit = () => {
    if (!selectedRestauracion) return;
    setRestauraciones(
      restauraciones.map((r) =>
        r.idRestauracion === selectedRestauracion.idRestauracion
          ? {
              ...r,
              fechaFin: formData.fechaFin || null,
              estadoRestauracion: formData.estadoRestauracion,
              observaciones: formData.observaciones,
            }
          : r
      )
    );
    setIsEditModalOpen(false);
    resetForm();
  };

  const handleDelete = (id: number) => {
    if (confirm("Esta seguro de eliminar esta restauracion?")) {
      setRestauraciones(restauraciones.filter((r) => r.idRestauracion !== id));
    }
  };

  const openEditModal = (restauracion: Restauracion) => {
    setSelectedRestauracion(restauracion);
    setFormData({
      idObraDeteriorada: restauracion.obraDeteriorada.idObraDeteriorada.toString(),
      idResponsable: restauracion.responsable.idPersonal.toString(),
      fechaInicio: restauracion.fechaInicio,
      fechaFin: restauracion.fechaFin || "",
      tipoRestauracion: restauracion.tipoRestauracion,
      estadoRestauracion: restauracion.estadoRestauracion,
      observaciones: restauracion.observaciones,
    });
    setIsEditModalOpen(true);
  };

  const openViewModal = (restauracion: Restauracion) => {
    setSelectedRestauracion(restauracion);
    setIsViewModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      idObraDeteriorada: "",
      idResponsable: "",
      fechaInicio: new Date().toISOString().split("T")[0],
      fechaFin: "",
      tipoRestauracion: "",
      estadoRestauracion: "PENDIENTE",
      observaciones: "",
    });
    setSelectedRestauracion(null);
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Wrench className="h-8 w-8 text-[hsl(var(--muted-foreground))]" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-[hsl(var(--primary))]">
          <CardContent className="p-4">
            <div>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">En Proceso</p>
              <p className="text-2xl font-bold text-[hsl(var(--primary))]">{stats.enProceso}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-[hsl(var(--success))]">
          <CardContent className="p-4">
            <div>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">Completadas</p>
              <p className="text-2xl font-bold text-[hsl(var(--success))]">{stats.completadas}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-[hsl(var(--muted-foreground))]">
          <CardContent className="p-4">
            <div>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">Pendientes</p>
              <p className="text-2xl font-bold">{stats.pendientes}</p>
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
              placeholder="Buscar por obra o responsable..."
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
              {estadosRestauracion.map((estado) => (
                <option key={estado.value} value={estado.value}>
                  {estado.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Restauracion
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-[hsl(var(--primary))]" />
            Restauraciones ({filteredRestauraciones.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Obra</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Responsable</TableHead>
                <TableHead>Fecha Inicio</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRestauraciones.map((restauracion) => (
                <TableRow key={restauracion.idRestauracion}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{restauracion.obraDeteriorada.obra.titulo}</p>
                      <p className="text-sm text-[hsl(var(--muted-foreground))]">
                        {restauracion.obraDeteriorada.obra.autor}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{restauracion.tipoRestauracion}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--primary))]/10">
                        <User className="h-4 w-4 text-[hsl(var(--primary))]" />
                      </div>
                      <span>
                        {restauracion.responsable.nombre} {restauracion.responsable.apellido}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                      {restauracion.fechaInicio}
                    </div>
                  </TableCell>
                  <TableCell>{getEstadoBadge(restauracion.estadoRestauracion)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openViewModal(restauracion)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditModal(restauracion)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(restauracion.idRestauracion)}
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
        title="Nueva Restauracion"
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
            label="Obra Deteriorada"
            value={formData.idObraDeteriorada}
            onChange={(e) => setFormData({ ...formData, idObraDeteriorada: e.target.value })}
            options={mockDeterioradas.map((d) => ({
              value: d.idObraDeteriorada.toString(),
              label: `${d.obra.titulo} - ${d.estado}`,
            }))}
            required
          />
          <Select
            label="Responsable"
            value={formData.idResponsable}
            onChange={(e) => setFormData({ ...formData, idResponsable: e.target.value })}
            options={mockPersonal.map((p) => ({
              value: p.idPersonal.toString(),
              label: `${p.nombre} ${p.apellido}`,
            }))}
            required
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Select
              label="Tipo de Restauracion"
              value={formData.tipoRestauracion}
              onChange={(e) => setFormData({ ...formData, tipoRestauracion: e.target.value })}
              options={tiposRestauracion}
              required
            />
            <Select
              label="Estado"
              value={formData.estadoRestauracion}
              onChange={(e) => setFormData({ ...formData, estadoRestauracion: e.target.value })}
              options={estadosRestauracion}
              required
            />
            <Input
              label="Fecha de Inicio"
              type="date"
              value={formData.fechaInicio}
              onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
              required
            />
            <Input
              label="Fecha de Fin (opcional)"
              type="date"
              value={formData.fechaFin}
              onChange={(e) => setFormData({ ...formData, fechaFin: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">
              Observaciones
            </label>
            <textarea
              value={formData.observaciones}
              onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
              rows={3}
              className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--input))] px-3 py-2 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
              placeholder="Notas sobre el proceso de restauracion..."
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
            <Button type="submit">Crear Restauracion</Button>
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
        title="Actualizar Restauracion"
        className="max-w-2xl"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEdit();
          }}
          className="space-y-4"
        >
          {selectedRestauracion && (
            <div className="rounded-lg bg-[hsl(var(--secondary))] p-4">
              <p className="font-medium">{selectedRestauracion.obraDeteriorada.obra.titulo}</p>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                Responsable: {selectedRestauracion.responsable.nombre}{" "}
                {selectedRestauracion.responsable.apellido}
              </p>
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <Select
              label="Estado"
              value={formData.estadoRestauracion}
              onChange={(e) => setFormData({ ...formData, estadoRestauracion: e.target.value })}
              options={estadosRestauracion}
              required
            />
            <Input
              label="Fecha de Fin"
              type="date"
              value={formData.fechaFin}
              onChange={(e) => setFormData({ ...formData, fechaFin: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">
              Observaciones
            </label>
            <textarea
              value={formData.observaciones}
              onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
              rows={3}
              className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--input))] px-3 py-2 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
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
            <Button type="submit">Actualizar</Button>
          </div>
        </form>
      </Modal>

      {/* View Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Detalle de Restauracion"
        className="max-w-2xl"
      >
        {selectedRestauracion && (
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  {selectedRestauracion.obraDeteriorada.obra.titulo}
                </h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  {selectedRestauracion.obraDeteriorada.obra.autor}
                </p>
              </div>
              {getEstadoBadge(selectedRestauracion.estadoRestauracion)}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">Tipo de Restauracion</p>
                <Badge variant="secondary">{selectedRestauracion.tipoRestauracion}</Badge>
              </div>
              <div>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">Responsable</p>
                <p className="font-medium">
                  {selectedRestauracion.responsable.nombre} {selectedRestauracion.responsable.apellido}
                </p>
              </div>
              <div>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">Fecha de Inicio</p>
                <p className="font-medium">{selectedRestauracion.fechaInicio}</p>
              </div>
              <div>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">Fecha de Fin</p>
                <p className="font-medium">{selectedRestauracion.fechaFin || "En progreso"}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">Dano Original</p>
              <p className="mt-1 rounded-lg bg-[hsl(var(--secondary))] p-3 text-sm">
                {selectedRestauracion.obraDeteriorada.descripcionDano}
              </p>
            </div>

            <div>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">Observaciones</p>
              <p className="mt-1 rounded-lg bg-[hsl(var(--secondary))] p-3 text-sm">
                {selectedRestauracion.observaciones || "Sin observaciones"}
              </p>
            </div>

            <div className="flex justify-end pt-4">
              <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                Cerrar
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
