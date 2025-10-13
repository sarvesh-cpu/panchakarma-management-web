// Practitioner feedback endpoint - GET /practitioners/:id/feedback
import { type NextRequest, NextResponse } from "next/server"
import { withAuth } from "@/lib/middleware/auth"
import { FeedbackModel } from "@/lib/models/feedback"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  return withAuth(request, async (request, user) => {
    const practitionerId = Number.parseInt(params.id)

    if (isNaN(practitionerId)) {
      return NextResponse.json({ error: "Invalid practitioner ID" }, { status: 400 })
    }

    // Only practitioners can access their own feedback
    if (user.role !== "practitioner" || user.id !== practitionerId) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    try {
      const feedback = await FeedbackModel.getByPractitionerId(practitionerId)
      const stats = await FeedbackModel.getFeedbackStats(practitionerId)

      return NextResponse.json({
        feedback,
        stats: {
          totalFeedback: Number.parseInt(stats.total_feedback),
          averageRating: Number.parseFloat(stats.avg_rating).toFixed(1),
          ratingDistribution: {
            5: Number.parseInt(stats.five_star),
            4: Number.parseInt(stats.four_star),
            3: Number.parseInt(stats.three_star),
            2: Number.parseInt(stats.two_star),
            1: Number.parseInt(stats.one_star),
          },
        },
        total: feedback.length,
      })
    } catch (error) {
      console.error("Error fetching practitioner feedback:", error)
      return NextResponse.json({ error: "Failed to fetch feedback" }, { status: 500 })
    }
  })
}
