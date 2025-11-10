// API Testing Utilities for Deployment Verification
export const API_ENDPOINTS = {
  auth: {
    signup: "/api/auth/signup",
    login: "/api/auth/login",
    profile: "/api/auth/profile",
    refresh: "/api/auth/refresh",
  },
  patients: {
    list: "/api/patients",
    dashboard: (id: string) => `/api/patients/${id}/dashboard`,
    sessions: (id: string) => `/api/patients/${id}/sessions`,
    feedback: (id: string) => `/api/patients/${id}/feedback`,
    notifications: (id: string) => `/api/patients/${id}/notifications`,
  },
  practitioners: {
    list: "/api/practitioners",
    dashboard: (id: string) => `/api/practitioners/${id}/dashboard`,
    patients: (id: string) => `/api/practitioners/${id}/patients`,
    feedback: (id: string) => `/api/practitioners/${id}/feedback`,
    schedule: (id: string) => `/api/practitioners/${id}/schedule`,
  },
  sessions: {
    list: "/api/sessions",
    create: "/api/sessions",
    calendar: "/api/sessions/calendar",
    detail: (id: string) => `/api/sessions/${id}`,
  },
  notifications: {
    list: "/api/notifications",
    markRead: (id: string) => `/api/notifications/${id}/read`,
    readAll: "/api/notifications/read-all",
  },
}

export interface TestRequest {
  method: "GET" | "POST" | "PUT" | "DELETE"
  endpoint: string
  token?: string
  body?: Record<string, any>
  expectedStatus?: number
}

export interface TestResult {
  endpoint: string
  status: string
  statusCode: number
  message: string
  error?: string
  responseTime: number
}

export async function testAPI(request: TestRequest): Promise<TestResult> {
  const startTime = Date.now()
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  }

  if (request.token) {
    headers["Authorization"] = `Bearer ${request.token}`
  }

  try {
    const response = await fetch(request.endpoint, {
      method: request.method,
      headers,
      body: request.body ? JSON.stringify(request.body) : undefined,
    })

    const data = await response.json().catch(() => null)
    const responseTime = Date.now() - startTime

    const passed = !request.expectedStatus || response.status === request.expectedStatus

    return {
      endpoint: request.endpoint,
      status: passed ? "PASS" : "FAIL",
      statusCode: response.status,
      message: data?.message || (passed ? "Success" : "Unexpected status"),
      error: data?.error,
      responseTime,
    }
  } catch (error) {
    return {
      endpoint: request.endpoint,
      status: "ERROR",
      statusCode: 0,
      message: "Request failed",
      error: error instanceof Error ? error.message : "Unknown error",
      responseTime: Date.now() - startTime,
    }
  }
}

export async function runFullAPITest(token: string, userId: string): Promise<TestResult[]> {
  const results: TestResult[] = []

  // Test authentication endpoints
  results.push(
    await testAPI({
      method: "GET",
      endpoint: API_ENDPOINTS.auth.profile,
      token,
      expectedStatus: 200,
    }),
  )

  // Test patient endpoints
  results.push(
    await testAPI({
      method: "GET",
      endpoint: API_ENDPOINTS.patients.dashboard(userId),
      token,
      expectedStatus: 200,
    }),
  )

  results.push(
    await testAPI({
      method: "GET",
      endpoint: API_ENDPOINTS.patients.sessions(userId),
      token,
      expectedStatus: 200,
    }),
  )

  results.push(
    await testAPI({
      method: "GET",
      endpoint: API_ENDPOINTS.patients.notifications(userId),
      token,
      expectedStatus: 200,
    }),
  )

  // Test notification endpoints
  results.push(
    await testAPI({
      method: "GET",
      endpoint: API_ENDPOINTS.notifications.list,
      token,
      expectedStatus: 200,
    }),
  )

  // Test sessions endpoint
  results.push(
    await testAPI({
      method: "GET",
      endpoint: API_ENDPOINTS.sessions.calendar,
      token,
      expectedStatus: 200,
    }),
  )

  return results
}
