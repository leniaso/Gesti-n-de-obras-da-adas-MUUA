"use client";

import { Bell, Search, User } from "lucide-react";

interface HeaderProps {
  title: string;
  description?: string;
}

export function Header({ title, description }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-[hsl(var(--border))] bg-[hsl(var(--card))] px-6">
      <div>
        <h1 className="text-xl font-semibold text-[hsl(var(--foreground))]">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            {description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
          <input
            type="text"
            placeholder="Buscar..."
            className="h-9 w-64 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--input))] pl-9 pr-4 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
          />
        </div>

        <button className="relative rounded-lg p-2 text-[hsl(var(--muted-foreground))] transition-colors hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground))]">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[hsl(var(--destructive))]" />
        </button>

        <button className="flex items-center gap-2 rounded-lg p-2 text-[hsl(var(--muted-foreground))] transition-colors hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground))]">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--primary))]">
            <User className="h-4 w-4 text-white" />
          </div>
        </button>
      </div>
    </header>
  );
}
