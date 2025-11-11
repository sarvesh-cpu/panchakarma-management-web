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
    const { name, email, password, role } = body

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Create new user with simple storage
    const newUser = {
      id: DEMO_USERS.length + 1,
      name,
      email,
      password,
      role,
    }

    return NextResponse.json(
      {
        message: "User created successfully",
        user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
