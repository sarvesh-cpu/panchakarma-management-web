"use client"

import { useEffect, useState } from "react"
import { PractitionerSidebar } from "@/components/practitioner-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Star, TrendingUp } from "lucide-react"

interface FeedbackData {
  id: number
  patient_name: string
  therapy_type: string
  rating: number
  feedback_text: string
  created_at: string
  session_date: string
}

interface FeedbackStats {
  totalFeedback: number
  averageRating: string
  ratingDistribution: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
}

export default function PractitionerFeedback() {
  const [feedbackData, setFeedbackData] = useState<FeedbackData[]>([])
  const [stats, setStats] = useState<FeedbackStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeedbackData = async () => {
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
        if (user?.role !== "practitioner") {
          console.error("[v0] Current user is not a practitioner")
          setLoading(false)
          return
        }

        const response = await fetch(`/api/practitioners/${user.id}/feedback`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (response.ok) {
          const data = await response.json()
          setFeedbackData(data.feedback)
          setStats(data.stats)
        } else {
          const err = await response.text().catch(() => "")
          console.error("[v0] Failed to fetch feedback data:", response.status, err)
        }
      } catch (error) {
        console.error("[v0] Error fetching feedback data:", (error as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchFeedbackData()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen bg-background">
        <PractitionerSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-surface rounded mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-24 bg-surface rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  const recentFeedback = feedbackData.filter((f) => {
    const feedbackDate = new Date(f.created_at)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return feedbackDate > weekAgo
  }).length

  return (
    <div className="flex min-h-screen bg-background">
      <PractitionerSidebar />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Patient Feedback</h1>
            <p className="text-muted-foreground">Review patient feedback and improve your practice</p>
          </div>

          {/* Feedback Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Average Rating</p>
                    <p className="text-2xl font-bold text-foreground">{stats?.averageRating || "0.0"}</p>
                  </div>
                  <Star className="w-8 h-8 text-secondary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Reviews</p>
                    <p className="text-2xl font-bold text-foreground">{stats?.totalFeedback || 0}</p>
                  </div>
                  <MessageCircle className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">New This Week</p>
                    <p className="text-2xl font-bold text-foreground">{recentFeedback}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-accent" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feedback List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Patient Reviews
              </CardTitle>
              <CardDescription>Detailed feedback from your patients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {feedbackData.length > 0 ? (
                  feedbackData.map((feedback) => {
                    const isRecent = new Date(feedback.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

                    return (
                      <div key={feedback.id} className="p-6 bg-surface rounded-lg">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-foreground">{feedback.patient_name}</h3>
                              <Badge variant={isRecent ? "default" : "secondary"}>
                                {isRecent ? "recent" : "reviewed"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{feedback.therapy_type}</p>
                            <div className="flex items-center gap-1 mb-3">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < feedback.rating ? "fill-secondary text-secondary" : "text-muted-foreground"}`}
                                />
                              ))}
                              <span className="ml-2 text-sm text-muted-foreground">({feedback.rating}/5)</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {new Date(feedback.created_at).toLocaleDateString()}
                          </p>
                        </div>

                        <blockquote className="text-foreground italic border-l-4 border-primary pl-4">
                          "{feedback.feedback_text}"
                        </blockquote>
                      </div>
                    )
                  })
                ) : (
                  <p className="text-muted-foreground text-center py-8">No feedback received yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
