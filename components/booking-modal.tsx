"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (bookingData: any) => void
  selectedSlot?: {
    time: string
    date: string
    therapy: string
    practitioner: string
  }
}

export function BookingModal({ isOpen, onClose, onConfirm, selectedSlot }: BookingModalProps) {
  const [formData, setFormData] = useState({
    patientName: "Sarah Johnson", // Pre-filled for logged-in user
    contactNumber: "",
    email: "sarah.j@email.com", // Pre-filled for logged-in user
    specialRequests: "",
    therapyType: selectedSlot?.therapy || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onConfirm({
      ...formData,
      slot: selectedSlot,
      bookingDate: new Date().toISOString(),
      status: "pending",
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Book Therapy Session</DialogTitle>
          <DialogDescription>
            Confirm your booking details for {selectedSlot?.date} at {selectedSlot?.time}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="patientName">Patient Name</Label>
            <Input
              id="patientName"
              value={formData.patientName}
              onChange={(e) => setFormData((prev) => ({ ...prev, patientName: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input
              id="contactNumber"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.contactNumber}
              onChange={(e) => setFormData((prev) => ({ ...prev, contactNumber: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="therapyType">Therapy Type</Label>
            <Select
              value={formData.therapyType}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, therapyType: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select therapy type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Abhyanga">Abhyanga (Oil Massage)</SelectItem>
                <SelectItem value="Shirodhara">Shirodhara</SelectItem>
                <SelectItem value="Consultation">Panchakarma Consultation</SelectItem>
                <SelectItem value="Nasya">Nasya Therapy</SelectItem>
                <SelectItem value="Basti">Basti Treatment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
            <Textarea
              id="specialRequests"
              placeholder="Any specific requirements or health conditions we should know about..."
              value={formData.specialRequests}
              onChange={(e) => setFormData((prev) => ({ ...prev, specialRequests: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="bg-surface p-4 rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Booking Summary</h4>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>Date: {selectedSlot?.date}</p>
              <p>Time: {selectedSlot?.time}</p>
              <p>Therapy: {formData.therapyType}</p>
              <p>Practitioner: {selectedSlot?.practitioner}</p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 btn-gradient text-white">
              Confirm Booking
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
