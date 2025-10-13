"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Calendar, Clock } from "lucide-react"

interface CalendarEvent {
  id: string
  title: string
  time: string
  patient?: string
  practitioner?: string
  therapy: string
  status: "available" | "booked" | "pending" | "completed"
  date: string
}

const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Abhyanga Session",
    time: "9:00 AM",
    patient: "Sarah Johnson",
    practitioner: "Dr. Priya Sharma",
    therapy: "Abhyanga",
    status: "booked",
    date: "2024-12-25",
  },
  {
    id: "2",
    title: "Available Slot",
    time: "11:00 AM",
    therapy: "Shirodhara",
    practitioner: "Dr. Priya Sharma",
    status: "available",
    date: "2024-12-25",
  },
  {
    id: "3",
    title: "Consultation",
    time: "2:00 PM",
    patient: "Michael Chen",
    practitioner: "Dr. Raj Patel",
    therapy: "Consultation",
    status: "pending",
    date: "2024-12-25",
  },
  {
    id: "4",
    title: "Nasya Therapy",
    time: "4:00 PM",
    patient: "Emily Davis",
    practitioner: "Dr. Priya Sharma",
    therapy: "Nasya",
    status: "booked",
    date: "2024-12-26",
  },
]

interface CalendarViewProps {
  userType: "patient" | "practitioner"
  onBookSlot?: (event: CalendarEvent) => void
}

export function CalendarView({ userType, onBookSlot }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 11, 25)) // December 25, 2024
  const [selectedDate, setSelectedDate] = useState<string>("2024-12-25")

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const formatDate = (day: number) => {
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, "0")
    const dayStr = String(day).padStart(2, "0")
    return `${year}-${month}-${dayStr}`
  }

  const getEventsForDate = (date: string) => {
    return mockEvents.filter((event) => event.date === date)
  }

  const selectedDateEvents = getEventsForDate(selectedDate)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Calendar */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 mb-4">
            {dayNames.map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for days before the first day of the month */}
            {Array.from({ length: firstDayOfMonth }, (_, i) => (
              <div key={`empty-${i}`} className="p-2 h-12" />
            ))}

            {/* Days of the month */}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1
              const dateStr = formatDate(day)
              const hasEvents = getEventsForDate(dateStr).length > 0
              const isSelected = dateStr === selectedDate

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`
                    p-2 h-12 text-sm rounded-lg transition-colors relative
                    ${
                      isSelected
                        ? "bg-primary text-white"
                        : hasEvents
                          ? "bg-primary/10 text-primary hover:bg-primary/20"
                          : "hover:bg-surface"
                    }
                  `}
                >
                  {day}
                  {hasEvents && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-current rounded-full" />
                  )}
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Selected Date Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            {new Date(selectedDate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </CardTitle>
          <CardDescription>
            {selectedDateEvents.length > 0
              ? `${selectedDateEvents.length} session${selectedDateEvents.length > 1 ? "s" : ""} scheduled`
              : "No sessions scheduled"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {selectedDateEvents.length > 0 ? (
              selectedDateEvents.map((event) => (
                <div key={event.id} className="p-4 bg-surface rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground">{event.title}</h4>
                    <Badge
                      variant={
                        event.status === "available"
                          ? "outline"
                          : event.status === "booked"
                            ? "default"
                            : event.status === "pending"
                              ? "secondary"
                              : "outline"
                      }
                    >
                      {event.status}
                    </Badge>
                  </div>

                  <div className="space-y-1 text-sm text-muted-foreground mb-3">
                    <p>Time: {event.time}</p>
                    <p>Therapy: {event.therapy}</p>
                    {event.patient && <p>Patient: {event.patient}</p>}
                    {event.practitioner && <p>Practitioner: {event.practitioner}</p>}
                  </div>

                  {userType === "patient" && event.status === "available" && (
                    <Button size="sm" className="btn-gradient text-white" onClick={() => onBookSlot?.(event)}>
                      Book This Slot
                    </Button>
                  )}

                  {userType === "practitioner" && event.status === "pending" && (
                    <div className="flex gap-2">
                      <Button size="sm" className="btn-gradient text-white">
                        Approve
                      </Button>
                      <Button size="sm" variant="outline">
                        Decline
                      </Button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No sessions scheduled for this date</p>
                {userType === "practitioner" && (
                  <Button className="mt-4 btn-gradient text-white">Add Available Slot</Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
