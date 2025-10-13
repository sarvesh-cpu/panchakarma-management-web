// Mark all notifications as read - PATCH /patients/:id/notifications/read-all
import { type NextRequest, NextResponse } from "next/server"
import { withAuth } from "@/lib/middleware/auth"
import { NotificationModel } from "@/lib/models/notification"
import { canAccessResource } from "@/lib/auth"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
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
      await NotificationModel.markAllAsRead(patientId)

      return NextResponse.json({
        message: "All notifications marked as read",
      })
    } catch (error) {
      console.error("Error marking all notifications as read:", error)
      return NextResponse.json({ error: "Failed to mark notifications as read" }, { status: 500 })
    }
  })
}
