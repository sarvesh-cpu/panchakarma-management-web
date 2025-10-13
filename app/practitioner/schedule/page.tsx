"use client"

import { useState } from "react"
import { PractitionerSidebar } from "@/components/practitioner-sidebar"
import { CalendarView } from "@/components/calendar-view"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Plus, Clock, Users } from "lucide-react"

const todayStats = {
  totalSessions: 4,
  completed: 1,
  upcoming: 2,
  pending: 1,
}

export default function PractitionerSchedule() {
  const [selectedView, setSelectedView] = useState<"calendar" | "list">("calendar")

  return (
    <div className="flex min-h-screen bg-background">
      <PractitionerSidebar />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Schedule Management</h1>
            <p className="text-muted-foreground">Manage your appointments and availability</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Today's Sessions</p>
                    <p className="text-2xl font-bold text-foreground">{todayStats.totalSessions}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold text-foreground">{todayStats.completed}</p>
                  </div>
                  <Clock className="w-8 h-8 text-accent" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Upcoming</p>
                    <p className="text-2xl font-bold text-foreground">{todayStats.upcoming}</p>
                  </div>
                  <Users className="w-8 h-8 text-secondary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending Approval</p>
                    <p className="text-2xl font-bold text-foreground">{todayStats.pending}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Needs Action
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex gap-4">
                  <Button className="btn-gradient text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Available Slot
                  </Button>
                  <Button variant="outline">Block Time</Button>
                  <Button variant="outline">Set Recurring Schedule</Button>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant={selectedView === "calendar" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedView("calendar")}
                  >
                    Calendar View
                  </Button>
                  <Button
                    variant={selectedView === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedView("list")}
                  >
                    List View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calendar View */}
          {selectedView === "calendar" && <CalendarView userType="practitioner" />}

          {/* List View */}
          {selectedView === "list" && (
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
                <CardDescription>All your scheduled appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-surface rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground">Sarah Johnson - Abhyanga</h4>
                      <Badge variant="default">Confirmed</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Today, 2:00 PM - 3:00 PM</p>
                  </div>

                  <div className="p-4 bg-surface rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground">Michael Chen - Consultation</h4>
                      <Badge variant="secondary">Pending</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Tomorrow, 11:00 AM - 11:30 AM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
