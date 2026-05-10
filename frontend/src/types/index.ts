// Enums matching backend
export enum EstadoObra {
  BUENO = "BUENO",
  REGULAR = "REGULAR",
  MALO = "MALO",
  EN_RESTAURACION = "EN_RESTAURACION",
}

export enum EstadoRestauracion {
  PENDIENTE = "PENDIENTE",
  EN_PROCESO = "EN_PROCESO",
  COMPLETADA = "COMPLETADA",
  CANCELADA = "CANCELADA",
}

export enum TiposRestauraciones {
  LIMPIEZA = "LIMPIEZA",
  CONSOLIDACION = "CONSOLIDACION",
  REINTEGRACION = "REINTEGRACION",
  RETOQUE = "RETOQUE",
  OTRO = "OTRO",
}

// Entity interfaces
export interface PersonalMuseo {
  idPersonal: number;
  nombre: string;
  apellido: string;
  cargo: string;
  email: string;
  telefono: string;
  activo: boolean;
}

export interface Obra {
  idObra: number;
  titulo: string;
  autor: string;
  anioCreacion: number;
  tecnica: string;
  dimensiones: string;
  ubicacion: string;
  estado: EstadoObra;
  descripcion: string;
  fechaAdquisicion: string;
  valorEstimado: number;
  imagenUrl?: string;
}

export interface ObraDeteriorada {
  idDeterioro: number;
  obra: Obra;
  fechaDeteccion: string;
  tipoDeterioro: string;
  descripcionDano: string;
  nivelGravedad: number;
  causaDeterioro: string;
  reportadoPor: PersonalMuseo;
  observaciones: string;
  requiereRestauracion: boolean;
}

export interface Restauracion {
  idRestauracion: number;
  obraDeteriorada: ObraDeteriorada;
  restauradorAsignado: PersonalMuseo;
  fechaInicio: string;
  fechaFinEstimada: string;
  fechaFinReal?: string;
  tipoRestauracion: TiposRestauraciones;
  estado: EstadoRestauracion;
  descripcionProcedimiento: string;
  materialesUtilizados: string;
  costoEstimado: number;
  costoReal?: number;
  observaciones: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Dashboard stats
export interface DashboardStats {
  totalObras: number;
  obrasDeterioradas: number;
  restauracionesEnProceso: number;
  restauracionesCompletadas: number;
  personalActivo: number;
}
