const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

// Obras
export const obrasApi = {
  getAll: () => fetchApi<import("@/types").Obra[]>("/obras"),
  getById: (id: number) => fetchApi<import("@/types").Obra>(`/obras/${id}`),
  create: (obra: Omit<import("@/types").Obra, "idObra">) =>
    fetchApi<import("@/types").Obra>("/obras", {
      method: "POST",
      body: JSON.stringify(obra),
    }),
  update: (id: number, obra: Partial<import("@/types").Obra>) =>
    fetchApi<import("@/types").Obra>(`/obras/${id}`, {
      method: "PUT",
      body: JSON.stringify(obra),
    }),
  delete: (id: number) =>
    fetchApi<void>(`/obras/${id}`, { method: "DELETE" }),
};

// Obras Deterioradas
export const obrasDeterioradasApi = {
  getAll: () => fetchApi<import("@/types").ObraDeteriorada[]>("/obras-deterioradas"),
  getById: (id: number) => fetchApi<import("@/types").ObraDeteriorada>(`/obras-deterioradas/${id}`),
  create: (data: {
    obraId: number;
    tipoDeterioro: string;
    descripcionDano: string;
    nivelGravedad: number;
    causaDeterioro: string;
    reportadoPorId: number;
    observaciones: string;
    requiereRestauracion: boolean;
  }) =>
    fetchApi<import("@/types").ObraDeteriorada>("/obras-deterioradas", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: number, data: Partial<import("@/types").ObraDeteriorada>) =>
    fetchApi<import("@/types").ObraDeteriorada>(`/obras-deterioradas/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: number) =>
    fetchApi<void>(`/obras-deterioradas/${id}`, { method: "DELETE" }),
};

// Restauraciones
export const restauracionesApi = {
  getAll: () => fetchApi<import("@/types").Restauracion[]>("/restauraciones"),
  getById: (id: number) => fetchApi<import("@/types").Restauracion>(`/restauraciones/${id}`),
  create: (data: {
    obraDeterioradaId: number;
    restauradorAsignadoId: number;
    fechaFinEstimada: string;
    tipoRestauracion: string;
    descripcionProcedimiento: string;
    materialesUtilizados: string;
    costoEstimado: number;
    observaciones: string;
  }) =>
    fetchApi<import("@/types").Restauracion>("/restauraciones", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: number, data: Partial<import("@/types").Restauracion>) =>
    fetchApi<import("@/types").Restauracion>(`/restauraciones/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: number) =>
    fetchApi<void>(`/restauraciones/${id}`, { method: "DELETE" }),
};

// Personal
export const personalApi = {
  getAll: () => fetchApi<import("@/types").PersonalMuseo[]>("/personal"),
  getById: (id: number) => fetchApi<import("@/types").PersonalMuseo>(`/personal/${id}`),
  create: (personal: Omit<import("@/types").PersonalMuseo, "idPersonal">) =>
    fetchApi<import("@/types").PersonalMuseo>("/personal", {
      method: "POST",
      body: JSON.stringify(personal),
    }),
  update: (id: number, personal: Partial<import("@/types").PersonalMuseo>) =>
    fetchApi<import("@/types").PersonalMuseo>(`/personal/${id}`, {
      method: "PUT",
      body: JSON.stringify(personal),
    }),
  delete: (id: number) =>
    fetchApi<void>(`/personal/${id}`, { method: "DELETE" }),
};
