"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Plus,
  Search,
  Users,
  Mail,
  Phone,
  Edit,
  User,
} from "lucide-react";

// Mock data
const mockPersonal = [
  {
    id: 1,
    nombre: "Carlos",
    apellido: "Martínez Restrepo",
    email: "carlos.martinez@udea.edu.co",
    celular: "+57 300 123 4567",
  },
  {
    id: 2,
    nombre: "María",
    apellido: "López Gómez",
    email: "maria.lopez@udea.edu.co",
    celular: "+57 301 234 5678",
  },
  {
    id: 3,
    nombre: "Ana",
    apellido: "García Pérez",
    email: "ana.garcia@udea.edu.co",
    celular: "+57 302 345 6789",
  },
  {
    id: 4,
    nombre: "Juan",
    apellido: "Rodríguez Muñoz",
    email: "juan.rodriguez@udea.edu.co",
    celular: "+57 303 456 7890",
  },
  {
    id: 5,
    nombre: "Laura",
    apellido: "Hernández Ospina",
    email: "laura.hernandez@udea.edu.co",
    celular: "+57 304 567 8901",
  },
  {
    id: 6,
    nombre: "Diego",
    apellido: "Torres Vélez",
    email: "diego.torres@udea.edu.co",
    celular: "+57 305 678 9012",
  },
  {
    id: 7,
    nombre: "Camila",
    apellido: "Sánchez Arango",
    email: "camila.sanchez@udea.edu.co",
    celular: "+57 306 789 0123",
  },
  {
    id: 8,
    nombre: "Andrés",
    apellido: "Mejía Cardona",
    email: "andres.mejia@udea.edu.co",
    celular: "+57 307 890 1234",
  },
];

export default function PersonalPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filteredPersonal = mockPersonal.filter((person) => {
    const fullName = `${person.nombre} ${person.apellido}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      person.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Users className="h-8 w-8 text-green-600" />
            Personal del Museo
          </h1>
          <p className="mt-2 text-muted-foreground">
            Gestiona el equipo de trabajo del museo.
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Agregar Personal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Personal</DialogTitle>
              <DialogDescription>
                Complete la información del nuevo miembro del equipo.
              </DialogDescription>
            </DialogHeader>
            <form className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input id="nombre" placeholder="Nombre" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apellido">Apellido</Label>
                  <Input id="apellido" placeholder="Apellido" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input id="email" type="email" placeholder="correo@udea.edu.co" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="celular">Celular</Label>
                <Input id="celular" type="tel" placeholder="+57 300 000 0000" />
              </div>
            </form>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsCreateOpen(false)}>Guardar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nombre o correo..."
          className="pl-10 max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-4">
        Mostrando {filteredPersonal.length} de {mockPersonal.length} miembros
      </p>

      {/* Personal Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPersonal.map((person) => (
          <Card key={person.id} className="group hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{person.nombre}</CardTitle>
                    <CardDescription>{person.apellido}</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8">
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Editar</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <a
                href={`mailto:${person.email}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span className="truncate">{person.email}</span>
              </a>
              <a
                href={`tel:${person.celular.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>{person.celular}</span>
              </a>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPersonal.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground">No se encontró personal</h3>
          <p className="text-muted-foreground mt-1">
            Intenta ajustar los filtros de búsqueda.
          </p>
        </div>
      )}
    </div>
  );
}
