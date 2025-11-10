// Reusable error alert component
"use client"

import { AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorAlertProps {
  error: string | null
  onDismiss?: () => void
  title?: string
}

export function ErrorAlert({ error, onDismiss, title = "Error" }: ErrorAlertProps) {
  if (!error) return null

  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <h3 className="font-semibold text-red-900">{title}</h3>
        <p className="text-red-700 text-sm mt-1">{error}</p>
      </div>
      {onDismiss && (
        <Button variant="ghost" size="sm" onClick={onDismiss} className="text-red-600 hover:text-red-700">
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  )
}
