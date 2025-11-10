// Comprehensive validation utilities for forms and API data

export interface ValidationError {
  field: string
  message: string
}

export class ValidationError extends Error {
  constructor(public errors: ValidationError[]) {
    super("Validation failed")
    this.name = "ValidationError"
  }
}

// Email validation
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Password validation - min 6 chars, at least one uppercase, one lowercase, one number
export function validatePassword(password: string): { valid: boolean; message?: string } {
  if (password.length < 6) {
    return { valid: false, message: "Password must be at least 6 characters" }
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: "Password must contain at least one uppercase letter" }
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: "Password must contain at least one lowercase letter" }
  }
  if (!/\d/.test(password)) {
    return { valid: false, message: "Password must contain at least one number" }
  }
  return { valid: true }
}

// Name validation
export function validateName(name: string): boolean {
  return name.trim().length >= 2 && name.trim().length <= 100
}

// Phone validation (basic international format)
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-+$$$$]+$/
  return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10
}

// Age validation
export function validateAge(age: number): boolean {
  return age >= 18 && age <= 120
}

// Session duration validation
export function validateDuration(duration: number): boolean {
  return duration > 0 && duration <= 480 // max 8 hours
}

// Rating validation
export function validateRating(rating: number): boolean {
  return rating >= 1 && rating <= 5
}

// Feedback validation
export function validateFeedback(feedback: string): { valid: boolean; message?: string } {
  if (feedback.trim().length < 10) {
    return { valid: false, message: "Feedback must be at least 10 characters" }
  }
  if (feedback.length > 1000) {
    return { valid: false, message: "Feedback must not exceed 1000 characters" }
  }
  return { valid: true }
}

// Date validation - must be in future
export function validateFutureDate(dateString: string): { valid: boolean; message?: string } {
  const date = new Date(dateString)
  const now = new Date()

  if (isNaN(date.getTime())) {
    return { valid: false, message: "Invalid date format" }
  }

  if (date <= now) {
    return { valid: false, message: "Session date must be in the future" }
  }

  return { valid: true }
}

// Login form validation
export function validateLoginForm(email: string, password: string): ValidationError | null {
  const errors: ValidationError[] = []

  if (!email || !validateEmail(email)) {
    errors.push({ field: "email", message: "Please enter a valid email" })
  }

  if (!password) {
    errors.push({ field: "password", message: "Password is required" })
  }

  return errors.length > 0 ? new ValidationError(errors) : null
}

// Signup form validation
export function validateSignupForm(
  name: string,
  email: string,
  password: string,
  role: string,
): ValidationError | null {
  const errors: ValidationError[] = []

  if (!validateName(name)) {
    errors.push({ field: "name", message: "Name must be between 2 and 100 characters" })
  }

  if (!email || !validateEmail(email)) {
    errors.push({ field: "email", message: "Please enter a valid email" })
  }

  const passwordValidation = validatePassword(password)
  if (!passwordValidation.valid) {
    errors.push({ field: "password", message: passwordValidation.message || "Invalid password" })
  }

  if (!["patient", "practitioner"].includes(role)) {
    errors.push({ field: "role", message: "Please select a valid role" })
  }

  return errors.length > 0 ? new ValidationError(errors) : null
}

// Feedback form validation
export function validateFeedbackForm(rating: number, comments: string): ValidationError | null {
  const errors: ValidationError[] = []

  if (!validateRating(rating)) {
    errors.push({ field: "rating", message: "Please select a rating between 1 and 5" })
  }

  const feedbackValidation = validateFeedback(comments)
  if (!feedbackValidation.valid) {
    errors.push({ field: "comments", message: feedbackValidation.message || "Invalid feedback" })
  }

  return errors.length > 0 ? new ValidationError(errors) : null
}

// Booking form validation
export function validateBookingForm(
  sessionType: string,
  duration: number,
  date: string,
  time: string,
): ValidationError | null {
  const errors: ValidationError[] = []

  if (!sessionType || sessionType.trim().length === 0) {
    errors.push({ field: "sessionType", message: "Please select a session type" })
  }

  if (!validateDuration(duration)) {
    errors.push({ field: "duration", message: "Please select a valid duration" })
  }

  if (!date) {
    errors.push({ field: "date", message: "Please select a date" })
  }

  if (!time) {
    errors.push({ field: "time", message: "Please select a time" })
  }

  const dateTimeValidation = validateFutureDate(`${date}T${time}`)
  if (!dateTimeValidation.valid) {
    errors.push({ field: "dateTime", message: dateTimeValidation.message || "Invalid date/time" })
  }

  return errors.length > 0 ? new ValidationError(errors) : null
}
