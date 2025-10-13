// Session model for therapy appointments
import { query } from "../database"

export interface Session {
  id: number
  patient_id: number
  practitioner_id: number
  date: string
  time: string
  type_of_therapy: string
  status: "scheduled" | "completed" | "cancelled"
  notes?: string
  created_at: Date
  updated_at: Date
  // Joined fields
  patient_name?: string
  practitioner_name?: string
}

export interface CreateSessionData {
  patient_id: number
  practitioner_id: number
  date: string
  time: string
  type_of_therapy: string
  notes?: string
}

export class SessionModel {
  // Create a new session
  static async create(sessionData: CreateSessionData): Promise<Session> {
    const result = await query(
      `INSERT INTO sessions (patient_id, practitioner_id, date, time, type_of_therapy, notes) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [
        sessionData.patient_id,
        sessionData.practitioner_id,
        sessionData.date,
        sessionData.time,
        sessionData.type_of_therapy,
        sessionData.notes,
      ],
    )

    return result.rows[0]
  }

  // Get sessions by patient ID
  static async getByPatientId(patientId: number): Promise<Session[]> {
    const result = await query(
      `SELECT s.*, u.name as practitioner_name 
       FROM sessions s 
       JOIN users u ON s.practitioner_id = u.id 
       WHERE s.patient_id = $1 
       ORDER BY s.date DESC, s.time DESC`,
      [patientId],
    )

    return result.rows
  }

  // Get sessions by practitioner ID
  static async getByPractitionerId(practitionerId: number): Promise<Session[]> {
    const result = await query(
      `SELECT s.*, u.name as patient_name 
       FROM sessions s 
       JOIN users u ON s.patient_id = u.id 
       WHERE s.practitioner_id = $1 
       ORDER BY s.date DESC, s.time DESC`,
      [practitionerId],
    )

    return result.rows
  }

  // Update session status
  static async updateStatus(
    sessionId: number,
    status: "scheduled" | "completed" | "cancelled",
    notes?: string,
  ): Promise<Session> {
    const result = await query(
      `UPDATE sessions 
       SET status = $1, notes = COALESCE($2, notes), updated_at = CURRENT_TIMESTAMP 
       WHERE id = $3 
       RETURNING *`,
      [status, notes, sessionId],
    )

    return result.rows[0]
  }

  // Get calendar view of all sessions
  static async getCalendarSessions(startDate?: string, endDate?: string): Promise<Session[]> {
    let queryText = `
      SELECT s.*, 
             p.name as patient_name, 
             pr.name as practitioner_name 
      FROM sessions s 
      JOIN users p ON s.patient_id = p.id 
      JOIN users pr ON s.practitioner_id = pr.id
    `

    const params: any[] = []

    if (startDate && endDate) {
      queryText += " WHERE s.date BETWEEN $1 AND $2"
      params.push(startDate, endDate)
    }

    queryText += " ORDER BY s.date, s.time"

    const result = await query(queryText, params)
    return result.rows
  }

  // Get session by ID with user details
  static async getById(sessionId: number): Promise<Session | null> {
    const result = await query(
      `SELECT s.*, 
             p.name as patient_name, 
             pr.name as practitioner_name 
       FROM sessions s 
       JOIN users p ON s.patient_id = p.id 
       JOIN users pr ON s.practitioner_id = pr.id 
       WHERE s.id = $1`,
      [sessionId],
    )

    return result.rows[0] || null
  }
}
