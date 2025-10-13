// Feedback model for patient reviews
import { query } from "../database"

export interface Feedback {
  id: number
  patient_id: number
  session_id: number
  feedback_text: string
  rating: number
  created_at: Date
  // Joined fields
  patient_name?: string
  session_date?: string
  session_time?: string
  therapy_type?: string
}

export interface CreateFeedbackData {
  patient_id: number
  session_id: number
  feedback_text: string
  rating: number
}

export class FeedbackModel {
  // Create new feedback
  static async create(feedbackData: CreateFeedbackData): Promise<Feedback> {
    const result = await query(
      `INSERT INTO feedback (patient_id, session_id, feedback_text, rating) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [feedbackData.patient_id, feedbackData.session_id, feedbackData.feedback_text, feedbackData.rating],
    )

    return result.rows[0]
  }

  // Get feedback by patient ID
  static async getByPatientId(patientId: number): Promise<Feedback[]> {
    const result = await query(
      `SELECT f.*, s.date as session_date, s.time as session_time, s.type_of_therapy as therapy_type 
       FROM feedback f 
       JOIN sessions s ON f.session_id = s.id 
       WHERE f.patient_id = $1 
       ORDER BY f.created_at DESC`,
      [patientId],
    )

    return result.rows
  }

  // Get feedback for practitioner's sessions
  static async getByPractitionerId(practitionerId: number): Promise<Feedback[]> {
    const result = await query(
      `SELECT f.*, u.name as patient_name, s.date as session_date, s.time as session_time, s.type_of_therapy as therapy_type 
       FROM feedback f 
       JOIN sessions s ON f.session_id = s.id 
       JOIN users u ON f.patient_id = u.id 
       WHERE s.practitioner_id = $1 
       ORDER BY f.created_at DESC`,
      [practitionerId],
    )

    return result.rows
  }

  // Get feedback by session ID
  static async getBySessionId(sessionId: number): Promise<Feedback | null> {
    const result = await query(
      `SELECT f.*, u.name as patient_name 
       FROM feedback f 
       JOIN users u ON f.patient_id = u.id 
       WHERE f.session_id = $1`,
      [sessionId],
    )

    return result.rows[0] || null
  }

  // Get average rating for a practitioner
  static async getAverageRatingByPractitioner(practitionerId: number): Promise<number> {
    const result = await query(
      `SELECT AVG(f.rating) as avg_rating 
       FROM feedback f 
       JOIN sessions s ON f.session_id = s.id 
       WHERE s.practitioner_id = $1`,
      [practitionerId],
    )

    return Number.parseFloat(result.rows[0].avg_rating) || 0
  }

  // Get feedback statistics
  static async getFeedbackStats(practitionerId?: number): Promise<any> {
    let queryText = `
      SELECT 
        COUNT(*) as total_feedback,
        AVG(f.rating) as avg_rating,
        COUNT(CASE WHEN f.rating = 5 THEN 1 END) as five_star,
        COUNT(CASE WHEN f.rating = 4 THEN 1 END) as four_star,
        COUNT(CASE WHEN f.rating = 3 THEN 1 END) as three_star,
        COUNT(CASE WHEN f.rating = 2 THEN 1 END) as two_star,
        COUNT(CASE WHEN f.rating = 1 THEN 1 END) as one_star
      FROM feedback f
    `

    const params: any[] = []

    if (practitionerId) {
      queryText += ` JOIN sessions s ON f.session_id = s.id WHERE s.practitioner_id = $1`
      params.push(practitionerId)
    }

    const result = await query(queryText, params)
    return result.rows[0]
  }
}
