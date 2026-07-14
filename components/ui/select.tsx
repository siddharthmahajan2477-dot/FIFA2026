import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, Check } from "lucide-react"

const SelectContext = React.createContext<{
  value?: string
  onValueChange?: (value: string) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
} | null>(null)

export function Select({
  children,
  value,
  onValueChange
}: {
  children: React.ReactNode
  value?: string
  onValueChange?: (value: string) => void
}) {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <SelectContext.Provider value={{ value, onValueChange, isOpen, setIsOpen }}>
      <div className="relative inline-block text-left w-full">{children}</div>
    </SelectContext.Provider>
  )
}

export function SelectTrigger({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = React.useContext(SelectContext)
  if (!context) throw new Error("SelectTrigger must be used inside Select")
  
  // Find the selected child label to show as trigger text
  const childrenArray = React.Children.toArray(children)
  const isSelectValue = childrenArray.some(
    (child) => React.isValidElement(child) && (child.type as any).name === "SelectValue"
  )

  return (
    <button
      type="button"
      onClick={() => context.setIsOpen(!context.isOpen)}
      className={cn(
        "flex h-9 w-full items-center justify-between rounded-lg border border-border bg-card px-3 py-2 text-xs text-foreground shadow-sm hover:bg-white/5 transition-colors focus:outline-none focus:ring-1 focus:ring-primary",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50 ml-2" />
    </button>
  )
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const context = React.useContext(SelectContext)
  if (!context) throw new Error("SelectValue must be used inside Select")
  return <span>{context.value || placeholder || "Select..."}</span>
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  const context = React.useContext(SelectContext)
  const contentRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
        context?.setIsOpen(false)
      }
    }
    if (context?.isOpen) {
      document.addEventListener("mousedown", handleOutsideClick)
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [context?.isOpen, context])

  if (!context || !context.isOpen) return null

  return (
    <div
      ref={contentRef}
      className="absolute right-0 mt-1 w-full min-w-[8rem] rounded-xl border border-white/15 bg-slate-950/95 backdrop-blur-[24px] shadow-[0_12px_32px_rgba(0,0,0,0.6)] p-1.5 z-50 flex flex-col gap-0.5 animate-fadeIn"
    >
      {children}
    </div>
  )
}

export function SelectItem({
  value,
  children,
  className,
  ...props
}: {
  value: string
  children: React.ReactNode
  className?: string
}) {
  const context = React.useContext(SelectContext)
  if (!context) throw new Error("SelectItem must be used inside Select")
  const isSelected = context.value === value

  const handleSelect = () => {
    context.onValueChange?.(value)
    context.setIsOpen(false)
  }

  return (
    <button
      type="button"
      onClick={handleSelect}
      className={cn(
        "w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between",
        isSelected 
          ? "bg-white/10 text-white font-medium" 
          : "text-slate-400 hover:text-white hover:bg-white/5",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {isSelected && <Check className="h-3.5 w-3.5 text-primary" />}
    </button>
  )
}
