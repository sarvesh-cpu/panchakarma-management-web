"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { PatientSidebar } from "@/components/patient-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageCircle, Star } from "lucide-react"

interface Session {
  id: number
  type_of_therapy: string
  date: string
  time: string
  practitioner_name: string
  status: string
}

interface FeedbackHistory {
  id: number
  session_id: number
  feedback_text: string
  rating: number
  created_at: string
  therapy_type: string
  session_date: string
}

export default function PatientFeedback() {
  const [feedback, setFeedback] = useState("")
  const [sessionId, setSessionId] = useState("")
  const [rating, setRating] = useState("")
  const [completedSessions, setCompletedSessions] = useState<Session[]>([])
  const [feedbackHistory, setFeedbackHistory] = useState<FeedbackHistory[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null
        if (!token) {
          console.error("[v0] No auth token found")
          return
        }

        const profileRes = await fetch("/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!profileRes.ok) {
          const errText = await profileRes.text().catch(() => "")
          console.error("[v0] Failed to fetch profile:", profileRes.status, errText)
          return
        }
        const { user } = await profileRes.json()
        if (user?.role !== "patient") {
          console.error("[v0] Current user is not a patient")
          return
        }

        const sessionsResponse = await fetch(`/api/patients/${user.id}/sessions`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (sessionsResponse.ok) {
          const sessionsData = await sessionsResponse.json()
          setCompletedSessions(sessionsData.sessions.filter((s: Session) => s.status === "completed"))
        } else {
          const err = await sessionsResponse.text().catch(() => "")
          console.error("[v0] Failed to fetch sessions:", sessionsResponse.status, err)
        }

        const feedbackResponse = await fetch(`/api/patients/${user.id}/feedback`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (feedbackResponse.ok) {
          const feedbackData = await feedbackResponse.json()
          setFeedbackHistory(feedbackData.feedback)
        } else {
          const err = await feedbackResponse.text().catch(() => "")
          console.error("[v0] Failed to fetch feedback:", feedbackResponse.status, err)
        }
      } catch (error) {
        console.error("[v0] Error fetching data:", (error as Error).message)
      }
    }

    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null
      if (!token) {
        alert("You are not authenticated.")
        setLoading(false)
        return
      }

      const profileRes = await fetch("/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!profileRes.ok) {
        alert("Failed to verify user. Please re-login.")
        setLoading(false)
        return
      }
      const { user } = await profileRes.json()

      const response = await fetch(`/api/patients/${user.id}/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          session_id: Number.parseInt(sessionId),
          feedback_text: feedback,
          rating: Number.parseInt(rating),
        }),
      })

      if (response.ok) {
        alert("Feedback submitted successfully!")
        setFeedback("")
        setSessionId("")
        setRating("")

        // Refresh feedback history
        const feedbackResponse = await fetch(`/api/patients/${user.id}/feedback`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (feedbackResponse.ok) {
          const feedbackData = await feedbackResponse.json()
          setFeedbackHistory(feedbackData.feedback)
        }
      } else {
        const errorData = await response.json().catch(() => ({}))
        alert(`Error: ${errorData.error || "Unknown error"}`)
      }
    } catch (error) {
      console.error("[v0] Error submitting feedback:", (error as Error).message)
      alert("Failed to submit feedback. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <PatientSidebar />

      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Feedback</h1>
            <p className="text-muted-foreground">Share your therapy experience and help us improve</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Submit Feedback
              </CardTitle>
              <CardDescription>Your feedback helps us provide better care</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="session">Session</Label>
                  <Select value={sessionId} onValueChange={setSessionId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a completed session" />
                    </SelectTrigger>
                    <SelectContent>
                      {completedSessions.map((session) => (
                        <SelectItem key={session.id} value={session.id.toString()}>
                          {session.type_of_therapy} - {new Date(session.date).toLocaleDateString()} at {session.time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rating">Rating</Label>
                  <Select value={rating} onValueChange={setRating}>
                    <SelectTrigger>
                      <SelectValue placeholder="Rate your experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">⭐⭐⭐⭐⭐ Excellent</SelectItem>
                      <SelectItem value="4">⭐⭐⭐⭐ Very Good</SelectItem>
                      <SelectItem value="3">⭐⭐⭐ Good</SelectItem>
                      <SelectItem value="2">⭐⭐ Fair</SelectItem>
                      <SelectItem value="1">⭐ Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback">Your Feedback</Label>
                  <Textarea
                    id="feedback"
                    placeholder="Please share your experience, any improvements you noticed, or suggestions for better care..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" className="btn-gradient text-white" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Feedback"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Previous Feedback */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Previous Feedback</CardTitle>
              <CardDescription>Your submitted feedback history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feedbackHistory.length > 0 ? (
                  feedbackHistory.map((feedbackItem) => (
                    <div key={feedbackItem.id} className="p-4 bg-surface rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{feedbackItem.therapy_type}</h4>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${star <= feedbackItem.rating ? "fill-secondary text-secondary" : "text-muted-foreground"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">"{feedbackItem.feedback_text}"</p>
                      <p className="text-xs text-muted-foreground">
                        Session: {new Date(feedbackItem.session_date).toLocaleDateString()} | Submitted:{" "}
                        {new Date(feedbackItem.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-4">No feedback submitted yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
