// JWT authentication utilities
import jwt from "jsonwebtoken"
import type { NextRequest } from "next/server"
import { UserModel } from "./models/user"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"
const JWT_EXPIRES_IN = "7d"

export interface JWTPayload {
  userId: number
  email: string
  role: "patient" | "practitioner"
}

// Generate JWT token
export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

// Verify JWT token
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload
    return decoded
  } catch (error) {
    return null
  }
}

// Extract token from request headers
export function extractTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null
  }
  return authHeader.substring(7)
}

// Get user from request token
export async function getUserFromRequest(request: NextRequest) {
  const token = extractTokenFromRequest(request)
  if (!token) {
    return null
  }

  const payload = verifyToken(token)
  if (!payload) {
    return null
  }

  const user = await UserModel.findById(payload.userId)
  return user
}

// Middleware function to check authentication
export async function requireAuth(request: NextRequest, requiredRole?: "patient" | "practitioner") {
  const user = await getUserFromRequest(request)

  if (!user) {
    return { error: "Authentication required", status: 401 }
  }

  if (requiredRole && user.role !== requiredRole) {
    return { error: "Insufficient permissions", status: 403 }
  }

  return { user }
}

// Check if user can access resource
export function canAccessResource(
  user: any,
  resourceUserId: number,
  resourceType: "patient" | "practitioner" | "any" = "any",
): boolean {
  // Practitioners can access their own resources and their patients' resources
  if (user.role === "practitioner") {
    return true // Will be further validated in specific endpoints
  }

  // Patients can only access their own resources
  if (user.role === "patient") {
    return user.id === resourceUserId
  }

  return false
}
