'use client'

import { useState } from 'react'
import Header from './components/Header'
import TabView from './components/TabView'
import HospitalList from './components/HospitalList'
import DoctorList from './components/DoctorList'
import MapView from './components/MapView'
import DoctorDetailView from './components/DoctorDetailView'
import HospitalDetailView from './components/HospitalDetailView'
import AppointmentBookingForm from './components/AppointmentBookingForm'
import { Hospital, Doctor } from './types'

// Mock data
const hospitals: Hospital[] = [
  { id: 1, name: 'City General Hospital', address: '123 Main St', rating: 4.5 },
  { id: 2, name: 'Central Medical Center', address: '456 Oak Ave', rating: 4.2 },
  { id: 3, name: 'Riverside Community Hospital', address: '789 River Rd', rating: 4.7 },
  { id: 4, name: 'Sunshine Health Center', address: '321 Sunny Ln', rating: 4.0 },
]

const doctors: Doctor[] = [
  { id: 1, name: 'Dr. John Doe', specialty: 'Cardiology', rating: 4.8, availability: 'Available' },
  { id: 2, name: 'Dr. Jane Smith', specialty: 'Pediatrics', rating: 4.6, availability: 'Busy' },
  { id: 3, name: 'Dr. Mike Johnson', specialty: 'Orthopedics', rating: 4.9, availability: 'Available' },
  { id: 4, name: 'Dr. Sarah Lee', specialty: 'Dermatology', rating: 4.7, availability: 'Available' },
]

export default function Page() {
  const [activeTab, setActiveTab] = useState<'hospitals' | 'doctors'>('hospitals')
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAppointmentForm, setShowAppointmentForm] = useState(false)

  const filteredHospitals = hospitals.filter(hospital => 
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.address.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleBookAppointment = () => {
    setShowAppointmentForm(true)
  }

  const handleConfirmAppointment = () => {
    setShowAppointmentForm(false)
    setActiveTab('doctors')
  }

  const handleSelectHospital = (hospital: Hospital) => {
    setSelectedHospital(hospital)
    setSelectedDoctor(null)
  }

  const handleSelectDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor)
    setSelectedHospital(null)
  }

  return (
    <div className="container mx-auto p-4 min-h-screen bg-blue-50">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      {!showAppointmentForm && (
        <TabView 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          tabs={['hospitals', 'doctors']}
        />
      )}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          {showAppointmentForm ? (
            <AppointmentBookingForm 
              onBack={() => setShowAppointmentForm(false)}
              onConfirm={handleConfirmAppointment}
            />
          ) : (
            <>
              {activeTab === 'hospitals' && (
                <HospitalList 
                  hospitals={filteredHospitals} 
                  onSelectHospital={handleSelectHospital}
                />
              )}
              {activeTab === 'doctors' && (
                <DoctorList 
                  doctors={filteredDoctors} 
                  onSelectDoctor={handleSelectDoctor}
                  onBookAppointment={handleBookAppointment}
                />
              )}
            </>
          )}
        </div>
        <div>
          {selectedHospital && !showAppointmentForm ? (
            <HospitalDetailView hospital={selectedHospital} />
          ) : selectedDoctor && !showAppointmentForm ? (
            <DoctorDetailView doctor={selectedDoctor} />
          ) : (
            <MapView hospitals={filteredHospitals} doctors={filteredDoctors} />
          )}
        </div>
      </div>
    </div>
  )
}

