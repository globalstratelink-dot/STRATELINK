"use client"

import React, { createContext, useCallback, useContext, useState } from "react"
import {
  INITIAL_QUALIFICATION_FORM,
  type QualificationFormData,
  type FormStep,
  FORM_STEPS,
} from "@/lib/qualification-form-data"

interface QualificationFormContextType {
  isOpen: boolean
  step: FormStep
  stepIndex: number
  form: QualificationFormData
  openForm: () => void
  closeForm: () => void
  setStep: (step: FormStep) => void
  nextStep: () => void
  prevStep: () => void
  updateForm: (patch: Partial<QualificationFormData>) => void
  resetForm: () => void
}

const QualificationFormContext = createContext<QualificationFormContextType | undefined>(undefined)

export function QualificationFormProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStepState] = useState<FormStep>("identity")
  const [form, setForm] = useState<QualificationFormData>(INITIAL_QUALIFICATION_FORM)

  const stepIndex = FORM_STEPS.indexOf(step)

  const openForm = useCallback(() => {
    setIsOpen(true)
    setStepState("identity")
  }, [])

  const closeForm = useCallback(() => {
    setIsOpen(false)
  }, [])

  const resetForm = useCallback(() => {
    setForm(INITIAL_QUALIFICATION_FORM)
    setStepState("identity")
  }, [])

  const setStep = useCallback((s: FormStep) => {
    setStepState(s)
  }, [])

  const nextStep = useCallback(() => {
    setStepState((current) => {
      const idx = FORM_STEPS.indexOf(current)
      return idx < FORM_STEPS.length - 1 ? FORM_STEPS[idx + 1] : current
    })
  }, [])

  const prevStep = useCallback(() => {
    setStepState((current) => {
      const idx = FORM_STEPS.indexOf(current)
      return idx > 0 ? FORM_STEPS[idx - 1] : current
    })
  }, [])

  const updateForm = useCallback((patch: Partial<QualificationFormData>) => {
    setForm((prev) => ({ ...prev, ...patch }))
  }, [])

  return (
    <QualificationFormContext.Provider
      value={{
        isOpen,
        step,
        stepIndex,
        form,
        openForm,
        closeForm,
        setStep,
        nextStep,
        prevStep,
        updateForm,
        resetForm,
      }}
    >
      {children}
    </QualificationFormContext.Provider>
  )
}

export function useQualificationForm() {
  const context = useContext(QualificationFormContext)
  if (!context) {
    throw new Error("useQualificationForm must be used within QualificationFormProvider")
  }
  return context
}
