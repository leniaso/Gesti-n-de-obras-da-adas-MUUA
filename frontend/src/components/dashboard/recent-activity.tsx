"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const activities = [
  {
    id: 1,
    user: "María García",
    action: "registró deterioro en",
    target: "Retrato Colonial #45",
    time: "hace 2 horas",
    type: "deterioro",
  },
  {
    id: 2,
    user: "Carlos Pérez",
    action: "inició restauración de",
    target: "Paisaje Antioqueño",
    time: "hace 5 horas",
    type: "restauracion",
  },
  {
    id: 3,
    user: "Ana Rodríguez",
    action: "completó restauración de",
    target: "Escultura Precolombina",
    time: "hace 1 día",
    type: "completado",
  },
  {
    id: 4,
    user: "Juan Martínez",
    action: "agregó nueva obra",
    target: "Mural Contemporáneo",
    time: "hace 2 días",
    type: "nuevo",
  },
  {
    id: 5,
    user: "Laura Sánchez",
    action: "actualizó información de",
    target: "Cerámica Muisca",
    time: "hace 3 días",
    type: "actualizacion",
  },
];

const getTypeVariant = (type: string) => {
  switch (type) {
    case "deterioro":
      return "destructive";
    case "restauracion":
      return "default";
    case "completado":
      return "secondary";
    case "nuevo":
      return "outline";
    default:
      return "secondary";
  }
};

const getTypeLabel = (type: string) => {
  switch (type) {
    case "deterioro":
      return "Deterioro";
    case "restauracion":
      return "Restauración";
    case "completado":
      return "Completado";
    case "nuevo":
      return "Nueva Obra";
    default:
      return "Actualización";
  }
};

export function RecentActivity() {
  return (
    <div className="flex flex-col gap-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <Avatar className="size-9">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {activity.user
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-col gap-1">
            <p className="text-sm">
              <span className="font-medium">{activity.user}</span>{" "}
              <span className="text-muted-foreground">{activity.action}</span>{" "}
              <span className="font-medium">{activity.target}</span>
            </p>
            <div className="flex items-center gap-2">
              <Badge variant={getTypeVariant(activity.type) as "default" | "secondary" | "destructive" | "outline"}>
                {getTypeLabel(activity.type)}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {activity.time}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
