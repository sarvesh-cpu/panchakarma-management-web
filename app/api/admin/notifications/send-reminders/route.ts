// Admin endpoint to trigger notification sending - POST /admin/notifications/send-reminders
import { type NextRequest, NextResponse } from "next/server"
import { withAuth } from "@/lib/middleware/auth"
import { NotificationService } from "@/lib/services/notification-service"

export async function POST(request: NextRequest) {
  return withAuth(request, async (request, user) => {
    // Only practitioners can trigger admin functions (in a real app, you'd have admin role)
    if (user.role !== "practitioner") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    try {
      const body = await request.json()
      const { type } = body

      switch (type) {
        case "upcoming-sessions":
          await NotificationService.sendUpcomingSessionReminders()
          break
        case "post-session":
          await NotificationService.sendPostSessionNotifications()
          break
        case "wellness-tips":
          await NotificationService.sendWeeklyWellnessTips()
          break
        default:
          return NextResponse.json({ error: "Invalid notification type" }, { status: 400 })
      }

      return NextResponse.json({
        message: `${type} notifications sent successfully`,
      })
    } catch (error) {
      console.error("Error sending notifications:", error)
      return NextResponse.json({ error: "Failed to send notifications" }, { status: 500 })
    }
  })
}
