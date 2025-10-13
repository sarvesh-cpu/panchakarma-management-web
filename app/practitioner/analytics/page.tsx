"use client"

import { useState, useEffect } from "react"
import { PractitionerSidebar } from "@/components/practitioner-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Users, Calendar, Star, DollarSign, Clock } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Mock data - replace with API calls
const monthlyData = [
  { month: "Jan", patients: 45, sessions: 180, revenue: 18000, satisfaction: 4.5 },
  { month: "Feb", patients: 52, sessions: 208, revenue: 20800, satisfaction: 4.6 },
  { month: "Mar", patients: 48, sessions: 192, revenue: 19200, satisfaction: 4.4 },
  { month: "Apr", patients: 58, sessions: 232, revenue: 23200, satisfaction: 4.7 },
  { month: "May", patients: 62, sessions: 248, revenue: 24800, satisfaction: 4.8 },
  { month: "Jun", patients: 55, sessions: 220, revenue: 22000, satisfaction: 4.6 },
]

const treatmentData = [
  { name: "Abhyanga", sessions: 120, revenue: 12000, color: "#4A6741" },
  { name: "Shirodhara", sessions: 85, revenue: 8500, color: "#C68B59" },
  { name: "Panchakarma", sessions: 65, revenue: 9750, color: "#A27B5C" },
  { name: "Meditation", sessions: 95, revenue: 4750, color: "#8B7355" },
  { name: "Consultation", sessions: 150, revenue: 7500, color: "#6B5B73" },
]

const patientOutcomes = [
  { outcome: "Excellent", count: 45, percentage: 60 },
  { outcome: "Good", count: 22, percentage: 29 },
  { outcome: "Fair", count: 8, percentage: 11 },
]

export default function PractitionerAnalyticsPage() {
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("6months")

  useEffect(() => {
    // Simulate API call
    setTimeout(() => setLoading(false), 1000)
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen bg-background">
        <PractitionerSidebar />
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
      <PractitionerSidebar />
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
              <p className="text-muted-foreground">Track your practice performance and patient outcomes</p>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">320</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
                <Badge variant="secondary" className="mt-2">
                  Active: 75
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sessions This Month</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">248</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
                <Badge variant="secondary" className="mt-2">
                  Avg: 8.3/day
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$24,800</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
                <Badge variant="secondary" className="mt-2">
                  Avg: $100/session
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.8/5</div>
                <p className="text-xs text-muted-foreground">+0.2 from last month</p>
                <Badge variant="secondary" className="mt-2">
                  98% positive
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Performance Trends */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
                <CardDescription>Track patients, sessions, and revenue over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="patients" stroke="#4A6741" strokeWidth={2} name="Patients" />
                      <Line type="monotone" dataKey="sessions" stroke="#C68B59" strokeWidth={2} name="Sessions" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Treatment Distribution</CardTitle>
                <CardDescription>Sessions by treatment type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={treatmentData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="sessions"
                        label={({ name, percentage }) => `${name} ${percentage}%`}
                      >
                        {treatmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Treatment</CardTitle>
              <CardDescription>Compare revenue across different treatment types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={treatmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#4A6741" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Patient Outcomes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Outcomes</CardTitle>
                <CardDescription>Treatment success rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patientOutcomes.map((outcome) => (
                    <div key={outcome.outcome} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{outcome.outcome}</span>
                        <span className="text-sm text-muted-foreground">{outcome.count} patients</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${outcome.percentage}%` }} />
                      </div>
                      <p className="text-xs text-muted-foreground">{outcome.percentage}%</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
                <CardDescription>AI-powered practice insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-800 dark:text-green-200">Growth Trend</span>
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Your patient satisfaction has increased by 15% over the last quarter. Abhyanga treatments show the
                      highest success rate.
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-800 dark:text-blue-200">Optimization</span>
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Consider scheduling more Shirodhara sessions on weekends - they have a 95% booking rate and high
                      satisfaction scores.
                    </p>
                  </div>

                  <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg border border-amber-200 dark:border-amber-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-4 w-4 text-amber-600" />
                      <span className="font-medium text-amber-800 dark:text-amber-200">Recommendation</span>
                    </div>
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      Your consultation sessions have the highest revenue per hour. Consider offering specialized
                      consultation packages.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
