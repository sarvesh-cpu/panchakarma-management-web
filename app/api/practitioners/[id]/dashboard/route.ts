// Practitioner dashboard data endpoint - GET /practitioners/:id/dashboard
import { type NextRequest, NextResponse } from "next/server"
import { withAuth } from "@/lib/middleware/auth"
import { SessionModel } from "@/lib/models/session"
import { UserModel } from "@/lib/models/user"
import { FeedbackModel } from "@/lib/models/feedback"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  return withAuth(request, async (request, user) => {
    const practitionerId = Number.parseInt(params.id)

    if (isNaN(practitionerId)) {
      return NextResponse.json({ error: "Invalid practitioner ID" }, { status: 400 })
    }

    // Only practitioners can access their own dashboard
    if (user.role !== "practitioner" || user.id !== practitionerId) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    try {
      // Get all sessions for the practitioner
      const allSessions = await SessionModel.getByPractitionerId(practitionerId)

      // Get today's date
      const today = new Date().toISOString().split("T")[0]

      // Get today's sessions
      const todaySessions = allSessions
        .filter((session) => session.date === today)
        .sort((a, b) => a.time.localeCompare(b.time))

      // Get upcoming sessions (next 7 days)
      const nextWeek = new Date()
      nextWeek.setDate(nextWeek.getDate() + 7)
      const nextWeekDate = nextWeek.toISOString().split("T")[0]

      const upcomingSessions = allSessions
        .filter((session) => session.status === "scheduled" && session.date > today && session.date <= nextWeekDate)
        .sort((a, b) => {
          const dateCompare = a.date.localeCompare(b.date)
          return dateCompare !== 0 ? dateCompare : a.time.localeCompare(b.time)
        })
        .slice(0, 10)

      // Get patients
      const patients = await UserModel.getPatientsByPractitioner(practitionerId)

      // Get feedback
      const feedback = await FeedbackModel.getByPractitionerId(practitionerId)
      const feedbackStats = await FeedbackModel.getFeedbackStats(practitionerId)

      // Calculate statistics
      const stats = {
        totalPatients: patients.length,
        totalSessions: allSessions.length,
        completedSessions: allSessions.filter((s) => s.status === "completed").length,
        scheduledSessions: allSessions.filter((s) => s.status === "scheduled").length,
        cancelledSessions: allSessions.filter((s) => s.status === "cancelled").length,
        todaySessions: todaySessions.length,
        averageRating: Number.parseFloat(feedbackStats.avg_rating || "0").toFixed(1),
        totalFeedback: Number.parseInt(feedbackStats.total_feedback || "0"),
      }

      // Get therapy type distribution
      const therapyTypes = allSessions.reduce(
        (acc, session) => {
          acc[session.type_of_therapy] = (acc[session.type_of_therapy] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      )

      // Get monthly session trends (last 6 months)
      const monthlyTrends = []
      for (let i = 5; i >= 0; i--) {
        const date = new Date()
        date.setMonth(date.getMonth() - i)
        const monthKey = date.toISOString().slice(0, 7) // YYYY-MM format

        const monthSessions = allSessions.filter((session) => session.date.startsWith(monthKey))

        monthlyTrends.push({
          month: date.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
          sessions: monthSessions.length,
          completed: monthSessions.filter((s) => s.status === "completed").length,
        })
      }

      return NextResponse.json({
        stats,
        todaySessions,
        upcomingSessions,
        recentFeedback: feedback.slice(0, 5), // Latest 5 feedback entries
        therapyTypes,
        monthlyTrends,
        ratingDistribution: {
          5: Number.parseInt(feedbackStats.five_star || "0"),
          4: Number.parseInt(feedbackStats.four_star || "0"),
          3: Number.parseInt(feedbackStats.three_star || "0"),
          2: Number.parseInt(feedbackStats.two_star || "0"),
          1: Number.parseInt(feedbackStats.one_star || "0"),
        },
      })
    } catch (error) {
      console.error("Error fetching practitioner dashboard:", error)
      return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 })
    }
  })
}
