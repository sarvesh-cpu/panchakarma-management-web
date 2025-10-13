// Patient feedback endpoint - POST /patients/:id/feedback
import { type NextRequest, NextResponse } from "next/server"
import { withAuth } from "@/lib/middleware/auth"
import { FeedbackModel } from "@/lib/models/feedback"
import { SessionModel } from "@/lib/models/session"
import { canAccessResource } from "@/lib/auth"

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
      const { session_id, feedback_text, rating } = body

      // Validation
      if (!session_id || !feedback_text || !rating) {
        return NextResponse.json({ error: "Session ID, feedback text, and rating are required" }, { status: 400 })
      }

      // Validate rating
      const ratingNum = Number.parseInt(rating)
      if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
        return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 })
      }

      // Verify session exists and belongs to patient
      const session = await SessionModel.getById(Number.parseInt(session_id))
      if (!session) {
        return NextResponse.json({ error: "Session not found" }, { status: 404 })
      }

      if (session.patient_id !== patientId) {
        return NextResponse.json({ error: "Session does not belong to this patient" }, { status: 403 })
      }

      // Check if session is completed
      if (session.status !== "completed") {
        return NextResponse.json({ error: "Can only provide feedback for completed sessions" }, { status: 400 })
      }

      // Check if feedback already exists for this session
      const existingFeedback = await FeedbackModel.getBySessionId(Number.parseInt(session_id))
      if (existingFeedback) {
        return NextResponse.json({ error: "Feedback already provided for this session" }, { status: 409 })
      }

      // Create feedback
      const feedback = await FeedbackModel.create({
        patient_id: patientId,
        session_id: Number.parseInt(session_id),
        feedback_text,
        rating: ratingNum,
      })

      return NextResponse.json(
        {
          message: "Feedback submitted successfully",
          feedback,
        },
        { status: 201 },
      )
    } catch (error) {
      console.error("Error submitting feedback:", error)
      return NextResponse.json({ error: "Failed to submit feedback" }, { status: 500 })
    }
  })
}

// Get patient's feedback history - GET /patients/:id/feedback
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
      const feedback = await FeedbackModel.getByPatientId(patientId)

      return NextResponse.json({
        feedback,
        total: feedback.length,
      })
    } catch (error) {
      console.error("Error fetching patient feedback:", error)
      return NextResponse.json({ error: "Failed to fetch feedback" }, { status: 500 })
    }
  })
}
