"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CalendarView } from "@/components/calendar-view"
import { BookingModal } from "@/components/booking-modal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, Stethoscope } from "lucide-react"

export default function SchedulingPage() {
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<any>(null)
  const [userType, setUserType] = useState<"patient" | "practitioner">("patient")

  const handleBookSlot = (event: any) => {
    setSelectedSlot({
      time: event.time,
      date: event.date,
      therapy: event.therapy,
      practitioner: event.practitioner || "Dr. Priya Sharma",
    })
    setShowBookingModal(true)
  }

  const handleConfirmBooking = (bookingData: any) => {
    // For MVP, just show success message
    alert("Booking request submitted successfully! You will receive a confirmation email shortly.")
    console.log("Booking confirmed:", bookingData)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Schedule Your Therapy Session</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Book your personalized Panchakarma therapy sessions with our experienced practitioners
            </p>
          </div>

          {/* User Type Toggle */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant={userType === "patient" ? "default" : "outline"}
                  onClick={() => setUserType("patient")}
                  className="flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Patient View
                </Button>
                <Button
                  variant={userType === "practitioner" ? "default" : "outline"}
                  onClick={() => setUserType("practitioner")}
                  className="flex items-center gap-2"
                >
                  <Stethoscope className="w-4 h-4" />
                  Practitioner View
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                How to Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">1. Select Date</h3>
                  <p className="text-sm text-muted-foreground">Choose your preferred date from the calendar</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">2. Pick Time Slot</h3>
                  <p className="text-sm text-muted-foreground">Select from available time slots for your chosen date</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">3. Confirm Booking</h3>
                  <p className="text-sm text-muted-foreground">Fill in your details and confirm your appointment</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legend */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Session Status Legend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Available</Badge>
                  <span className="text-sm text-muted-foreground">Open for booking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="default">Booked</Badge>
                  <span className="text-sm text-muted-foreground">Confirmed appointment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Pending</Badge>
                  <span className="text-sm text-muted-foreground">Awaiting confirmation</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calendar Component */}
          <CalendarView userType={userType} onBookSlot={handleBookSlot} />

          {/* Booking Modal */}
          <BookingModal
            isOpen={showBookingModal}
            onClose={() => setShowBookingModal(false)}
            onConfirm={handleConfirmBooking}
            selectedSlot={selectedSlot}
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}
