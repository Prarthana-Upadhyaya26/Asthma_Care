'use client'

import { useState } from 'react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { CalendarIcon, ArrowLeft, CheckCircle } from 'lucide-react'
import { format } from "date-fns"
import { Calendar } from "./ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

interface AppointmentBookingFormProps {
  onBack: () => void
  onConfirm: () => void
}

export default function AppointmentBookingForm({ onBack, onConfirm }: AppointmentBookingFormProps) {
  const [date, setDate] = useState<Date>()
  const [isConfirmed, setIsConfirmed] = useState(false)

  const handleBookAppointment = () => {
    setIsConfirmed(true)
    setTimeout(() => {
      onConfirm()
    }, 3000) // Redirect after 3 seconds
  }

  if (isConfirmed) {
    return (
      <Card className="w-full max-w-4xl mx-auto bg-white border-blue-200 border-2">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-blue-800 mb-2">Appointment Confirmed!</h2>
          <p className="text-center text-gray-600 mb-4">
            Your appointment has been successfully booked. You will be redirected to the main page shortly.
          </p>
          <Button onClick={onConfirm}>Return to Main Page</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white border-blue-200 border-2">
      <CardHeader className="flex flex-row items-center">
        <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <CardTitle className="text-2xl font-bold text-blue-800">Book an Appointment</CardTitle>
          <CardDescription>Please fill out the form below to schedule your appointment.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* 1. Patient Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-blue-700">Patient Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={`w-full justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="non-binary">Non-binary</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input id="contactNumber" type="tel" placeholder="+1 (555) 000-0000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="john.doe@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" placeholder="Enter your address" />
            </div>
          </div>
        </div>

        {/* 2. Appointment Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-blue-700">Appointment Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="preferredDoctor">Preferred Doctor</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select doctor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dr-john-doe">Dr. John Doe</SelectItem>
                  <SelectItem value="dr-jane-smith">Dr. Jane Smith</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Hospital/Clinic Location</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="city-general">City General Hospital</SelectItem>
                  <SelectItem value="central-medical">Central Medical Center</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="preferredDate">Preferred Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={`w-full justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="preferredTime">Preferred Time Slot</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select time slot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="afternoon">Afternoon</SelectItem>
                  <SelectItem value="evening">Evening</SelectItem>
                  <SelectItem value="night">Night</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Type of Appointment</Label>
            <RadioGroup defaultValue="physical">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="physical" id="physical" />
                <Label htmlFor="physical">Physical Visit</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="online" id="online" />
                <Label htmlFor="online">Online Consultation (Telemedicine)</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* 3. Reason for Appointment */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-blue-700">Reason for Appointment</h3>
          <div className="space-y-2">
            <Label htmlFor="primaryConcern">Primary Concern</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select primary concern" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="routine">Routine Check-up</SelectItem>
                <SelectItem value="follow-up">Follow-up Appointment</SelectItem>
                <SelectItem value="asthma-flare">Asthma Flare-up</SelectItem>
                <SelectItem value="allergy">Allergy or Trigger Management</SelectItem>
                <SelectItem value="medication">Medication Adjustment</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Symptoms Experienced</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="shortness" />
                <label htmlFor="shortness">Shortness of breath</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="wheezing" />
                <label htmlFor="wheezing">Wheezing</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="chest-tightness" />
                <label htmlFor="chest-tightness">Chest tightness</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="cough" />
                <label htmlFor="cough">Persistent cough</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="sleep-difficulty" />
                <label htmlFor="sleep-difficulty">Difficulty sleeping due to symptoms</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="other-symptom" />
                <label htmlFor="other-symptom">Other</label>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Medical History */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-blue-700">Medical History</h3>
          <div className="space-y-2">
            <Label>Do you have a history of asthma?</Label>
            <RadioGroup defaultValue="no">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="asthma-yes" />
                <Label htmlFor="asthma-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="asthma-no" />
                <Label htmlFor="asthma-no">No</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="currentMedications">Current Asthma Medications</Label>
            <Textarea id="currentMedications" placeholder="List your current asthma medications" />
          </div>
          <div className="space-y-2">
            <Label>Known Triggers</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="allergens" />
                <label htmlFor="allergens">Allergens (e.g., pollen, dust, pet dander)</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="cold-air" />
                <label htmlFor="cold-air">Cold air or weather changes</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="exercise" />
                <label htmlFor="exercise">Exercise</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="respiratory-infections" />
                <label htmlFor="respiratory-infections">Respiratory infections</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="strong-odors" />
                <label htmlFor="strong-odors">Strong odors or fumes</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="other-trigger" />
                <label htmlFor="other-trigger">Other</label>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Have you had a recent asthma attack?</Label>
            <RadioGroup defaultValue="no">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="recent-attack-yes" />
                <Label htmlFor="recent-attack-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="recent-attack-no" />
                <Label htmlFor="recent-attack-no">No</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label>Do you have an Asthma Action Plan?</Label>
            <RadioGroup defaultValue="no">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="action-plan-yes" />
                <Label htmlFor="action-plan-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="action-plan-no" />
                <Label htmlFor="action-plan-no">No</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* 5. Additional Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-blue-700">Additional Information</h3>
          <div className="space-y-2">
            <Label>Do you need assistance with transportation to the clinic?</Label>
            <RadioGroup defaultValue="no">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="transportation-yes" />
                <Label htmlFor="transportation-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="transportation-no" />
                <Label htmlFor="transportation-no">No</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label>Do you need help with medication refills?</Label>
            <RadioGroup defaultValue="no">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="refills-yes" />
                <Label htmlFor="refills-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="refills-no" />
                <Label htmlFor="refills-no">No</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="additionalInfo">Any other concerns or additional information for the doctor?</Label>
            <Textarea id="additionalInfo" placeholder="Enter any additional information here" />
          </div>
        </div>

        {/* 6. Confirmation and Payment */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-blue-700">Confirmation and Payment</h3>
          <div className="space-y-2">
            <Label>Payment Options</Label>
            <RadioGroup defaultValue="clinic">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="clinic" id="pay-clinic" />
                <Label htmlFor="pay-clinic">Pay at the Clinic</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="online" id="pay-online" />
                <Label htmlFor="pay-online">Online Payment (Card, UPI, etc.)</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I confirm that the information provided is accurate and agree to the terms and conditions.
            </label>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleBookAppointment}>Book Appointment</Button>
      </CardFooter>
    </Card>
  )
}

