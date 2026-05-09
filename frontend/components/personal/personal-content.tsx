"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Users,
  Mail,
  Phone,
  User,
} from "lucide-react";
import type { PersonalMuseo } from "@/lib/types";

// Mock data
const mockPersonal: PersonalMuseo[] = [
  {
    idPersonal: 1,
    nombre: "Maria",
    apellido: "Garcia",
    email: "maria.garcia@muua.edu",
    celular: "555-0101",
  },
  {
    idPersonal: 2,
    nombre: "Carlos",
    apellido: "Rodriguez",
    email: "carlos.rodriguez@muua.edu",
    celular: "555-0102",
  },
  {
    idPersonal: 3,
    nombre: "Ana",
    apellido: "Martinez",
    email: "ana.martinez@muua.edu",
    celular: "555-0103",
  },
  {
    idPersonal: 4,
    nombre: "Luis",
    apellido: "Fernandez",
    email: "luis.fernandez@muua.edu",
    celular: "555-0104",
  },
  {
    idPersonal: 5,
    nombre: "Sofia",
    apellido: "Lopez",
    email: "sofia.lopez@muua.edu",
    celular: "555-0105",
  },
];

export function PersonalContent() {
  const [personal, setPersonal] = useState<PersonalMuseo[]>(mockPersonal);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedPersonal, setSelectedPersonal] = useState<PersonalMuseo | null>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    celular: "",
  });

  const filteredPersonal = personal.filter((p) => {
    const fullName = `${p.nombre} ${p.apellido}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleCreate = () => {
    const newPersonal: PersonalMuseo = {
      idPersonal: Math.max(...personal.map((p) => p.idPersonal)) + 1,
      ...formData,
    };
    setPersonal([...personal, newPersonal]);
    setIsCreateModalOpen(false);
    resetForm();
  };

  const handleEdit = () => {
    if (!selectedPersonal) return;
    setPersonal(
      personal.map((p) =>
        p.idPersonal === selectedPersonal.idPersonal ? { ...p, ...formData } : p
      )
    );
    setIsEditModalOpen(false);
    resetForm();
  };

  const handleDelete = (id: number) => {
    if (confirm("Esta seguro de eliminar este miembro del personal?")) {
      setPersonal(personal.filter((p) => p.idPersonal !== id));
    }
  };

  const openEditModal = (persona: PersonalMuseo) => {
    setSelectedPersonal(persona);
    setFormData({
      nombre: persona.nombre,
      apellido: persona.apellido,
      email: persona.email,
      celular: persona.celular,
    });
    setIsEditModalOpen(true);
  };

  const openViewModal = (persona: PersonalMuseo) => {
    setSelectedPersonal(persona);
    setIsViewModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      nombre: "",
      apellido: "",
      email: "",
      celular: "",
    });
    setSelectedPersonal(null);
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">Total Personal</p>
                <p className="text-3xl font-bold">{personal.length}</p>
              </div>
              <div className="rounded-xl bg-[hsl(var(--primary))]/10 p-3">
                <Users className="h-6 w-6 text-[hsl(var(--primary))]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">Restauradores Activos</p>
                <p className="text-3xl font-bold">3</p>
              </div>
              <div className="rounded-xl bg-[hsl(var(--success))]/10 p-3">
                <User className="h-6 w-6 text-[hsl(var(--success))]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  Restauraciones Asignadas
                </p>
                <p className="text-3xl font-bold">7</p>
              </div>
              <div className="rounded-xl bg-blue-400/10 p-3">
                <User className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
          <input
            type="text"
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10 w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--input))] pl-10 pr-4 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
          />
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Personal
        </Button>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPersonal.map((persona) => (
          <Card key={persona.idPersonal} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--primary))]">
                  <span className="text-lg font-semibold text-white">
                    {persona.nombre[0]}
                    {persona.apellido[0]}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">
                    {persona.nombre} {persona.apellido}
                  </h3>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                      <Mail className="h-4 w-4" />
                      {persona.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                      <Phone className="h-4 w-4" />
                      {persona.celular}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2 border-t border-[hsl(var(--border))] pt-4">
                <Button variant="ghost" size="sm" onClick={() => openViewModal(persona)}>
                  <Eye className="mr-1 h-4 w-4" />
                  Ver
                </Button>
                <Button variant="ghost" size="sm" onClick={() => openEditModal(persona)}>
                  <Edit2 className="mr-1 h-4 w-4" />
                  Editar
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(persona.idPersonal)}
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
        title="Nuevo Personal"
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
              label="Nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              required
            />
            <Input
              label="Apellido"
              value={formData.apellido}
              onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
              required
            />
          </div>
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input
            label="Celular"
            value={formData.celular}
            onChange={(e) => setFormData({ ...formData, celular: e.target.value })}
            required
          />
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
            <Button type="submit">Guardar</Button>
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
        title="Editar Personal"
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
              label="Nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              required
            />
            <Input
              label="Apellido"
              value={formData.apellido}
              onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
              required
            />
          </div>
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input
            label="Celular"
            value={formData.celular}
            onChange={(e) => setFormData({ ...formData, celular: e.target.value })}
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
            <Button type="submit">Actualizar</Button>
          </div>
        </form>
      </Modal>

      {/* View Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Detalle del Personal"
      >
        {selectedPersonal && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--primary))]">
                <span className="text-2xl font-semibold text-white">
                  {selectedPersonal.nombre[0]}
                  {selectedPersonal.apellido[0]}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold">
                  {selectedPersonal.nombre} {selectedPersonal.apellido}
                </h3>
                <Badge variant="secondary">Restaurador</Badge>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-lg bg-[hsl(var(--secondary))] p-3">
                <Mail className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
                <div>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">Email</p>
                  <p className="font-medium">{selectedPersonal.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-[hsl(var(--secondary))] p-3">
                <Phone className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
                <div>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">Celular</p>
                  <p className="font-medium">{selectedPersonal.celular}</p>
                </div>
              </div>
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
