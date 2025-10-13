// Notification service for automated notifications
import { NotificationModel } from "@/lib/models/notification"
import { SessionModel } from "@/lib/models/session"

export class NotificationService {
  // Send reminder notifications for upcoming sessions
  static async sendUpcomingSessionReminders() {
    try {
      // Get sessions for tomorrow
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const tomorrowDate = tomorrow.toISOString().split("T")[0]

      const upcomingSessions = await SessionModel.getCalendarSessions(tomorrowDate, tomorrowDate)
      const scheduledSessions = upcomingSessions.filter((session) => session.status === "scheduled")

      for (const session of scheduledSessions) {
        // Check if reminder notification already exists
        const existingNotifications = await NotificationModel.getByUserId(session.patient_id, 100)
        const hasReminder = existingNotifications.some(
          (notification) =>
            notification.session_id === session.id &&
            notification.type === "pre-procedure" &&
            notification.message.includes("tomorrow"),
        )

        if (!hasReminder) {
          await NotificationModel.create({
            user_id: session.patient_id,
            message: `Reminder: You have a ${session.type_of_therapy} session tomorrow at ${session.time} with ${session.practitioner_name}. Please follow pre-treatment guidelines.`,
            type: "pre-procedure",
            session_id: session.id,
          })
        }
      }

      console.log(`Sent reminders for ${scheduledSessions.length} upcoming sessions`)
    } catch (error) {
      console.error("Error sending session reminders:", error)
    }
  }

  // Send post-session care notifications
  static async sendPostSessionNotifications() {
    try {
      // Get sessions completed today
      const today = new Date().toISOString().split("T")[0]
      const todaySessions = await SessionModel.getCalendarSessions(today, today)
      const completedSessions = todaySessions.filter((session) => session.status === "completed")

      for (const session of completedSessions) {
        // Check if post-care notification already exists
        const existingNotifications = await NotificationModel.getByUserId(session.patient_id, 100)
        const hasPostCare = existingNotifications.some(
          (notification) =>
            notification.session_id === session.id &&
            notification.type === "post-procedure" &&
            notification.message.includes("completed"),
        )

        if (!hasPostCare) {
          await NotificationModel.create({
            user_id: session.patient_id,
            message: `Your ${session.type_of_therapy} session has been completed. Please follow the post-treatment care instructions and stay hydrated.`,
            type: "post-procedure",
            session_id: session.id,
          })
        }
      }

      console.log(`Sent post-care notifications for ${completedSessions.length} completed sessions`)
    } catch (error) {
      console.error("Error sending post-session notifications:", error)
    }
  }

  // Send weekly wellness tips
  static async sendWeeklyWellnessTips() {
    try {
      const wellnessTips = [
        "Remember to drink warm water throughout the day to support your digestive fire (Agni).",
        "Practice deep breathing exercises for 10 minutes daily to balance your doshas.",
        "Eat your largest meal at midday when your digestive fire is strongest.",
        "Try to sleep by 10 PM and wake up before sunrise for optimal health.",
        "Include all six tastes (sweet, sour, salty, pungent, bitter, astringent) in your meals.",
        "Practice oil pulling with sesame oil for 10-15 minutes each morning.",
        "Take a few minutes each day for meditation or mindfulness practice.",
      ]

      const randomTip = wellnessTips[Math.floor(Math.random() * wellnessTips.length)]

      // This would typically be called for all active patients
      // For now, it's a placeholder for the service structure
      console.log("Weekly wellness tip:", randomTip)
    } catch (error) {
      console.error("Error sending wellness tips:", error)
    }
  }
}
