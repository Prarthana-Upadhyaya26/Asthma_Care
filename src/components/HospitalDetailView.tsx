import { Hospital } from '../types'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card"
import { Badge } from "./ui/badge"
import { MapPin, Phone, Clock, Star } from 'lucide-react'

interface HospitalDetailViewProps {
  hospital: Hospital
}

export default function HospitalDetailView({ hospital }: HospitalDetailViewProps) {
  return (
    <Card className="bg-white border-blue-200 border-2">
      <CardHeader>
        <CardTitle className="text-blue-800">{hospital.name}</CardTitle>
        <CardDescription className="text-blue-600 flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          {hospital.address}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center">
          <Star className="w-5 h-5 text-yellow-400 mr-1" />
          <span className="font-medium">{hospital.rating.toFixed(1)}</span>
          <span className="text-muted-foreground ml-1">/ 5</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
            <Phone className="w-4 h-4 mr-2" />
            <span>(555) 123-4567</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            <span>Open 24/7</span>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Specialties</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Emergency Care</Badge>
            <Badge variant="secondary">Surgery</Badge>
            <Badge variant="secondary">Pediatrics</Badge>
            <Badge variant="secondary">Cardiology</Badge>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">About</h3>
          <p className="text-sm text-muted-foreground">
            {hospital.name} is a leading healthcare facility providing high-quality medical services to the community. 
            With state-of-the-art equipment and a team of experienced healthcare professionals, we are committed to 
            delivering exceptional patient care.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

