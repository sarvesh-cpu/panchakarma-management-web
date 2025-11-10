# Panchakarma Management Web App - Deployment Guide

## Quick Start

### For Testing Locally
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in `.env.local`
4. Run database migrations: `npm run db:migrate`
5. Seed test data: `npm run db:seed`
6. Start development server: `npm run dev`

### Demo Credentials
- **Patient Account:**
  - Email: rajesh.patient@panchakarma.com
  - Password: Password123

- **Practitioner Account:**
  - Email: dr.amit@panchakarma.com
  - Password: Password123

## Deployment to Vercel

### Prerequisites
- GitHub account with repository
- Neon PostgreSQL database (free tier available)
- Vercel account

### Step 1: Database Setup
1. Create a Neon project at https://console.neon.tech
2. Create a database
3. Copy the connection string
4. Keep this for Vercel environment variables

### Step 2: Deploy to Vercel
1. Push code to GitHub
2. Go to https://vercel.com/new
3. Import the repository
4. Add environment variables:
   - `DATABASE_URL`: Your Neon connection string
   - `JWT_SECRET`: A secure random string (e.g., `openssl rand -base64 32`)
   - `NODE_ENV`: Set to `production`
5. Click Deploy

### Step 3: Run Migrations
After deployment, run migrations on production:
\`\`\`bash
# In your local terminal
NEON_DATABASE_URL="your_production_db_url" npm run db:migrate
\`\`\`

## Features Included

✅ User authentication (patient & practitioner)
✅ Role-based dashboards
✅ Session scheduling
✅ Progress tracking
✅ Feedback system
✅ Notifications
✅ Analytics dashboard
✅ Fully responsive design
✅ Error handling
✅ Input validation

## Database Tables

- **users** - Patient and practitioner accounts
- **sessions** - Therapy sessions
- **feedback** - Patient reviews
- **notifications** - System notifications

## API Endpoints

### Auth
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user
- `POST /api/auth/refresh` - Refresh token

### Patient
- `GET /api/patients/{id}/dashboard` - Patient dashboard
- `GET /api/patients/{id}/sessions` - Patient sessions
- `GET /api/patients/{id}/feedback` - Patient feedback history
- `POST /api/patients/{id}/feedback` - Submit feedback

### Practitioner
- `GET /api/practitioners/{id}/dashboard` - Practitioner dashboard
- `GET /api/practitioners/{id}/patients` - List of patients
- `GET /api/practitioners/{id}/feedback` - Patient feedback

### Sessions
- `GET /api/sessions/calendar` - Calendar view
- `POST /api/sessions` - Create session
- `GET /api/sessions/{id}` - Session details

## Troubleshooting

### Database Connection Error
- Check DATABASE_URL in environment variables
- Verify Neon database is running
- Test connection manually

### Authentication Issues
- Verify JWT_SECRET is set
- Check token expiration
- Clear browser localStorage

### API Errors
- Check server logs in Vercel
- Verify all environment variables are set
- Test endpoints with API client

## Performance Tips

- Use edge caching for static assets
- Implement lazy loading for images
- Optimize database queries
- Use connection pooling (included with Neon)

## Security Considerations

- All passwords are hashed with bcryptjs
- JWT tokens have expiration
- Row-level security on database (can be added)
- Input validation on all forms
- HTTPS enforced by default on Vercel

## Support & Maintenance

For issues or questions:
1. Check the API_TEST_GUIDE.md
2. Review error logs
3. Test with demo credentials
4. Check database connectivity
