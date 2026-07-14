import * as React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface CheckboxProps {
  id?: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  className?: string
  disabled?: boolean
}

export function Checkbox({ id, checked = false, onCheckedChange, className, disabled = false }: CheckboxProps) {
  return (
    <button
      type="button"
      id={id}
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onCheckedChange?.(!checked)}
      className={cn(
        "peer h-4 w-4 shrink-0 rounded border border-border bg-card shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 inline-flex items-center justify-center text-current transition-colors",
        checked ? "bg-primary border-primary text-primary-foreground" : "",
        className
      )}
    >
      {checked && <Check className="h-3 w-3 stroke-[3]" />}
    </button>
  )
}
