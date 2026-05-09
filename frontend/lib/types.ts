export interface Obra {
  idObra: number;
  titulo: string;
  autor: string;
  fechaCreacion: string;
  tipo: string;
  tecnica: string;
  ubicacion: string;
}

export interface ObraDeteriorada {
  idObraDeteriorada: number;
  obra: Obra;
  descripcionDano: string;
  estado: string;
  fechaIdentificacion: string;
}

export interface PersonalMuseo {
  idPersonal: number;
  nombre: string;
  apellido: string;
  email: string;
  celular: string;
}

export interface Restauracion {
  idRestauracion: number;
  obraDeteriorada: ObraDeteriorada;
  responsable: PersonalMuseo;
  fechaInicio: string;
  fechaFin: string | null;
  tipoRestauracion: string;
  estadoRestauracion: string;
  observaciones: string;
}

export type EstadoDano = "LEVE" | "MODERADO" | "GRAVE" | "CRITICO";
export type EstadoRestauracion = "PENDIENTE" | "EN_PROCESO" | "COMPLETADA" | "CANCELADA";
