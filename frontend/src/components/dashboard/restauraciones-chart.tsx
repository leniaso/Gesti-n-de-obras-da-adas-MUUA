"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart, Cell } from "recharts";

const chartData = [
  { tipo: "Limpieza", cantidad: 18, fill: "#00623D" },
  { tipo: "Consolidación", cantidad: 12, fill: "#008751" },
  { tipo: "Reintegración", cantidad: 8, fill: "#34D399" },
  { tipo: "Retoque", cantidad: 5, fill: "#6EE7B7" },
  { tipo: "Otro", cantidad: 2, fill: "#A7F3D0" },
];

const chartConfig = {
  cantidad: {
    label: "Cantidad",
  },
  limpieza: {
    label: "Limpieza",
    color: "#00623D",
  },
  consolidacion: {
    label: "Consolidación",
    color: "#008751",
  },
  reintegracion: {
    label: "Reintegración",
    color: "#34D399",
  },
  retoque: {
    label: "Retoque",
    color: "#6EE7B7",
  },
  otro: {
    label: "Otro",
    color: "#A7F3D0",
  },
} satisfies ChartConfig;

export function RestauracionesChart() {
  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="cantidad"
          nameKey="tipo"
          innerRadius={60}
          strokeWidth={5}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
