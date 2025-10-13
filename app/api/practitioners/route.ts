// General practitioners endpoint - GET /practitioners
import { type NextRequest, NextResponse } from "next/server"
import { withAuth } from "@/lib/middleware/auth"
import { UserModel } from "@/lib/models/user"
import { FeedbackModel } from "@/lib/models/feedback"

export async function GET(request: NextRequest) {
  return withAuth(request, async (request, user) => {
    try {
      const practitioners = await UserModel.getPractitioners()

      // Get ratings for each practitioner
      const practitionersWithRatings = await Promise.all(
        practitioners.map(async (practitioner) => {
          const averageRating = await FeedbackModel.getAverageRatingByPractitioner(practitioner.id)
          const feedbackStats = await FeedbackModel.getFeedbackStats(practitioner.id)

          return {
            ...practitioner,
            averageRating: Number.parseFloat(averageRating.toFixed(1)),
            totalFeedback: Number.parseInt(feedbackStats.total_feedback || "0"),
          }
        }),
      )

      return NextResponse.json({
        practitioners: practitionersWithRatings,
        total: practitionersWithRatings.length,
      })
    } catch (error) {
      console.error("Error fetching practitioners:", error)
      return NextResponse.json({ error: "Failed to fetch practitioners" }, { status: 500 })
    }
  })
}
