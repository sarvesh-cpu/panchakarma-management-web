# API Testing Guide for Deployment

## Demo Credentials

### Patient Account
- **Email:** rajesh.patient@panchakarma.com
- **Password:** Password123
- **User ID:** patient-001

### Practitioner Account
- **Email:** dr.amit@panchakarma.com
- **Password:** Password123
- **User ID:** practitioner-001

## Testing Workflow

### 1. Authentication
1. Login with patient credentials to get token
2. Use token for subsequent patient API calls
3. Login with practitioner credentials to get token
4. Use token for subsequent practitioner API calls

### 2. Patient APIs
- GET `/api/patients/patient-001/dashboard` - Get patient dashboard data
- GET `/api/patients/patient-001/sessions` - Get patient sessions
- GET `/api/patients/patient-001/feedback` - Get patient feedback
- GET `/api/patients/patient-001/notifications` - Get patient notifications

### 3. Practitioner APIs
- GET `/api/practitioners/practitioner-001/dashboard` - Get practitioner dashboard
- GET `/api/practitioners/practitioner-001/patients` - Get all patients
- GET `/api/practitioners/practitioner-001/feedback` - Get feedback reviews
- GET `/api/practitioners/practitioner-001/schedule` - Get schedule

### 4. Sessions APIs
- GET `/api/sessions/calendar` - Get calendar view
- GET `/api/sessions/session-001` - Get session details
- POST `/api/sessions` - Create new session

### 5. Notifications APIs
- GET `/api/notifications` - Get all notifications
- POST `/api/notifications/{id}/read` - Mark as read
- POST `/api/notifications/read-all` - Mark all as read

## Expected Responses

All successful API calls should return:
- Status code: 200 (GET), 201 (POST), 204 (DELETE)
- Content-Type: application/json
- Response includes relevant data structure

Error responses should include:
- Status code: 400, 401, 403, 404, or 500
- Error message explaining the issue
