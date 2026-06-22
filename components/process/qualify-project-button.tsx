"use client"

import { Button } from "@/components/ui/button"
import { useQualificationForm } from "@/contexts/qualification-form-context"
import { cn } from "@/lib/utils"

interface QualifyProjectButtonProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode
}

export function QualifyProjectButton({ children, className, ...props }: QualifyProjectButtonProps) {
  const { openForm } = useQualificationForm()

  return (
    <Button type="button" onClick={openForm} className={cn(className)} {...props}>
      {children}
    </Button>
  )
}
