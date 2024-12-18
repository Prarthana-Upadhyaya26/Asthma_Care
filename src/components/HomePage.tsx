import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700">Asthma Care</h1>
        <div className="space-x-2">
          <Button variant="outline" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-800 mb-4">Welcome to Asthma Care</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your trusted platform for comprehensive asthma diagnosis and management. 
            Choose your path below to get started.
          </p>
        </section>

        <div className="flex justify-center">
          <Tabs defaultValue="patient" className="w-full max-w-3xl">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="doctor">For Doctors</TabsTrigger>
              <TabsTrigger value="patient">For Patients</TabsTrigger>
            </TabsList>
            <TabsContent value="doctor" className="mt-6 p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-blue-700 mb-4">Doctor's Portal</h3>
              <p className="text-gray-600 mb-4">
                Access your patient records, manage appointments, and collaborate with other healthcare professionals.
              </p>
              <Button className="w-full"><Link to="/doctor">Discover Doctor</Link></Button>
            </TabsContent>
            <TabsContent value="patient" className="mt-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-blue-700 mb-4">Patient's Assessment</h3>
                <p className="text-gray-600 mb-4">
                  Take our comprehensive asthma diagnosis questionnaire to help us understand your symptoms and provide better care.
                </p>
                <Button asChild className="w-full">
                  <Link to="/asthma-diagnosis">Start Assessment</Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="bg-blue-800 text-white py-4 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Asthma Care. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
