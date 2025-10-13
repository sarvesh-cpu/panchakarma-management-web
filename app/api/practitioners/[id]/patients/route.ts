// Practitioner patients endpoint - GET /practitioners/:id/patients
import { type NextRequest, NextResponse } from "next/server"
import { withAuth } from "@/lib/middleware/auth"
import { UserModel } from "@/lib/models/user"
import { SessionModel } from "@/lib/models/session"
import { FeedbackModel } from "@/lib/models/feedback"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  return withAuth(request, async (request, user) => {
    const practitionerId = Number.parseInt(params.id)

    if (isNaN(practitionerId)) {
      return NextResponse.json({ error: "Invalid practitioner ID" }, { status: 400 })
    }

    // Only practitioners can access their own patients
    if (user.role !== "practitioner" || user.id !== practitionerId) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    try {
      const patients = await UserModel.getPatientsByPractitioner(practitionerId)

      // Get additional stats for each patient
      const patientsWithStats = await Promise.all(
        patients.map(async (patient) => {
          const sessions = await SessionModel.getByPatientId(patient.id)
          const feedback = await FeedbackModel.getByPatientId(patient.id)

          const stats = {
            totalSessions: sessions.length,
            completedSessions: sessions.filter((s) => s.status === "completed").length,
            upcomingSessions: sessions.filter((s) => s.status === "scheduled").length,
            averageRating:
              feedback.length > 0 ? (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1) : 0,
            lastSessionDate: sessions.length > 0 ? sessions[0].date : null,
          }

          return {
            ...patient,
            stats,
          }
        }),
      )

      return NextResponse.json({
        patients: patientsWithStats,
        total: patientsWithStats.length,
      })
    } catch (error) {
      console.error("Error fetching practitioner patients:", error)
      return NextResponse.json({ error: "Failed to fetch patients" }, { status: 500 })
    }
  })
}
