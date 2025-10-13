// General notifications endpoint - GET /notifications
import { type NextRequest, NextResponse } from "next/server"
import { withAuth } from "@/lib/middleware/auth"
import { NotificationModel } from "@/lib/models/notification"

export async function GET(request: NextRequest) {
  return withAuth(request, async (request, user) => {
    try {
      const { searchParams } = new URL(request.url)
      const limit = Number.parseInt(searchParams.get("limit") || "50")
      const type = searchParams.get("type")

      let notifications = await NotificationModel.getByUserId(user.id, limit)

      // Filter by type if specified
      if (type && ["pre-procedure", "post-procedure", "general"].includes(type)) {
        notifications = notifications.filter((notification) => notification.type === type)
      }

      const unreadCount = await NotificationModel.getUnreadCount(user.id)

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

// Create manual notification - POST /notifications
export async function POST(request: NextRequest) {
  return withAuth(request, async (request, user) => {
    // Only practitioners can create manual notifications
    if (user.role !== "practitioner") {
      return NextResponse.json({ error: "Only practitioners can create notifications" }, { status: 403 })
    }

    try {
      const body = await request.json()
      const { user_id, message, type, session_id } = body

      // Validation
      if (!user_id || !message || !type) {
        return NextResponse.json({ error: "User ID, message, and type are required" }, { status: 400 })
      }

      if (!["pre-procedure", "post-procedure", "general"].includes(type)) {
        return NextResponse.json(
          { error: "Type must be one of: pre-procedure, post-procedure, general" },
          { status: 400 },
        )
      }

      // Create notification
      const notification = await NotificationModel.create({
        user_id: Number.parseInt(user_id),
        message,
        type,
        session_id: session_id ? Number.parseInt(session_id) : undefined,
      })

      return NextResponse.json(
        {
          message: "Notification created successfully",
          notification,
        },
        { status: 201 },
      )
    } catch (error) {
      console.error("Error creating notification:", error)
      return NextResponse.json({ error: "Failed to create notification" }, { status: 500 })
    }
  })
}
