"use client"

import { useEffect, useState } from "react"
import { PatientSidebar } from "@/components/patient-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProgressChart } from "@/components/progress-chart"
import { Calendar, Clock, Bell, TrendingUp, MessageCircle, Droplets } from "lucide-react"

interface DashboardData {
  stats: {
    totalSessions: number
    completedSessions: number
    upcomingSessions: number
    averageRating: string
  }
  upcomingSessions: Array<{
    id: number
    type_of_therapy: string
    date: string
    time: string
    practitioner_name: string
    status: string
  }>
  notifications: Array<{
    id: number
    message: string
    created_at: string
    type: string
  }>
}

export default function PatientDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null
        if (!token) {
          console.error("[v0] No auth token found")
          setLoading(false)
          return
        }

        const profileRes = await fetch("/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!profileRes.ok) {
          const errText = await profileRes.text().catch(() => "")
          console.error("[v0] Failed to fetch profile:", profileRes.status, errText)
          setLoading(false)
          return
        }
        const { user } = await profileRes.json()
        if (user?.role !== "patient") {
          console.error("[v0] Current user is not a patient")
          setLoading(false)
          return
        }

        const response = await fetch(`/api/patients/${user.id}/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (response.ok) {
          const data = await response.json()
          setDashboardData(data)
        } else {
          const err = await response.text().catch(() => "")
          console.error("[v0] Failed to fetch dashboard data:", response.status, err)
        }
      } catch (error) {
        console.error("[v0] Error fetching dashboard data:", (error as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen bg-background">
        <PatientSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-surface rounded mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-24 bg-surface rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      <PatientSidebar />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, Sarah</h1>
            <p className="text-muted-foreground">Track your Panchakarma journey and upcoming sessions</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Sessions Completed</p>
                    <p className="text-2xl font-bold text-foreground">{dashboardData?.stats.completedSessions || 0}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Sessions</p>
                    <p className="text-2xl font-bold text-foreground">{dashboardData?.stats.totalSessions || 0}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-secondary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Upcoming Sessions</p>
                    <p className="text-2xl font-bold text-foreground">{dashboardData?.stats.upcomingSessions || 0}</p>
                  </div>
                  <Clock className="w-8 h-8 text-accent" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Average Rating</p>
                    <p className="text-2xl font-bold text-foreground">{dashboardData?.stats.averageRating || "0.0"}</p>
                  </div>
                  <Droplets className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upcoming Sessions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Upcoming Sessions
                </CardTitle>
                <CardDescription>Your scheduled therapy appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData?.upcomingSessions.length ? (
                    dashboardData.upcomingSessions.map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-4 bg-surface rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{session.type_of_therapy}</h4>
                          <p className="text-sm text-muted-foreground">{session.practitioner_name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-foreground">
                              {new Date(session.date).toLocaleDateString()}
                            </span>
                            <span className="text-sm text-muted-foreground">•</span>
                            <span className="text-sm text-foreground">{session.time}</span>
                          </div>
                        </div>
                        <Badge variant={session.status === "scheduled" ? "default" : "secondary"}>
                          {session.status}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-4">No upcoming sessions</p>
                  )}
                </div>
                <Button className="w-full mt-4 bg-transparent" variant="outline">
                  View All Sessions
                </Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notifications
                </CardTitle>
                <CardDescription>Important reminders and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData?.notifications.length ? (
                    dashboardData.notifications.map((notification) => (
                      <div key={notification.id} className="p-4 bg-surface rounded-lg">
                        <p className="text-sm text-foreground mb-1">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(notification.created_at).toLocaleString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-4">No notifications</p>
                  )}
                </div>
                <Button className="w-full mt-4 bg-transparent" variant="outline">
                  View All Notifications
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Progress Chart */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Therapy Progress
              </CardTitle>
              <CardDescription>Track your healing journey over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ProgressChart />
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="btn-gradient text-white h-12">Book New Session</Button>
                <Button variant="outline" className="h-12 bg-transparent">
                  Submit Feedback
                </Button>
                <Button variant="outline" className="h-12 bg-transparent">
                  Contact Practitioner
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
