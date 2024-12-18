import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { MapPin } from 'lucide-react'

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export default function Header({ searchTerm, onSearchChange }: HeaderProps) {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center mb-6 bg-blue-100 p-4 rounded-lg">
      <h1 className="text-2xl font-bold mb-4 md:mb-0 text-blue-800">Hospital & Doctor Finder</h1>
      <div className="flex w-full md:w-auto space-x-2">
        <Input 
          className="w-full md:w-64" 
          placeholder="Search doctors or hospitals" 
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <Button variant="default">
          <MapPin className="mr-2 h-4 w-4" />
          Detect Location
        </Button>
      </div>
    </header>
  )
}

