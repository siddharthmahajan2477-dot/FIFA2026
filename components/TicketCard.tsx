import React from 'react'
import { QrCode, Download, Share2 } from 'lucide-react'

interface TicketCardProps {
  matchTitle: string
  date: string
  time: string
  section: string
  row: string
  seat: string
  seatType?: 'VIP' | 'Premium' | 'Regular'
  price?: number
  onClick?: () => void
}

export function TicketCard({ matchTitle, date, time, section, row, seat, seatType, price, onClick }: TicketCardProps) {
  const seatTypeColors = {
    VIP: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    Premium: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    Regular: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
  }

  return (
    <div
      onClick={onClick}
      className="cursor-pointer overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-md transition-all hover:shadow-lg"
    >
      <div className="border-b border-border bg-gradient-to-r from-primary to-primary/80 p-4 text-primary-foreground">
        <h3 className="text-sm font-bold">{matchTitle}</h3>
        <p className="mt-1 text-xs opacity-90">
          {date} • {time}
        </p>
      </div>

      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Section</p>
            <p className="text-lg font-bold text-foreground">{section}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Row</p>
            <p className="text-lg font-bold text-foreground">{row}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Seat</p>
            <p className="text-lg font-bold text-foreground">{seat}</p>
          </div>
        </div>

        {(seatType || price) && (
          <div className="mb-4 flex items-center justify-between">
            {seatType && <span className={`rounded px-2 py-1 text-xs font-semibold ${seatTypeColors[seatType]}`}>{seatType}</span>}
            {price && <p className="text-sm font-bold text-primary">${price}</p>}
          </div>
        )}

        <div className="flex items-center justify-center gap-2 border-t border-border pt-3">
          <button className="flex flex-1 items-center justify-center gap-1 rounded bg-muted py-2 text-xs font-semibold text-foreground hover:bg-muted/80">
            <QrCode className="h-4 w-4" />
            QR
          </button>
          <button className="flex flex-1 items-center justify-center gap-1 rounded bg-muted py-2 text-xs font-semibold text-foreground hover:bg-muted/80">
            <Download className="h-4 w-4" />
          </button>
          <button className="flex flex-1 items-center justify-center gap-1 rounded bg-muted py-2 text-xs font-semibold text-foreground hover:bg-muted/80">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
