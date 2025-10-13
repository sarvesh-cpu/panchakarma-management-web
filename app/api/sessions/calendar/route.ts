// Calendar view endpoint - GET /sessions/calendar
import { type NextRequest, NextResponse } from "next/server"
import { withAuth } from "@/lib/middleware/auth"
import { SessionModel } from "@/lib/models/session"

export async function GET(request: NextRequest) {
  return withAuth(request, async (request, user) => {
    try {
      const { searchParams } = new URL(request.url)
      const startDate = searchParams.get("start_date")
      const endDate = searchParams.get("end_date")
      const practitionerId = searchParams.get("practitioner_id")

      // Validate date format if provided
      if (startDate && !/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
        return NextResponse.json({ error: "Invalid start_date format. Use YYYY-MM-DD" }, { status: 400 })
      }

      if (endDate && !/^\d{4}-\d{2}-\d{2}$/.test(endDate)) {
        return NextResponse.json({ error: "Invalid end_date format. Use YYYY-MM-DD" }, { status: 400 })
      }

      let sessions = await SessionModel.getCalendarSessions(startDate || undefined, endDate || undefined)

      // Filter by practitioner if specified and user has permission
      if (practitionerId) {
        const practitionerIdNum = Number.parseInt(practitionerId)
        if (isNaN(practitionerIdNum)) {
          return NextResponse.json({ error: "Invalid practitioner_id" }, { status: 400 })
        }

        // Only practitioners can filter by their own ID, or patients can view any practitioner's availability
        if (user.role === "practitioner" && user.id !== practitionerIdNum) {
          return NextResponse.json({ error: "Access denied" }, { status: 403 })
        }

        sessions = sessions.filter((session) => session.practitioner_id === practitionerIdNum)
      }

      // If user is a patient, only show their own sessions plus available slots
      if (user.role === "patient") {
        sessions = sessions.filter((session) => session.patient_id === user.id || session.status === "scheduled")
      }

      // Group sessions by date for calendar display
      const calendarData = sessions.reduce(
        (acc, session) => {
          if (!acc[session.date]) {
            acc[session.date] = []
          }
          acc[session.date].push({
            id: session.id,
            time: session.time,
            patient_name: session.patient_name,
            practitioner_name: session.practitioner_name,
            type_of_therapy: session.type_of_therapy,
            status: session.status,
            // Only include patient details if user is practitioner or it's their own session
            patient_id: user.role === "practitioner" || session.patient_id === user.id ? session.patient_id : null,
            practitioner_id: session.practitioner_id,
          })
          return acc
        },
        {} as Record<string, any[]>,
      )

      // Sort sessions within each date by time
      Object.keys(calendarData).forEach((date) => {
        calendarData[date].sort((a, b) => a.time.localeCompare(b.time))
      })

      return NextResponse.json({
        calendar: calendarData,
        sessions,
        total: sessions.length,
      })
    } catch (error) {
      console.error("Error fetching calendar sessions:", error)
      return NextResponse.json({ error: "Failed to fetch calendar data" }, { status: 500 })
    }
  })
}
