// Health check endpoint to verify database connectivity
import { type NextRequest, NextResponse } from "next/server"
import { healthCheck } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    console.log("[v0] Health check endpoint called")

    // Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        {
          status: "error",
          message: "DATABASE_URL environment variable is not set. Please configure your database connection.",
          timestamp: new Date().toISOString(),
        },
        { status: 503 },
      )
    }

    // Check database connectivity
    const dbHealth = await healthCheck()

    if (dbHealth.status === "healthy") {
      return NextResponse.json(
        {
          status: "healthy",
          database: dbHealth,
          environment: {
            NODE_ENV: process.env.NODE_ENV,
            databaseConfigured: !!process.env.DATABASE_URL,
            jwtConfigured: !!process.env.JWT_SECRET,
          },
          timestamp: new Date().toISOString(),
        },
        { status: 200 },
      )
    } else {
      return NextResponse.json(
        {
          status: "error",
          message: "Database connection failed",
          database: dbHealth,
          timestamp: new Date().toISOString(),
        },
        { status: 503 },
      )
    }
  } catch (error) {
    console.error("[v0] Health check error:", error)
    return NextResponse.json(
      {
        status: "error",
        message: "Health check failed",
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
