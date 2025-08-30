"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="relative flex w-full items-center rounded-full border bg-muted p-1 group-data-[collapsible=icon]:hidden">
        <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme("light")}
            className={cn(
                "w-full justify-center rounded-full text-xs h-7",
                theme === "light" && "bg-background text-foreground shadow-sm"
            )}
        >
            Light
        </Button>
        <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme("dark")}
             className={cn(
                "w-full justify-center rounded-full text-xs h-7",
                theme === "dark" && "bg-card text-card-foreground shadow-sm"
            )}
        >
            Dark
        </Button>
    </div>
  )
}
