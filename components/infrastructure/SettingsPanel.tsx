'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface SettingOption {
  id: string
  label: string
  description?: string
  type: 'toggle' | 'select'
  value?: boolean | string
  options?: { value: string; label: string }[]
}

interface SettingsPanelProps {
  title: string
  settings: SettingOption[]
  onSettingChange?: (settingId: string, value: boolean | string) => void
}

export function SettingsPanel({ title, settings, onSettingChange }: SettingsPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {settings.map((setting) => (
          <div key={setting.id} className="flex items-start justify-between">
            <div className="space-y-1">
              <Label htmlFor={setting.id} className="text-base font-medium">
                {setting.label}
              </Label>
              {setting.description && (
                <p className="text-sm text-muted-foreground">{setting.description}</p>
              )}
            </div>
            {setting.type === 'toggle' && (
              <Switch
                id={setting.id}
                checked={Boolean(setting.value)}
                onCheckedChange={(checked) => onSettingChange?.(setting.id, checked)}
              />
            )}
            {setting.type === 'select' && setting.options && (
              <Select value={String(setting.value)} onValueChange={(val) => onSettingChange?.(setting.id, val)}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {setting.options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
