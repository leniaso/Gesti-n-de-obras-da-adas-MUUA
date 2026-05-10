"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EstadoObra } from "@/types";

interface ObraFormProps {
  onSuccess: () => void;
}

export function ObraForm({ onSuccess }: ObraFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would call the API to create the obra
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="titulo">Título</Label>
          <Input id="titulo" placeholder="Nombre de la obra" required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="autor">Autor</Label>
          <Input id="autor" placeholder="Nombre del autor" required />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex flex-col gap-2">
          <Label htmlFor="anio">Año de Creación</Label>
          <Input id="anio" type="number" placeholder="1900" required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="tecnica">Técnica</Label>
          <Input id="tecnica" placeholder="Óleo, acrílico, etc." required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="dimensiones">Dimensiones</Label>
          <Input id="dimensiones" placeholder="100x80 cm" required />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="ubicacion">Ubicación</Label>
          <Input id="ubicacion" placeholder="Sala de exhibición" required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="estado">Estado</Label>
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={EstadoObra.BUENO}>Bueno</SelectItem>
              <SelectItem value={EstadoObra.REGULAR}>Regular</SelectItem>
              <SelectItem value={EstadoObra.MALO}>Malo</SelectItem>
              <SelectItem value={EstadoObra.EN_RESTAURACION}>
                En Restauración
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="fechaAdquisicion">Fecha de Adquisición</Label>
          <Input id="fechaAdquisicion" type="date" required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="valorEstimado">Valor Estimado (COP)</Label>
          <Input
            id="valorEstimado"
            type="number"
            placeholder="10000000"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="descripcion">Descripción</Label>
        <Textarea
          id="descripcion"
          placeholder="Descripción detallada de la obra..."
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancelar
        </Button>
        <Button type="submit">Guardar Obra</Button>
      </div>
    </form>
  );
}
