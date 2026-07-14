import { StatusBadge } from './StatusBadge'

interface StaffMember {
  id: string
  name: string
  role: string
  area: string
  status: 'active' | 'idle' | 'offline'
  lastUpdate: string
}

interface StaffTableProps {
  staff: StaffMember[]
  onSelectStaff?: (staff: StaffMember) => void
}

export function StaffTable({ staff, onSelectStaff }: StaffTableProps) {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Name</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Role</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Area</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Last Update</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {staff.map((member) => (
              <tr
                key={member.id}
                onClick={() => onSelectStaff?.(member)}
                className={`transition-colors ${onSelectStaff ? 'cursor-pointer hover:bg-muted/50' : ''}`}
              >
                <td className="px-4 py-3 font-medium text-foreground">{member.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{member.role}</td>
                <td className="px-4 py-3 text-muted-foreground">{member.area}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={member.status} size="sm" />
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{member.lastUpdate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
