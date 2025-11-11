// Authentication middleware for API routes
import { type NextRequest, NextResponse } from "next/server"
import { requireAuth } from "../auth"

export async function withAuth(
  request: NextRequest,
  handler: (request: NextRequest, user: any) => Promise<NextResponse>,
  requiredRole?: "patient" | "practitioner",
) {
  const authResult = await requireAuth(request, requiredRole)

  if ("error" in authResult) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status })
  }

  return handler(request, authResult.user)
}

// Validation helpers
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string): { valid: boolean; message?: string } {
  if (password.length < 6) {
    return { valid: false, message: "Password must be at least 6 characters long" }
  }
  return { valid: true }
}

export function validateRole(role: string): role is "patient" | "practitioner" {
  return role === "patient" || role === "practitioner"
}
