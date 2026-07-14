'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Permission {
  name: string
  create: boolean
  read: boolean
  update: boolean
  delete: boolean
}

interface PermissionMatrixProps {
  role: string
  permissions: Permission[]
}

export function PermissionMatrix({ role, permissions }: PermissionMatrixProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{role} - Permissions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Resource</TableHead>
                <TableHead className="text-center">Create</TableHead>
                <TableHead className="text-center">Read</TableHead>
                <TableHead className="text-center">Update</TableHead>
                <TableHead className="text-center">Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissions.map((perm, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{perm.name}</TableCell>
                  <TableCell className="text-center">
                    <Checkbox checked={perm.create} />
                  </TableCell>
                  <TableCell className="text-center">
                    <Checkbox checked={perm.read} />
                  </TableCell>
                  <TableCell className="text-center">
                    <Checkbox checked={perm.update} />
                  </TableCell>
                  <TableCell className="text-center">
                    <Checkbox checked={perm.delete} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
