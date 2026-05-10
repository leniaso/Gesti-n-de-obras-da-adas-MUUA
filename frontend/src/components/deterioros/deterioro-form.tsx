"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DeterioroFormProps {
  onSuccess: () => void;
}

const tiposDeterioro = [
  "Craqueladuras",
  "Desprendimiento",
  "Decoloración",
  "Humedad",
  "Suciedad",
  "Roturas",
  "Oxidación",
  "Plagas",
  "Deformación",
  "Otro",
];

export function DeterioroForm({ onSuccess }: DeterioroFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="obra">Obra Afectada</Label>
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar obra" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Retrato Colonial</SelectItem>
              <SelectItem value="2">Paisaje Antioqueño</SelectItem>
              <SelectItem value="3">Cerámica Muisca</SelectItem>
              <SelectItem value="4">Escultura Moderna</SelectItem>
              <SelectItem value="5">Mural Contemporáneo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="tipoDeterioro">Tipo de Deterioro</Label>
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar tipo" />
            </SelectTrigger>
            <SelectContent>
              {tiposDeterioro.map((tipo) => (
                <SelectItem key={tipo} value={tipo.toLowerCase()}>
                  {tipo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="fechaDeteccion">Fecha de Detección</Label>
          <Input id="fechaDeteccion" type="date" required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="nivelGravedad">Nivel de Gravedad (1-10)</Label>
          <Input
            id="nivelGravedad"
            type="number"
            min="1"
            max="10"
            placeholder="5"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="causaDeterioro">Causa del Deterioro</Label>
        <Input
          id="causaDeterioro"
          placeholder="Ej: Cambios de humedad, exposición solar..."
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="descripcionDano">Descripción del Daño</Label>
        <Textarea
          id="descripcionDano"
          placeholder="Describa detalladamente el daño observado..."
          rows={3}
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="observaciones">Observaciones Adicionales</Label>
        <Textarea
          id="observaciones"
          placeholder="Notas o recomendaciones adicionales..."
          rows={2}
        />
      </div>

      <div className="flex items-center gap-3">
        <Switch id="requiereRestauracion" />
        <Label htmlFor="requiereRestauracion" className="cursor-pointer">
          Requiere restauración inmediata
        </Label>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancelar
        </Button>
        <Button type="submit">Registrar Deterioro</Button>
      </div>
    </form>
  );
}
