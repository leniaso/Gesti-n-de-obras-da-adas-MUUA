const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Types
export interface TipoObra {
  id: number;
  nombre: string;
}

export interface Tecnica {
  id: number;
  nombre: string;
}

export interface Obra {
  id: number;
  titulo: string;
  autor: string;
  fechaCreacion: string;
  tipo: TipoObra;
  fechaUltimaRevision: string;
  ubicacion: string;
  linkDrive: string;
  tecnica: Tecnica;
}

export interface PersonalMuseo {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  celular: string;
}

export type EstadoObra =
  | "estado_regular"
  | "revision_y_tratamiento"
  | "tratamiento_urgente"
  | "revision_pendiente";

export interface ObraDeteriorada {
  id: number;
  obra: Obra;
  personal: PersonalMuseo;
  descripcion: string;
  estado: EstadoObra;
  fechaIdentificacion: string;
}

export type EstadoRestauracion = "en_proceso" | "finalizado";
export type TipoRestauracion = "mantenimiento" | "intensivo";

export interface Restauracion {
  id: number;
  fechaRestauracion: string;
  estado: EstadoRestauracion;
  tipoRestauracion: TipoRestauracion;
  responsable: string;
  personalMuseo: PersonalMuseo;
  obraDeteriorada: ObraDeteriorada;
  observaciones: string;
}

// API functions
export const api = {
  // Obras
  obras: {
    listar: () => fetchAPI<Obra[]>("/obras"),
    buscar: (id: number) => fetchAPI<Obra>(`/obras/${id}`),
    busquedaAvanzada: (params: {
      autor?: string;
      titulo?: string;
      idTecnica?: number;
      idTipo?: number;
      anio?: number;
    }) => {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          searchParams.append(key, String(value));
        }
      });
      return fetchAPI<Obra[]>(`/obras/buscar?${searchParams}`);
    },
    crear: (data: Omit<Obra, "id" | "tipo" | "tecnica"> & { idTipo: number; idTecnica: number }) =>
      fetchAPI<Obra>("/obras", { method: "POST", body: JSON.stringify(data) }),
    editar: (id: number, data: Omit<Obra, "id" | "tipo" | "tecnica"> & { idTipo: number; idTecnica: number }) =>
      fetchAPI<Obra>(`/obras/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  },

  // Obras Deterioradas
  obrasDeterioradas: {
    listar: () => fetchAPI<ObraDeteriorada[]>("/obras-deterioradas"),
    buscar: (id: number) => fetchAPI<ObraDeteriorada>(`/obras-deterioradas/${id}`),
    filtrar: (estado: EstadoObra) => fetchAPI<ObraDeteriorada[]>(`/obras-deterioradas/filtrar?estado=${estado}`),
    reportar: (data: { idObra: number; idPersonal?: number; descripcion: string; estado: EstadoObra; fechaIdentificacion: string }) =>
      fetchAPI<ObraDeteriorada>("/obras-deterioradas", { method: "POST", body: JSON.stringify(data) }),
    editar: (id: number, data: { idObra: number; idPersonal?: number; descripcion: string; estado: EstadoObra; fechaIdentificacion: string }) =>
      fetchAPI<ObraDeteriorada>(`/obras-deterioradas/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  },

  // Restauraciones
  restauraciones: {
    listar: () => fetchAPI<Restauracion[]>("/restauraciones"),
    buscar: (id: number) => fetchAPI<Restauracion>(`/restauraciones/${id}`),
    porObraDeteriorada: (id: number) => fetchAPI<Restauracion[]>(`/restauraciones/por-obra-deteriorada/${id}`),
    porObra: (idObra: number) => fetchAPI<Restauracion[]>(`/restauraciones/por-obra/${idObra}`),
    filtrarFecha: (desde: string, hasta: string) =>
      fetchAPI<Restauracion[]>(`/restauraciones/filtrar-fecha?desde=${desde}&hasta=${hasta}`),
    crear: (data: { fechaRestauracion: string; estado: EstadoRestauracion; tipoRestauracion: TipoRestauracion; responsable?: string; idPersonalMuseo?: number; idObraDeteriorada: number; observaciones?: string }) =>
      fetchAPI<Restauracion>("/restauraciones", { method: "POST", body: JSON.stringify(data) }),
    editar: (id: number, data: { fechaRestauracion: string; estado: EstadoRestauracion; tipoRestauracion: TipoRestauracion; responsable?: string; idPersonalMuseo?: number; idObraDeteriorada: number; observaciones?: string }) =>
      fetchAPI<Restauracion>(`/restauraciones/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  },

  // Personal
  personal: {
    listar: () => fetchAPI<PersonalMuseo[]>("/personal"),
    buscar: (id: number) => fetchAPI<PersonalMuseo>(`/personal/${id}`),
    crear: (data: Omit<PersonalMuseo, "id">) =>
      fetchAPI<PersonalMuseo>("/personal", { method: "POST", body: JSON.stringify(data) }),
    editar: (id: number, data: Omit<PersonalMuseo, "id">) =>
      fetchAPI<PersonalMuseo>(`/personal/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  },

  // Catálogos
  catalogos: {
    tecnicas: () => fetchAPI<Tecnica[]>("/catalogos/tecnicas"),
    tiposObras: () => fetchAPI<TipoObra[]>("/catalogos/tipos-obras"),
  },
};
