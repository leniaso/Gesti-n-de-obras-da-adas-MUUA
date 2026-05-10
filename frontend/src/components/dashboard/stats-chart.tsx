"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

const chartData = [
  { estado: "Bueno", cantidad: 98, fill: "var(--color-bueno)" },
  { estado: "Regular", cantidad: 35, fill: "var(--color-regular)" },
  { estado: "Malo", cantidad: 15, fill: "var(--color-malo)" },
  { estado: "En Restauración", cantidad: 8, fill: "var(--color-restauracion)" },
];

const chartConfig = {
  cantidad: {
    label: "Cantidad",
  },
  bueno: {
    label: "Bueno",
    color: "hsl(142, 76%, 36%)",
  },
  regular: {
    label: "Regular",
    color: "hsl(45, 93%, 47%)",
  },
  malo: {
    label: "Malo",
    color: "hsl(0, 84%, 60%)",
  },
  restauracion: {
    label: "En Restauración",
    color: "hsl(199, 89%, 48%)",
  },
} satisfies ChartConfig;

export function StatsChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <BarChart
        accessibilityLayer
        data={chartData}
        layout="vertical"
        margin={{
          left: 20,
        }}
      >
        <YAxis
          dataKey="estado"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <XAxis dataKey="cantidad" type="number" hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="cantidad" radius={5} />
      </BarChart>
    </ChartContainer>
  );
}
