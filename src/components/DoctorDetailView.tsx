import { Doctor } from '../types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card"

interface DoctorDetailViewProps {
  doctor: Doctor
}

export default function DoctorDetailView({ doctor }: DoctorDetailViewProps) {
  return (
    <Card className="bg-white border-blue-200 border-2">
      <CardHeader>
        <CardTitle className="text-blue-800">{doctor.name}</CardTitle>
        <CardDescription className="text-blue-600">{doctor.specialty}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="profile">
          <TabsList className="grid w-full grid-cols-4 bg-blue-100">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="specialty">Specialty</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <p className="text-sm">Short bio, education, and experience details go here.</p>
          </TabsContent>
          <TabsContent value="specialty">
            <p className="text-sm">Details of specialties and services offered go here.</p>
          </TabsContent>
          <TabsContent value="availability">
            <p className="text-sm">Available hours and appointment scheduling options go here.</p>
          </TabsContent>
          <TabsContent value="reviews">
            <p className="text-sm">Patient reviews and ratings go here.</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

