import { Hospital } from '../types'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { MapPin, Info } from 'lucide-react'

interface HospitalListProps {
  hospitals: Hospital[]
  onSelectHospital: (hospital: Hospital) => void
}

export default function HospitalList({ hospitals, onSelectHospital }: HospitalListProps) {
  if (hospitals.length === 0) {
    return <div className="text-center text-gray-500 mt-4">No hospitals found</div>
  }

  return (
    <div className="space-y-4">
      {hospitals.map((hospital) => (
        <Card key={hospital.id} className="bg-white border-blue-200 border-2">
          <CardHeader>
            <CardTitle className="text-blue-800">{hospital.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">{hospital.address}</p>
            <p className="text-sm font-medium mb-4">Rating: {hospital.rating}/5</p>
            <div className="flex space-x-2">
              <Button variant="default" size="sm" onClick={() => onSelectHospital(hospital)}>
                <Info className="mr-2 h-4 w-4" />
                View Details
              </Button>
              <Button variant="outline" size="sm">
                <MapPin className="mr-2 h-4 w-4" />
                View on Map
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

