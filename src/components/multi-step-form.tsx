import React, { useState, ReactNode } from 'react'
import { Button } from "./ui/button"
import { ProgressBar } from './progress-bar'

interface MultiStepFormProps {
  children: ReactNode[]
  onSubmit: () => void
  steps: string[]
}

export function MultiStepForm({ children, onSubmit, steps }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const next = () => {
    if (currentStep < children.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isLastStep = currentStep === children.length - 1

  return (
    <div>
      <ProgressBar steps={steps} currentStep={currentStep} />
      {children[currentStep]}
      <div className="mt-6 flex justify-between">
        {currentStep > 0 && (
          <Button onClick={prev} variant="outline">Previous</Button>
        )}
        {!isLastStep ? (
          <Button onClick={next}>Next</Button>
        ) : (
          <Button onClick={onSubmit}>Generate Report</Button>
        )}
      </div>
    </div>
  )
}

