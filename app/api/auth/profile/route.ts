// Get user profile endpoint
import { type NextRequest, NextResponse } from "next/server"
import { withAuth } from "@/lib/middleware/auth"

export async function GET(request: NextRequest) {
  return withAuth(request, async (request, user) => {
    // Return user profile without password
    const { password, ...userProfile } = user

    return NextResponse.json({
      user: userProfile,
    })
  })
}
