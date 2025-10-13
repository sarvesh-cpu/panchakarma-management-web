// Patient notifications endpoint - GET /patients/:id/notifications
import { type NextRequest, NextResponse } from "next/server"
import { withAuth } from "@/lib/middleware/auth"
import { NotificationModel } from "@/lib/models/notification"
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
      const { searchParams } = new URL(request.url)
      const limit = Number.parseInt(searchParams.get("limit") || "50")

      const notifications = await NotificationModel.getByUserId(patientId, limit)
      const unreadCount = await NotificationModel.getUnreadCount(patientId)

      return NextResponse.json({
        notifications,
        unreadCount,
        total: notifications.length,
      })
    } catch (error) {
      console.error("Error fetching notifications:", error)
      return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 })
    }
  })
}
