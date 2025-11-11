import { type NextRequest, NextResponse } from "next/server"
import { SessionModel } from "@/lib/models/session"
import { NotificationModel } from "@/lib/models/notification"
import { FeedbackModel } from "@/lib/models/feedback"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const patientId = Number.parseInt(params.id)

  if (isNaN(patientId)) {
    return NextResponse.json({ error: "Invalid patient ID" }, { status: 400 })
  }

  try {
    // Get all sessions for the patient
    const allSessions = await SessionModel.getByPatientId(patientId)

    // Get upcoming sessions (scheduled status and future dates)
    const today = new Date().toISOString().split("T")[0]
    const upcomingSessions = allSessions
      .filter((session) => session.status === "scheduled" && session.date >= today)
      .slice(0, 5)

    // Get recent completed sessions
    const completedSessions = allSessions.filter((session) => session.status === "completed").slice(0, 5)

    // Get unread notifications
    const notifications = await NotificationModel.getByUserId(patientId, 10)
    const unreadCount = await NotificationModel.getUnreadCount(patientId)

    // Get feedback history
    const feedback = await FeedbackModel.getByPatientId(patientId)

    // Calculate statistics
    const stats = {
      totalSessions: allSessions.length,
      completedSessions: allSessions.filter((s) => s.status === "completed").length,
      upcomingSessions: allSessions.filter((s) => s.status === "scheduled").length,
      cancelledSessions: allSessions.filter((s) => s.status === "cancelled").length,
      averageRating:
        feedback.length > 0 ? (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1) : 0,
      totalFeedback: feedback.length,
    }

    // Get therapy type distribution
    const therapyTypes = allSessions.reduce(
      (acc, session) => {
        acc[session.type_of_therapy] = (acc[session.type_of_therapy] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return NextResponse.json({
      stats,
      upcomingSessions,
      completedSessions,
      notifications: notifications.slice(0, 5),
      unreadCount,
      recentFeedback: feedback.slice(0, 3),
      therapyTypes,
    })
  } catch (error) {
    console.error("Error fetching patient dashboard:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 })
  }
}
