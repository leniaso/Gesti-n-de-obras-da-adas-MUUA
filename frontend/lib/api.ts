const API_BASE = "/api";

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Obras
export const obrasApi = {
  getAll: () => fetchAPI<import("./types").Obra[]>("/obras"),
  getById: (id: number) => fetchAPI<import("./types").Obra>(`/obras/${id}`),
  create: (data: Omit<import("./types").Obra, "idObra">) =>
    fetchAPI<import("./types").Obra>("/obras", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: number, data: Partial<import("./types").Obra>) =>
    fetchAPI<import("./types").Obra>(`/obras/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: number) =>
    fetchAPI<void>(`/obras/${id}`, { method: "DELETE" }),
};

// Obras Deterioradas
export const obrasDeterioradasApi = {
  getAll: () => fetchAPI<import("./types").ObraDeteriorada[]>("/obras-deterioradas"),
  getById: (id: number) => fetchAPI<import("./types").ObraDeteriorada>(`/obras-deterioradas/${id}`),
  getByEstado: (estado: string) => 
    fetchAPI<import("./types").ObraDeteriorada[]>(`/obras-deterioradas/estado/${estado}`),
  create: (data: { idObra: number; descripcionDano: string; estado: string; fechaIdentificacion: string }) =>
    fetchAPI<import("./types").ObraDeteriorada>("/obras-deterioradas", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: number, data: { descripcionDano?: string; estado?: string }) =>
    fetchAPI<import("./types").ObraDeteriorada>(`/obras-deterioradas/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: number) =>
    fetchAPI<void>(`/obras-deterioradas/${id}`, { method: "DELETE" }),
};

// Personal del Museo
export const personalApi = {
  getAll: () => fetchAPI<import("./types").PersonalMuseo[]>("/personal"),
  getById: (id: number) => fetchAPI<import("./types").PersonalMuseo>(`/personal/${id}`),
  create: (data: Omit<import("./types").PersonalMuseo, "idPersonal">) =>
    fetchAPI<import("./types").PersonalMuseo>("/personal", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: number, data: Partial<import("./types").PersonalMuseo>) =>
    fetchAPI<import("./types").PersonalMuseo>(`/personal/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: number) =>
    fetchAPI<void>(`/personal/${id}`, { method: "DELETE" }),
};

// Restauraciones
export const restauracionesApi = {
  getAll: () => fetchAPI<import("./types").Restauracion[]>("/restauraciones"),
  getById: (id: number) => fetchAPI<import("./types").Restauracion>(`/restauraciones/${id}`),
  getByEstado: (estado: string) =>
    fetchAPI<import("./types").Restauracion[]>(`/restauraciones/estado/${estado}`),
  create: (data: {
    idObraDeteriorada: number;
    idResponsable: number;
    fechaInicio: string;
    fechaFin?: string;
    tipoRestauracion: string;
    estadoRestauracion: string;
    observaciones: string;
  }) =>
    fetchAPI<import("./types").Restauracion>("/restauraciones", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: number, data: Partial<{
    fechaFin: string;
    estadoRestauracion: string;
    observaciones: string;
  }>) =>
    fetchAPI<import("./types").Restauracion>(`/restauraciones/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: number) =>
    fetchAPI<void>(`/restauraciones/${id}`, { method: "DELETE" }),
};
