// User model with database operations
import { query } from "../database"
import { hash, compare } from "bcrypt-ts"

export interface User {
  id: number
  name: string
  email: string
  password: string
  role: "patient" | "practitioner"
  created_at: Date
  updated_at: Date
}

export interface CreateUserData {
  name: string
  email: string
  password: string
  role: "patient" | "practitioner"
}

export class UserModel {
  // Create a new user
  static async create(userData: CreateUserData): Promise<User> {
    const hashedPassword = await hash(userData.password, 10)

    const result = await query(
      `INSERT INTO users (name, email, password, role) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, name, email, role, created_at, updated_at`,
      [userData.name, userData.email, hashedPassword, userData.role],
    )

    return result.rows[0]
  }

  // Find user by email
  static async findByEmail(email: string): Promise<User | null> {
    const result = await query("SELECT * FROM users WHERE email = $1", [email])

    return result.rows[0] || null
  }

  // Find user by ID
  static async findById(id: number): Promise<User | null> {
    const result = await query("SELECT id, name, email, role, created_at, updated_at FROM users WHERE id = $1", [id])

    return result.rows[0] || null
  }

  // Verify password
  static async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return compare(plainPassword, hashedPassword)
  }

  // Get all practitioners
  static async getPractitioners(): Promise<User[]> {
    const result = await query("SELECT id, name, email, role, created_at FROM users WHERE role = $1 ORDER BY name", [
      "practitioner",
    ])

    return result.rows
  }

  // Get all patients for a practitioner
  static async getPatientsByPractitioner(practitionerId: number): Promise<User[]> {
    const result = await query(
      `SELECT DISTINCT u.id, u.name, u.email, u.role, u.created_at 
       FROM users u 
       JOIN sessions s ON u.id = s.patient_id 
       WHERE s.practitioner_id = $1 AND u.role = 'patient'
       ORDER BY u.name`,
      [practitionerId],
    )

    return result.rows
  }
}
