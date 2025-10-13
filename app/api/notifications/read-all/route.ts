// Mark all notifications as read - PATCH /notifications/read-all
import { type NextRequest, NextResponse } from "next/server"
import { withAuth } from "@/lib/middleware/auth"
import { NotificationModel } from "@/lib/models/notification"

export async function PATCH(request: NextRequest) {
  return withAuth(request, async (request, user) => {
    try {
      await NotificationModel.markAllAsRead(user.id)

      return NextResponse.json({
        message: "All notifications marked as read",
      })
    } catch (error) {
      console.error("Error marking all notifications as read:", error)
      return NextResponse.json({ error: "Failed to mark notifications as read" }, { status: 500 })
    }
  })
}
