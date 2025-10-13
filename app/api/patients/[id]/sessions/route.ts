// Patient sessions endpoint - GET /patients/:id/sessions
import { type NextRequest, NextResponse } from "next/server"
import { withAuth } from "@/lib/middleware/auth"
import { SessionModel } from "@/lib/models/session"
import { canAccessResource } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  return withAuth(request, async (request, user) => {
    const patientId = Number.parseInt(params.id)

    if (isNaN(patientId)) {
      return NextResponse.json({ error: "Invalid patient ID" }, { status: 400 })
    }

    // Check if user can access this patient's data
    if (!canAccessResource(user, patientId, "patient")) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    try {
      const sessions = await SessionModel.getByPatientId(patientId)

      return NextResponse.json({
        sessions,
        total: sessions.length,
      })
    } catch (error) {
      console.error("Error fetching patient sessions:", error)
      return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500 })
    }
  })
}

// Request new session - POST /patients/:id/sessions
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  return withAuth(request, async (request, user) => {
    const patientId = Number.parseInt(params.id)

    if (isNaN(patientId)) {
      return NextResponse.json({ error: "Invalid patient ID" }, { status: 400 })
    }

    // Check if user can access this patient's data
    if (!canAccessResource(user, patientId, "patient")) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    try {
      const body = await request.json()
      const { practitioner_id, date, time, type_of_therapy, notes } = body

      // Validation
      if (!practitioner_id || !date || !time || !type_of_therapy) {
        return NextResponse.json(
          { error: "Practitioner ID, date, time, and therapy type are required" },
          { status: 400 },
        )
      }

      // Validate date format (YYYY-MM-DD)
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/
      if (!dateRegex.test(date)) {
        return NextResponse.json({ error: "Date must be in YYYY-MM-DD format" }, { status: 400 })
      }

      // Validate time format (HH:MM)
      const timeRegex = /^\d{2}:\d{2}$/
      if (!timeRegex.test(time)) {
        return NextResponse.json({ error: "Time must be in HH:MM format" }, { status: 400 })
      }

      // Create session
      const session = await SessionModel.create({
        patient_id: patientId,
        practitioner_id: Number.parseInt(practitioner_id),
        date,
        time,
        type_of_therapy,
        notes,
      })

      return NextResponse.json(
        {
          message: "Session requested successfully",
          session,
        },
        { status: 201 },
      )
    } catch (error) {
      console.error("Error creating session:", error)
      return NextResponse.json({ error: "Failed to create session" }, { status: 500 })
    }
  })
}
