import { Doctor } from '../types'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Calendar, Info } from 'lucide-react'
import { Badge } from "./ui/badge"

interface DoctorListProps {
  doctors: Doctor[]
  onSelectDoctor: (doctor: Doctor) => void
  onBookAppointment: () => void
}

export default function DoctorList({ doctors, onSelectDoctor, onBookAppointment }: DoctorListProps) {
  if (doctors.length === 0) {
    return <div className="text-center text-gray-500 mt-4">No doctors found</div>
  }

  return (
    <div className="space-y-4">
      {doctors.map((doctor) => (
        <Card key={doctor.id} className="bg-white border-blue-200 border-2">
          <CardHeader>
            <CardTitle className="text-blue-800">{doctor.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">{doctor.specialty}</p>
            <p className="text-sm font-medium mb-2">Rating: {doctor.rating}/5</p>
            <Badge className={`mb-4 ${doctor.availability === 'Available' ? 'bg-blue-500' : ''}`} variant={doctor.availability === 'Available' ? 'default' : 'secondary'}>
              {doctor.availability}
            </Badge>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => onSelectDoctor(doctor)}>
                <Info className="mr-2 h-4 w-4" />
                View Details
              </Button>
              <Button variant="default" size="sm" onClick={onBookAppointment}>
                <Calendar className="mr-2 h-4 w-4" />
                Book Appointment
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

