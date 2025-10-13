// General patients endpoint - GET /patients (for practitioners to view their patients)
import { type NextRequest, NextResponse } from "next/server"
import { withAuth } from "@/lib/middleware/auth"
import { UserModel } from "@/lib/models/user"

export async function GET(request: NextRequest) {
  return withAuth(request, async (request, user) => {
    // Only practitioners can view patient lists
    if (user.role !== "practitioner") {
      return NextResponse.json({ error: "Access denied. Only practitioners can view patient lists." }, { status: 403 })
    }

    try {
      const patients = await UserModel.getPatientsByPractitioner(user.id)

      return NextResponse.json({
        patients,
        total: patients.length,
      })
    } catch (error) {
      console.error("Error fetching patients:", error)
      return NextResponse.json({ error: "Failed to fetch patients" }, { status: 500 })
    }
  })
}
