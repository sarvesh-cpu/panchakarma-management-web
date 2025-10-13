// Notification model for user notifications
import { query } from "../database"

export interface Notification {
  id: number
  user_id: number
  message: string
  type: "pre-procedure" | "post-procedure" | "general"
  is_read: boolean
  session_id?: number
  created_at: Date
}

export interface CreateNotificationData {
  user_id: number
  message: string
  type: "pre-procedure" | "post-procedure" | "general"
  session_id?: number
}

export class NotificationModel {
  // Create a new notification
  static async create(notificationData: CreateNotificationData): Promise<Notification> {
    const result = await query(
      `INSERT INTO notifications (user_id, message, type, session_id) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [notificationData.user_id, notificationData.message, notificationData.type, notificationData.session_id],
    )

    return result.rows[0]
  }

  // Get notifications by user ID
  static async getByUserId(userId: number, limit = 50): Promise<Notification[]> {
    const result = await query(
      `SELECT * FROM notifications 
       WHERE user_id = $1 
       ORDER BY created_at DESC 
       LIMIT $2`,
      [userId, limit],
    )

    return result.rows
  }

  // Mark notification as read
  static async markAsRead(notificationId: number): Promise<Notification> {
    const result = await query(
      `UPDATE notifications 
       SET is_read = true 
       WHERE id = $1 
       RETURNING *`,
      [notificationId],
    )

    return result.rows[0]
  }

  // Mark all notifications as read for a user
  static async markAllAsRead(userId: number): Promise<void> {
    await query("UPDATE notifications SET is_read = true WHERE user_id = $1", [userId])
  }

  // Get unread count for a user
  static async getUnreadCount(userId: number): Promise<number> {
    const result = await query("SELECT COUNT(*) as count FROM notifications WHERE user_id = $1 AND is_read = false", [
      userId,
    ])

    return Number.parseInt(result.rows[0].count)
  }

  // Create automatic notifications for a session
  static async createSessionNotifications(sessionId: number, patientId: number, therapyType: string): Promise<void> {
    const preMessage = this.getPreProcedureMessage(therapyType)
    const postMessage = this.getPostProcedureMessage(therapyType)

    // Create pre-procedure notification
    await this.create({
      user_id: patientId,
      message: preMessage,
      type: "pre-procedure",
      session_id: sessionId,
    })

    // Create post-procedure notification (will be sent after session completion)
    await this.create({
      user_id: patientId,
      message: postMessage,
      type: "post-procedure",
      session_id: sessionId,
    })
  }

  // Get therapy-specific pre-procedure messages
  private static getPreProcedureMessage(therapyType: string): string {
    const messages: { [key: string]: string } = {
      "Abhyanga (Oil Massage)":
        "Preparation: Please avoid heavy meals 2 hours before your oil massage. Wear comfortable clothing.",
      "Shirodhara (Oil Pouring)": "Important: Avoid washing hair on the day of treatment. Arrive with clean, dry hair.",
      "Panchakarma Detox":
        "Preparation: Follow the pre-detox diet plan. Avoid heavy, oily, and cold foods 24 hours before treatment.",
      "Udvartana (Herbal Powder Massage)":
        "Reminder: Drink warm water and avoid cold beverages before your herbal powder massage.",
      "Nasya (Nasal Therapy)":
        "Important: Please inform us of any nasal congestion or allergies before your nasal therapy session.",
      "Karna Purana (Ear Treatment)":
        "Preparation: Avoid using ear drops or cleaning ears before your ear treatment session.",
    }

    return messages[therapyType] || "Please follow general pre-treatment guidelines and arrive 15 minutes early."
  }

  // Get therapy-specific post-procedure messages
  private static getPostProcedureMessage(therapyType: string): string {
    const messages: { [key: string]: string } = {
      "Abhyanga (Oil Massage)":
        "Post-treatment: Avoid cold water and maintain warmth for 2 hours. Drink warm herbal tea.",
      "Shirodhara (Oil Pouring)":
        "After treatment: Rest for 30 minutes, avoid washing hair for 6 hours, maintain calm environment.",
      "Panchakarma Detox":
        "Post-detox care: Follow the prescribed diet plan. Drink warm water and avoid heavy foods for 24 hours.",
      "Udvartana (Herbal Powder Massage)":
        "After treatment: Take a warm shower after 30 minutes. Avoid cold foods and drinks.",
      "Nasya (Nasal Therapy)":
        "Post-treatment: Avoid cold air and water. Do not blow your nose forcefully for 2 hours.",
      "Karna Purana (Ear Treatment)": "After treatment: Keep ears warm and dry. Avoid water contact for 4 hours.",
    }

    return messages[therapyType] || "Please follow general post-treatment care instructions and stay hydrated."
  }
}
