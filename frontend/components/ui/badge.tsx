import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "destructive" | "warning" | "success" | "outline";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-[hsl(var(--primary))] text-white": variant === "default",
          "bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))]": variant === "secondary",
          "bg-[hsl(var(--destructive))] text-white": variant === "destructive",
          "bg-[hsl(var(--warning))] text-black": variant === "warning",
          "bg-[hsl(var(--success))] text-white": variant === "success",
          "border border-[hsl(var(--border))] text-[hsl(var(--foreground))]": variant === "outline",
        },
        className
      )}
      {...props}
    />
  );
}
