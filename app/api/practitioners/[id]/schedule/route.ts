// Practitioner schedule management - GET /practitioners/:id/schedule
import { type NextRequest, NextResponse } from "next/server"
import { withAuth } from "@/lib/middleware/auth"
import { SessionModel } from "@/lib/models/session"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  return withAuth(request, async (request, user) => {
    const practitionerId = Number.parseInt(params.id)

    if (isNaN(practitionerId)) {
      return NextResponse.json({ error: "Invalid practitioner ID" }, { status: 400 })
    }

    // Only practitioners can access their own schedule
    if (user.role !== "practitioner" || user.id !== practitionerId) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    try {
      const { searchParams } = new URL(request.url)
      const startDate = searchParams.get("start_date")
      const endDate = searchParams.get("end_date")

      let sessions = await SessionModel.getByPractitionerId(practitionerId)

      // Filter by date range if provided
      if (startDate && endDate) {
        sessions = sessions.filter((session) => session.date >= startDate && session.date <= endDate)
      }

      // Group sessions by date for calendar view
      const scheduleByDate = sessions.reduce(
        (acc, session) => {
          if (!acc[session.date]) {
            acc[session.date] = []
          }
          acc[session.date].push(session)
          return acc
        },
        {} as Record<string, typeof sessions>,
      )

      // Sort sessions within each date by time
      Object.keys(scheduleByDate).forEach((date) => {
        scheduleByDate[date].sort((a, b) => a.time.localeCompare(b.time))
      })

      return NextResponse.json({
        schedule: scheduleByDate,
        sessions,
        total: sessions.length,
      })
    } catch (error) {
      console.error("Error fetching practitioner schedule:", error)
      return NextResponse.json({ error: "Failed to fetch schedule" }, { status: 500 })
    }
  })
}
