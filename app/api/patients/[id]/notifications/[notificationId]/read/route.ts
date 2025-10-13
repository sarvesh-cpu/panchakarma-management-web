// Mark notification as read - PATCH /patients/:id/notifications/:notificationId/read
import { type NextRequest, NextResponse } from "next/server"
import { withAuth } from "@/lib/middleware/auth"
import { NotificationModel } from "@/lib/models/notification"
import { canAccessResource } from "@/lib/auth"

export async function PATCH(request: NextRequest, { params }: { params: { id: string; notificationId: string } }) {
  return withAuth(request, async (request, user) => {
    const patientId = Number.parseInt(params.id)
    const notificationId = Number.parseInt(params.notificationId)

    if (isNaN(patientId) || isNaN(notificationId)) {
      return NextResponse.json({ error: "Invalid patient ID or notification ID" }, { status: 400 })
    }

    // Check if user can access this patient's data
    if (!canAccessResource(user, patientId, "patient")) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    try {
      const notification = await NotificationModel.markAsRead(notificationId)

      return NextResponse.json({
        message: "Notification marked as read",
        notification,
      })
    } catch (error) {
      console.error("Error marking notification as read:", error)
      return NextResponse.json({ error: "Failed to mark notification as read" }, { status: 500 })
    }
  })
}
