import { type NextRequest, NextResponse } from "next/server"

// Demo users database
const DEMO_USERS = [
  {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh.patient@panchakarma.com",
    password: "Password123",
    role: "patient" as const,
  },
  {
    id: 2,
    name: "Dr. Amit Sharma",
    email: "dr.amit@panchakarma.com",
    password: "Password123",
    role: "practitioner" as const,
  },
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find user in demo database
    const user = DEMO_USERS.find((u) => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Return user data
    return NextResponse.json({
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
