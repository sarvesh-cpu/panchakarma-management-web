// Mark notification as read - PATCH /notifications/:id/read
import { type NextRequest, NextResponse } from "next/server"
import { withAuth } from "@/lib/middleware/auth"
import { NotificationModel } from "@/lib/models/notification"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  return withAuth(request, async (request, user) => {
    const notificationId = Number.parseInt(params.id)

    if (isNaN(notificationId)) {
      return NextResponse.json({ error: "Invalid notification ID" }, { status: 400 })
    }

    try {
      // Get notification to verify ownership
      const notifications = await NotificationModel.getByUserId(user.id, 1000)
      const notification = notifications.find((n) => n.id === notificationId)

      if (!notification) {
        return NextResponse.json({ error: "Notification not found or access denied" }, { status: 404 })
      }

      const updatedNotification = await NotificationModel.markAsRead(notificationId)

      return NextResponse.json({
        message: "Notification marked as read",
        notification: updatedNotification,
      })
    } catch (error) {
      console.error("Error marking notification as read:", error)
      return NextResponse.json({ error: "Failed to mark notification as read" }, { status: 500 })
    }
  })
}
