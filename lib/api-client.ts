// Client-side API utilities for authentication
export class ApiClient {
  private baseUrl: string
  private token: string | null = null

  constructor(baseUrl = "/api") {
    this.baseUrl = baseUrl
    // Get token from localStorage if available
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("auth_token")
    }
  }

  // Set authentication token
  setToken(token: string) {
    this.token = token
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token)
    }
  }

  // Remove authentication token
  removeToken() {
    this.token = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token")
    }
  }

  // Make authenticated request
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Request failed")
    }

    return response.json()
  }

  // Authentication methods
  async signup(userData: { name: string; email: string; password: string; role: "patient" | "practitioner" }) {
    const response = await this.request("/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
    })

    if (response.token) {
      this.setToken(response.token)
    }

    return response
  }

  async login(credentials: { email: string; password: string }) {
    const response = await this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })

    if (response.token) {
      this.setToken(response.token)
    }

    return response
  }

  async logout() {
    this.removeToken()
  }

  async getProfile() {
    return this.request("/auth/profile")
  }

  async refreshToken() {
    const response = await this.request("/auth/refresh", {
      method: "POST",
    })

    if (response.token) {
      this.setToken(response.token)
    }

    return response
  }

  // Generic API methods
  async get(endpoint: string) {
    return this.request(endpoint)
  }

  async post(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async put(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async patch(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
  }

  async delete(endpoint: string) {
    return this.request(endpoint, {
      method: "DELETE",
    })
  }
}

// Export singleton instance
export const apiClient = new ApiClient()
