import { useState, useEffect } from 'react'
import { InfrastructureService } from '../services/infrastructure.service'
import { ParkingZone, EnergyUsage, WaterUsage, SewageUsage } from '../types/infrastructure'

export function useInfrastructure() {
  const [parking, setParking] = useState<ParkingZone[]>([])
  const [energy, setEnergy] = useState<EnergyUsage[]>([])
  const [water, setWater] = useState<WaterUsage[]>([])
  const [sewage, setSewage] = useState<SewageUsage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const [pData, eData, wData, sData] = await Promise.all([
          InfrastructureService.getParkingZones(),
          InfrastructureService.getEnergyUsage(),
          InfrastructureService.getWaterUsage(),
          InfrastructureService.getSewageUsage(),
        ])
        setParking(pData)
        setEnergy(eData)
        setWater(wData)
        setSewage(sData)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  return { parking, energy, water, sewage, loading, error }
}
