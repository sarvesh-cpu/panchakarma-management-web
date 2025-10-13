// Database connection and query utilities
import { Pool } from "pg"

// Database connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

// Generic query function with error handling
export async function query(text: string, params?: any[]) {
  const client = await pool.connect()
  try {
    const result = await client.query(text, params)
    return result
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  } finally {
    client.release()
  }
}

// Transaction helper
export async function transaction(callback: (client: any) => Promise<any>) {
  const client = await pool.connect()
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
    return { status: "healthy", timestamp: result.rows[0].now }
  } catch (error) {
    return { status: "unhealthy", error: error.message }
  }
}
