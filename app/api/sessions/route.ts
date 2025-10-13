// Create new therapy session - POST /sessions
import { type NextRequest, NextResponse } from "next/server"
import { withAuth } from "@/lib/middleware/auth"
import { SessionModel } from "@/lib/models/session"
import { NotificationModel } from "@/lib/models/notification"
import { UserModel } from "@/lib/models/user"

export async function POST(request: NextRequest) {
  return withAuth(request, async (request, user) => {
    try {
      const body = await request.json()
      const { patient_id, practitioner_id, date, time, type_of_therapy, notes } = body

      // Validation
      if (!patient_id || !practitioner_id || !date || !time || !type_of_therapy) {
        return NextResponse.json(
          { error: "Patient ID, practitioner ID, date, time, and therapy type are required" },
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

      // Check if date is not in the past
      const sessionDate = new Date(date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (sessionDate < today) {
        return NextResponse.json({ error: "Cannot schedule sessions in the past" }, { status: 400 })
      }

      // Verify patient and practitioner exist
      const patient = await UserModel.findById(Number.parseInt(patient_id))
      const practitioner = await UserModel.findById(Number.parseInt(practitioner_id))

      if (!patient || patient.role !== "patient") {
        return NextResponse.json({ error: "Invalid patient ID" }, { status: 400 })
      }

      if (!practitioner || practitioner.role !== "practitioner") {
        return NextResponse.json({ error: "Invalid practitioner ID" }, { status: 400 })
      }

      // Check for scheduling conflicts
      const existingSessions = await SessionModel.getCalendarSessions(date, date)
      const conflictingSession = existingSessions.find(
        (session) =>
          session.practitioner_id === Number.parseInt(practitioner_id) &&
          session.time === time &&
          session.status !== "cancelled",
      )

      if (conflictingSession) {
        return NextResponse.json({ error: "Time slot is already booked for this practitioner" }, { status: 409 })
      }

      // Authorization check - patients can only book for themselves, practitioners can book for any patient
      if (user.role === "patient" && user.id !== Number.parseInt(patient_id)) {
        return NextResponse.json({ error: "Patients can only book sessions for themselves" }, { status: 403 })
      }

      // Create session
      const session = await SessionModel.create({
        patient_id: Number.parseInt(patient_id),
        practitioner_id: Number.parseInt(practitioner_id),
        date,
        time,
        type_of_therapy,
        notes,
      })

      // Create automatic notifications
      await NotificationModel.createSessionNotifications(session.id, Number.parseInt(patient_id), type_of_therapy)

      // Create general notification for practitioner
      await NotificationModel.create({
        user_id: Number.parseInt(practitioner_id),
        message: `New session scheduled with ${patient.name} on ${date} at ${time} for ${type_of_therapy}`,
        type: "general",
        session_id: session.id,
      })

      return NextResponse.json(
        {
          message: "Session created successfully",
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

// Get all sessions with filters - GET /sessions
export async function GET(request: NextRequest) {
  return withAuth(request, async (request, user) => {
    try {
      const { searchParams } = new URL(request.url)
      const status = searchParams.get("status")
      const date = searchParams.get("date")
      const patientId = searchParams.get("patient_id")
      const practitionerId = searchParams.get("practitioner_id")

      let sessions: any[] = []

      // Get sessions based on user role and filters
      if (user.role === "practitioner") {
        sessions = await SessionModel.getByPractitionerId(user.id)
      } else if (user.role === "patient") {
        sessions = await SessionModel.getByPatientId(user.id)
      }

      // Apply filters
      if (status && ["scheduled", "completed", "cancelled"].includes(status)) {
        sessions = sessions.filter((session) => session.status === status)
      }

      if (date) {
        sessions = sessions.filter((session) => session.date === date)
      }

      if (patientId && user.role === "practitioner") {
        sessions = sessions.filter((session) => session.patient_id === Number.parseInt(patientId))
      }

      if (practitionerId && user.role === "patient") {
        sessions = sessions.filter((session) => session.practitioner_id === Number.parseInt(practitionerId))
      }

      return NextResponse.json({
        sessions,
        total: sessions.length,
      })
    } catch (error) {
      console.error("Error fetching sessions:", error)
      return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500 })
    }
  })
}
