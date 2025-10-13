"use client"

import { useEffect, useState } from "react"
import { PractitionerSidebar } from "@/components/practitioner-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, Clock, TrendingUp, MessageCircle, CheckCircle } from "lucide-react"

interface DashboardData {
  stats: {
    totalPatients: number
    todaySessions: number
    completedSessions: number
    averageRating: string
  }
  todaySessions: Array<{
    id: number
    patient_name: string
    type_of_therapy: string
    time: string
    status: string
  }>
  recentFeedback: Array<{
    id: number
    patient_name: string
    type_of_therapy: string
    rating: number
    feedback_text: string
    created_at: string
  }>
}

export default function PractitionerDashboard() {
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

        // Get authenticated user to determine practitioner id
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
        if (user?.role !== "practitioner") {
          console.error("[v0] Current user is not a practitioner")
          setLoading(false)
          return
        }

        const response = await fetch(`/api/practitioners/${user.id}/dashboard`, {
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
        <PractitionerSidebar />
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
      <PractitionerSidebar />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Good morning, Dr. Sharma</h1>
            <p className="text-muted-foreground">
              You have {dashboardData?.stats.todaySessions || 0} sessions scheduled for today
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Patients</p>
                    <p className="text-2xl font-bold text-foreground">{dashboardData?.stats.totalPatients || 0}</p>
                  </div>
                  <Users className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Today's Sessions</p>
                    <p className="text-2xl font-bold text-foreground">{dashboardData?.stats.todaySessions || 0}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-secondary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Completed Sessions</p>
                    <p className="text-2xl font-bold text-foreground">{dashboardData?.stats.completedSessions || 0}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-accent" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Rating</p>
                    <p className="text-2xl font-bold text-foreground">{dashboardData?.stats.averageRating || "0.0"}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Today's Schedule
                </CardTitle>
                <CardDescription>Your appointments for {new Date().toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData?.todaySessions.length ? (
                    dashboardData.todaySessions.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 bg-surface rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{appointment.patient_name}</h4>
                          <p className="text-sm text-muted-foreground">{appointment.type_of_therapy}</p>
                          <p className="text-sm text-foreground mt-1">{appointment.time}</p>
                        </div>
                        <Badge
                          variant={
                            appointment.status === "completed"
                              ? "default"
                              : appointment.status === "in-progress"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {appointment.status}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-4">No sessions scheduled for today</p>
                  )}
                </div>
                <Button className="w-full mt-4 bg-transparent" variant="outline">
                  View Full Schedule
                </Button>
              </CardContent>
            </Card>

            {/* Recent Feedback */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Recent Feedback
                </CardTitle>
                <CardDescription>Latest patient reviews and comments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData?.recentFeedback.length ? (
                    dashboardData.recentFeedback.map((feedback) => (
                      <div key={feedback.id} className="p-4 bg-surface rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-foreground">{feedback.patient_name}</h4>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-sm ${i < feedback.rating ? "text-secondary" : "text-muted-foreground"}`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{feedback.type_of_therapy}</p>
                        <p className="text-sm text-foreground mb-2">"{feedback.feedback_text}"</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(feedback.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-4">No recent feedback</p>
                  )}
                </div>
                <Button className="w-full mt-4 bg-transparent" variant="outline">
                  View All Feedback
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button className="btn-gradient text-white h-12">Add New Patient</Button>
                <Button variant="outline" className="h-12 bg-transparent">
                  Schedule Session
                </Button>
                <Button variant="outline" className="h-12 bg-transparent">
                  View Patient Records
                </Button>
                <Button variant="outline" className="h-12 bg-transparent">
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
