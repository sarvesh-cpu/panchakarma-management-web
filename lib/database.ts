// Database connection and query utilities
import { Pool, type PoolClient } from "pg"

// Database connection pool with fallback error handling
let pool: Pool | null = null

function createPool() {
  if (!process.env.DATABASE_URL) {
    console.error("[v0] DATABASE_URL environment variable not set")
    return null
  }

  try {
    return new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
      // Limit connections to prevent resource exhaustion
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    })
  } catch (error) {
    console.error("[v0] Failed to create database pool:", error)
    return null
  }
}

// Get or create pool
function getPool() {
  if (!pool) {
    pool = createPool()
  }
  return pool
}

// Generic query function with error handling
export async function query(text: string, params?: any[]) {
  const currentPool = getPool()

  if (!currentPool) {
    throw new Error("Database pool not initialized. DATABASE_URL environment variable must be set.")
  }

  let client: PoolClient | null = null
  try {
    client = await currentPool.connect()
    console.log("[v0] Database connected successfully")
    const result = await client.query(text, params)
    return result
  } catch (error) {
    console.error("[v0] Database query error:", error)
    throw error
  } finally {
    if (client) {
      client.release()
    }
  }
}

// Transaction helper
export async function transaction(callback: (client: PoolClient) => Promise<any>) {
  const currentPool = getPool()

  if (!currentPool) {
    throw new Error("Database pool not initialized")
  }

  const client = await currentPool.connect()
  try {
    await client.query("BEGIN")
    const result = await callback(client)
    await client.query("COMMIT")
    return result
  } catch (error) {
    await client.query("ROLLBACK")
    throw error
  } finally {
    client.release()
  }
}

// Health check function
export async function healthCheck() {
  try {
    const result = await query("SELECT NOW()")
    return {
      status: "healthy",
      timestamp: result.rows[0].now,
      message: "Database connection successful",
    }
  } catch (error) {
    return {
      status: "unhealthy",
      error: error instanceof Error ? error.message : String(error),
      message: "Database connection failed",
    }
  }
}
