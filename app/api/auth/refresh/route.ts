// Token refresh endpoint
import { type NextRequest, NextResponse } from "next/server"
import { withAuth } from "@/lib/middleware/auth"
import { generateToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  return withAuth(request, async (request, user) => {
    // Generate new token
    const newToken = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    return NextResponse.json({
      message: "Token refreshed successfully",
      token: newToken,
    })
  })
}
