"use client"

import { useState, useEffect } from "react"
import { PatientSidebar } from "@/components/patient-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Calendar, TrendingUp, Target, Award } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Mock data - replace with API calls
const progressData = [
  { date: "Week 1", wellness: 30, energy: 25, sleep: 40 },
  { date: "Week 2", wellness: 45, energy: 40, sleep: 55 },
  { date: "Week 3", wellness: 60, energy: 55, sleep: 70 },
  { date: "Week 4", wellness: 75, energy: 70, sleep: 80 },
  { date: "Week 5", wellness: 85, energy: 80, sleep: 85 },
  { date: "Week 6", wellness: 90, energy: 85, sleep: 90 },
]

const treatmentProgress = [
  { treatment: "Abhyanga", completed: 12, total: 15, progress: 80 },
  { treatment: "Shirodhara", completed: 8, total: 10, progress: 80 },
  { treatment: "Panchakarma", completed: 5, total: 7, progress: 71 },
  { treatment: "Meditation", completed: 20, total: 21, progress: 95 },
]

export default function PatientProgressPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => setLoading(false), 1000)
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen bg-background">
        <PatientSidebar />
        <div className="flex-1 p-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      <PatientSidebar />
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Progress Tracking</h1>
            <p className="text-muted-foreground">Monitor your healing journey and wellness improvements</p>
          </div>

          {/* Progress Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall Wellness</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">90%</div>
                <Progress value={90} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">+15% from last week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Energy Levels</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <Progress value={85} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">+10% from last week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sleep Quality</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">90%</div>
                <Progress value={90} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">+5% from last week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Achievements</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground mt-2">Milestones reached</p>
                <Badge variant="secondary" className="mt-2">
                  Excellent Progress
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Progress Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Wellness Progress Over Time</CardTitle>
              <CardDescription>Track your improvement across different wellness metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="wellness" stroke="#4A6741" strokeWidth={2} name="Overall Wellness" />
                    <Line type="monotone" dataKey="energy" stroke="#C68B59" strokeWidth={2} name="Energy Levels" />
                    <Line type="monotone" dataKey="sleep" stroke="#A27B5C" strokeWidth={2} name="Sleep Quality" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Treatment Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Treatment Progress</CardTitle>
              <CardDescription>Your progress across different Panchakarma treatments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {treatmentProgress.map((treatment) => (
                  <div key={treatment.treatment} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{treatment.treatment}</h4>
                      <span className="text-sm text-muted-foreground">
                        {treatment.completed}/{treatment.total} sessions
                      </span>
                    </div>
                    <Progress value={treatment.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">{treatment.progress}% complete</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
