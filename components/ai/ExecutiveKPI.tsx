'use client'

import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react'

interface ExecutiveKPIProps {
  label: string
  value: string | number
  change: number
  unit?: string
  status: 'on-target' | 'at-risk' | 'critical'
  icon?: React.ReactNode
}

export function ExecutiveKPI({
  label,
  value,
  change,
  unit,
  status,
  icon,
}: ExecutiveKPIProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'on-target':
        return 'border-green-200 bg-green-50'
      case 'at-risk':
        return 'border-yellow-200 bg-yellow-50'
      default:
        return 'border-red-200 bg-red-50'
    }
  }

  const getChangeIcon = () => {
    if (change > 0) return <ArrowUpRight className="h-4 w-4 text-green-600" />
    if (change < 0) return <ArrowDownRight className="h-4 w-4 text-red-600" />
    return <Minus className="h-4 w-4 text-gray-600" />
  }

  const getChangeColor = () => {
    if (change > 0) return 'text-green-600'
    if (change < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  return (
    <div className={`rounded-lg border p-4 ${getStatusColor()}`}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        {icon}
      </div>
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-2xl font-bold text-foreground">
            {value}
            {unit && <span className="text-lg font-medium text-muted-foreground ml-1">{unit}</span>}
          </p>
        </div>
        <div className={`flex items-center gap-1 ${getChangeColor()}`}>
          {getChangeIcon()}
          <span className="text-sm font-semibold">{Math.abs(change)}%</span>
        </div>
      </div>
    </div>
  )
}
