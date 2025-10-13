// Session management endpoint - PATCH /sessions/:id
import { type NextRequest, NextResponse } from "next/server"
import { withAuth } from "@/lib/middleware/auth"
import { SessionModel } from "@/lib/models/session"
import { NotificationModel } from "@/lib/models/notification"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  return withAuth(request, async (request, user) => {
    const sessionId = Number.parseInt(params.id)

    if (isNaN(sessionId)) {
      return NextResponse.json({ error: "Invalid session ID" }, { status: 400 })
    }

    try {
      const body = await request.json()
      const { status, notes } = body

      // Validation
      if (!status || !["scheduled", "completed", "cancelled"].includes(status)) {
        return NextResponse.json(
          { error: "Valid status is required (scheduled, completed, cancelled)" },
          { status: 400 },
        )
      }

      // Get session to verify ownership
      const session = await SessionModel.getById(sessionId)
      if (!session) {
        return NextResponse.json({ error: "Session not found" }, { status: 404 })
      }

      // Only practitioners can update session status, and only their own sessions
      if (user.role !== "practitioner" || user.id !== session.practitioner_id) {
        return NextResponse.json({ error: "Access denied" }, { status: 403 })
      }

      // Update session
      const updatedSession = await SessionModel.updateStatus(sessionId, status as any, notes)

      // If session is completed, create post-procedure notification
      if (status === "completed") {
        await NotificationModel.create({
          user_id: session.patient_id,
          message: NotificationModel["getPostProcedureMessage"](session.type_of_therapy),
          type: "post-procedure",
          session_id: sessionId,
        })
      }

      return NextResponse.json({
        message: "Session updated successfully",
        session: updatedSession,
      })
    } catch (error) {
      console.error("Error updating session:", error)
      return NextResponse.json({ error: "Failed to update session" }, { status: 500 })
    }
  })
}

// Get session details - GET /sessions/:id
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  return withAuth(request, async (request, user) => {
    const sessionId = Number.parseInt(params.id)

    if (isNaN(sessionId)) {
      return NextResponse.json({ error: "Invalid session ID" }, { status: 400 })
    }

    try {
      const session = await SessionModel.getById(sessionId)
      if (!session) {
        return NextResponse.json({ error: "Session not found" }, { status: 404 })
      }

      // Check access permissions
      const canAccess =
        (user.role === "patient" && user.id === session.patient_id) ||
        (user.role === "practitioner" && user.id === session.practitioner_id)

      if (!canAccess) {
        return NextResponse.json({ error: "Access denied" }, { status: 403 })
      }

      return NextResponse.json({ session })
    } catch (error) {
      console.error("Error fetching session:", error)
      return NextResponse.json({ error: "Failed to fetch session" }, { status: 500 })
    }
  })
}
