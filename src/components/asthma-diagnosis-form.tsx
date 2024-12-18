import { useState } from 'react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Textarea } from "./ui/textarea"
import { Checkbox } from "./ui/checkbox"
import { MultiStepForm } from './multi-step-form'
import { generateReport } from '../app/actions/generate-report'
import { AIReport } from './ai-report'

const formSteps = [
  "Personal Information",
  "Medical History",
  "Symptoms",
  "Triggers and Lifestyle",
  "Current Management",
  "Diagnostic History",
  "Environment and Home Setup",
  "Recent Experiences",
  "Psychosocial Factors",
  "AI-Generated Report"
]

export default function AsthmaForm() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormData>({})
  const [aiReport, setAIReport] = useState('')

  const handleSubmit = async () => {
    const report = await generateReport(formData)
    setAIReport(report)
    setSubmitted(true)
  }

  // Define a more specific interface for form data
  interface FormData {
    [key: string]: string | boolean | undefined;
  }

  // Create a more precise type for onChange prop
  interface OnChangeProps {
    onChange: (data: Partial<FormData>) => void;
  }

  const handleFormChange = (newData: Partial<FormData>) => {
    setFormData((prevData) => ({ ...prevData, ...newData }))
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full mx-auto">
        <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">Your Asthma Assessment Report</h2>
        <AIReport report={aiReport} />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full mx-auto">
      <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">Asthma Diagnosis Questionnaire</h2>
      <MultiStepForm onSubmit={handleSubmit} steps={formSteps}>
          <PersonalInformation onChange={handleFormChange} />
          <MedicalHistory onChange={handleFormChange} />
          <Symptoms onChange={handleFormChange} />
          <TriggersAndLifestyle onChange={handleFormChange} />
          <CurrentManagement onChange={handleFormChange} />
          <DiagnosticHistory onChange={handleFormChange} />
          <EnvironmentAndHomeSetup onChange={handleFormChange} />
          <RecentExperiences onChange={handleFormChange} />
          <PsychosocialFactors onChange={handleFormChange} />
          <AIReportStep />
        </MultiStepForm>
      </div>
  )
}

function PersonalInformation({ onChange }: { onChange: (data: any) => void }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ [e.target.id]: e.target.value })
  }
  
  const handleRadioChange = (value: string, id: string) => {
    onChange({ [id]: value })
  }
  
  // For Checkbox
  const handleCheckboxChange = (id: string, checked: boolean) => {
    onChange({ [id]: checked })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-blue-600">Personal Information</h2>
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" required onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="dob">Date of Birth</Label>
        <Input id="dob" type="date" required onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="gender">Gender</Label>
        <Input id="gender" required onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="contact">Contact Number</Label>
        <Input id="contact" type="tel" required onChange={handleChange} />
      </div>
    </div>
  )
}

function MedicalHistory({ onChange }: { onChange: (data: any) => void }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ [e.target.id]: e.target.value })
  }
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ [e.target.id]: e.target.value })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-blue-600">Medical History</h2>
      <div>
        <Label htmlFor="asthma-diagnosis">Have you been diagnosed with asthma before? If yes, how long ago?</Label>
        <Input id="asthma-diagnosis" onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="respiratory-conditions">Any history of other respiratory conditions (e.g., COPD, bronchitis)?</Label>
        <Input id="respiratory-conditions" onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="family-history">Family history of asthma, allergies, or other respiratory conditions?</Label>
        <Input id="family-history" onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="hospitalization">Have you been hospitalized for breathing problems or asthma?</Label>
        <RadioGroup onChange={handleRadioChange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="hospitalization-yes" />
            <Label htmlFor="hospitalization-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="hospitalization-no" />
            <Label htmlFor="hospitalization-no">No</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

function Symptoms({ onChange }: { onChange: (data: any) => void }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ [e.target.id]: e.target.value })
  }
  const handleRadioChange = (value: string, id: string) => {
    onChange({ [id]: value })
  }
  
  const handleCheckboxChange = (id: string, checked: boolean | 'indeterminate') => {
    // Convert to boolean if needed
    const isChecked = checked === true;
    onChange({ [id]: isChecked });
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-blue-600">Symptoms</h2>
      <div>
        <Label>Do you experience any of the following symptoms:</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="shortness-of-breath" onCheckedChange={(checked) => handleCheckboxChange("shortness-of-breath", !!checked)} />
            <Label htmlFor="shortness-of-breath">Shortness of breath</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="wheezing" onCheckedChange={(checked) => handleCheckboxChange("wheezing", !!checked)} />
            <Label htmlFor="wheezing">Wheezing</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="chest-tightness" onCheckedChange={(checked) => handleCheckboxChange("chest-tightness", !!checked)} />
            <Label htmlFor="chest-tightness">Chest tightness</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="frequent-coughing" onCheckedChange={(checked) => handleCheckboxChange("frequent-coughing", !!checked)} />
            <Label htmlFor="frequent-coughing">Frequent coughing (especially at night or early morning)</Label>
          </div>
        </div>
      </div>
      <div>
        <Label htmlFor="symptom-frequency">How often do these symptoms occur?</Label>
        <Input id="symptom-frequency" placeholder="e.g., daily, weekly, rarely" onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="symptom-triggers">Are the symptoms triggered by specific activities or environments?</Label>
        <Input id="symptom-triggers" placeholder="e.g., exercise, allergens, weather changes" onChange={handleChange} />
      </div>
    </div>
  )
}

function TriggersAndLifestyle({ onChange }: { onChange: (data: any) => void }) {
  const handleCheckboxChange = (id: string, checked: boolean | 'indeterminate') => {
    // Convert to boolean if needed
    const isChecked = checked === true;
    onChange({ [id]: isChecked });
  }
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ [e.target.id]: e.target.value })
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ [e.target.id]: e.target.value })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-blue-600">Triggers and Lifestyle</h2>
      <div>
        <Label>Are you exposed to allergens?</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="dust" onCheckedChange={(checked) => handleCheckboxChange("dust", !!checked)} />
            <Label htmlFor="dust">Dust</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="pollen" onCheckedChange={(checked) => handleCheckboxChange("pollen", !!checked)} />
            <Label htmlFor="pollen">Pollen</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="pet-dander" onCheckedChange={(checked) => handleCheckboxChange("pent-dander", !!checked)} />
            <Label htmlFor="pet-dander">Pet dander</Label>
          </div>
        </div>
      </div>
      <div>
        <Label>Do you smoke or are you exposed to secondhand smoke?</Label>
        <RadioGroup onChange={handleRadioChange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="smoke-yes" />
            <Label htmlFor="smoke-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="smoke-no" />
            <Label htmlFor="smoke-no">No</Label>
          </div>
        </RadioGroup>
      </div>
      <div>
        <Label>Do strong odors, fumes, or air pollution worsen your symptoms?</Label>
        <RadioGroup onChange={handleRadioChange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="pollution-yes" />
            <Label htmlFor="pollution-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="pollution-no" />
            <Label htmlFor="pollution-no">No</Label>
          </div>
        </RadioGroup>
      </div>
      <div>
        <Label htmlFor="recent-illness">Any recent history of respiratory infections or illnesses?</Label>
        <Input id="recent-illness" onChange={handleChange} />
      </div>
    </div>
  )
}

function CurrentManagement({ onChange }: { onChange: (data: any) => void }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange({ [e.target.id]: e.target.value })
  }
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ [e.target.id]: e.target.value })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-blue-600">Current Management</h2>
      <div>
        <Label htmlFor="medications">Are you using any inhalers, medications, or nebulizers? If yes, list them.</Label>
        <Textarea id="medications" onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="rescue-inhaler-frequency">How often do you use rescue inhalers?</Label>
        <Input id="rescue-inhaler-frequency" onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="er-visits">Have you visited an ER due to breathing issues? If yes, how often?</Label>
        <Input id="er-visits" onChange={handleChange} />
      </div>
      <div>
        <Label>Do you have an asthma action plan?</Label>
        <RadioGroup onChange={handleRadioChange}>
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
  )
}

function DiagnosticHistory({ onChange }: { onChange: (data: any) => void }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange({ [e.target.id]: e.target.value })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-blue-600">Diagnostic History</h2>
      <div>
        <Label htmlFor="lung-function-tests">Have you undergone lung function tests (e.g., spirometry)? If yes, when?</Label>
        <Input id="lung-function-tests" onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="allergy-tests">Have you had allergy tests? If yes, list allergens.</Label>
        <Textarea id="allergy-tests" onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="peak-flow">Have you used a peak flow meter? If yes, what were the readings?</Label>
        <Input id="peak-flow" onChange={handleChange} />
      </div>
    </div>
  )
}

function EnvironmentAndHomeSetup({ onChange }: { onChange: (data: any) => void }) {
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ [e.target.id]: e.target.value })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-blue-600">Environment and Home Setup</h2>
      <div>
        <Label>Do you use air purifiers or humidifiers?</Label>
        <RadioGroup onChange={handleRadioChange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="purifiers-yes" />
            <Label htmlFor="purifiers-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="purifiers-no" />
            <Label htmlFor="purifiers-no">No</Label>
          </div>
        </RadioGroup>
      </div>
      <div>
        <Label>Is your home free of mold or dampness?</Label>
        <RadioGroup onChange={handleRadioChange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="mold-free-yes" />
            <Label htmlFor="mold-free-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="mold-free-no" />
            <Label htmlFor="mold-free-no">No</Label>
          </div>
        </RadioGroup>
      </div>
      <div>
        <Label>Are there pets at home?</Label>
        <RadioGroup onChange={handleRadioChange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="pets-yes" />
            <Label htmlFor="pets-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="pets-no" />
            <Label htmlFor="pets-no">No</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

function RecentExperiences({ onChange }: { onChange: (data: any) => void }) {
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ [e.target.id]: e.target.value })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-blue-600">Recent Experiences</h2>
      <div>
        <Label>Have your symptoms worsened recently?</Label>
        <RadioGroup onChange={handleRadioChange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="worsened-yes" />
            <Label htmlFor="worsened-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="worsened-no" />
            <Label htmlFor="worsened-no">No</Label>
          </div>
        </RadioGroup>
      </div>
      <div>
        <Label>Have you experienced severe asthma attacks?</Label>
        <RadioGroup onChange={handleRadioChange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="severe-attacks-yes" />
            <Label htmlFor="severe-attacks-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="severe-attacks-no" />
            <Label htmlFor="severe-attacks-no">No</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

function PsychosocialFactors({ onChange }: { onChange: (data: any) => void }) {
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ [e.target.id]: e.target.value })
  }
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange({ [e.target.id]: e.target.value })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-blue-600">Psychosocial Factors</h2>
      <div>
        <Label>Do you feel stressed or anxious about your symptoms?</Label>
        <RadioGroup onChange={handleRadioChange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="stressed-yes" />
            <Label htmlFor="stressed-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="stressed-no" />
            <Label htmlFor="stressed-no">No</Label>
          </div>
        </RadioGroup>
      </div>
      <div>
        <Label htmlFor="impact-daily-life">How do your symptoms impact daily life (work, school, exercise)?</Label>
        <Textarea id="impact-daily-life" onChange={handleChange} />
      </div>
    </div>
  )
}

function AIReportStep() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-blue-600">AI-Generated Report</h2>
      <p>Click "Submit" to generate your personalized asthma diagnosis report using AI.</p>
    </div>
  )
}

