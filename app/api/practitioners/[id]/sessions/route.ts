// Practitioner sessions endpoint - GET /practitioners/:id/sessions
import { type NextRequest, NextResponse } from "next/server"
import { withAuth } from "@/lib/middleware/auth"
import { SessionModel } from "@/lib/models/session"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  return withAuth(request, async (request, user) => {
    const practitionerId = Number.parseInt(params.id)

    if (isNaN(practitionerId)) {
      return NextResponse.json({ error: "Invalid practitioner ID" }, { status: 400 })
    }

    // Only practitioners can access their own sessions or admin users
    if (user.role !== "practitioner" || user.id !== practitionerId) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    try {
      const { searchParams } = new URL(request.url)
      const status = searchParams.get("status")
      const date = searchParams.get("date")

      let sessions = await SessionModel.getByPractitionerId(practitionerId)

      // Filter by status if provided
      if (status && ["scheduled", "completed", "cancelled"].includes(status)) {
        sessions = sessions.filter((session) => session.status === status)
      }

      // Filter by date if provided
      if (date) {
        sessions = sessions.filter((session) => session.date === date)
      }

      return NextResponse.json({
        sessions,
        total: sessions.length,
      })
    } catch (error) {
      console.error("Error fetching practitioner sessions:", error)
      return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500 })
    }
  })
}
