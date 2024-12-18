import { Hospital, Doctor } from '../types'

interface MapViewProps {
  hospitals: Hospital[]
  doctors: Doctor[]
}

export default function MapView({ hospitals, doctors }: MapViewProps) {
  return (
    <div className="bg-blue-100 h-[400px] rounded-lg flex items-center justify-center">
      <p className="text-muted-foreground">Map View Placeholder</p>
    </div>
  )
}

