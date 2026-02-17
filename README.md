# Interview Preparation Platform - CareerSprint

A full-stack interview preparation application built with Next.js, Node.js, and MongoDB.

## Features

- 🎯 **Landing Page**: Attractive landing page with feature overview
- 📝 **User Authentication**: Register and login functionality
- 📄 **CV Upload & Analysis**: Upload CV and get AI-powered insights
- 📋 **Practice Exams**: Take interview-style exams
- 📊 **Results & Evaluation**: View detailed exam results and feedback
- 🎓 **Interview Readiness**: Get personalized training recommendations
- 👨‍💼 **Admin Dashboard**: Manage users and view statistics

## Tech Stack

- **Frontend**: Next.js 14 with React and TypeScript
- **Backend**: Next.js API routes
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (to be implemented)
- **Styling**: Tailwind CSS
- **Linting**: ESLint

## Installation

### Prerequisites
- Node.js 18+ and npm
- MongoDB instance (local or cloud)

### Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file in the project root:
```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
AI_API_KEY=your_ai_api_key
```

3. Install additional dependencies:
```bash
npm install mongoose bcryptjs jsonwebtoken
npm install --save-dev @types/jsonwebtoken
```

## Running the Project

### Development
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production
```bash
npm run build
npm start
```

### ESLint
```bash
npm run lint
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/              # Authentication endpoints
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── cv/                # CV endpoints
│   │   │   ├── upload/
│   │   │   └── analyze/
│   │   └── exam/              # Exam endpoints
│   │       ├── submit/
│   │       └── results/
│   ├── auth/                  # Auth pages
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/             # User dashboard
│   ├── exam/                  # Exam page
│   ├── result/                # Results page
│   ├── admin/                 # Admin dashboard
│   ├── about/                 # About page
│   ├── features/              # Features page
│   ├── how-it-works/          # How it works page
│   └── page.tsx               # Landing page
├── components/                # Reusable components
├── lib/
│   └── db.ts                  # Database connection
├── models/
│   ├── User.ts
│   ├── CV.ts
│   └── ExamResult.ts
└── styles/                    # Global styles
```

## Available Routes

- `/` - Landing Page
- `/about` - About Us
- `/features` - Features
- `/how-it-works` - How It Works
- `/auth/login` - Login
- `/auth/register` - Register
- `/dashboard` - User Dashboard
- `/exam` - Practice Exam
- `/result` - Exam Results
- `/admin` - Admin Dashboard

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### CV Management
- `POST /api/cv/upload` - Upload CV
- `POST /api/cv/analyze` - Analyze CV with AI

### Exam
- `POST /api/exam/submit` - Submit exam answers
- `GET /api/exam/results` - Get exam results

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `NEXTAUTH_SECRET` | NextAuth secret for JWT signing |
| `NEXTAUTH_URL` | Application URL |
| `AI_API_KEY` | API key for AI service |

## Next Steps

1. Implement authentication with NextAuth.js or custom JWT
2. Connect MongoDB and implement database operations
3. Add file upload handling (multer/formidable)
4. Integrate AI service for CV analysis
5. Create exam question bank
6. Add email notifications
7. Implement payment gateway (if applicable)
8. Deploy to production

## Development Notes

- All API routes have TODO comments for actual implementation
- Database models are set up but not yet connected to API routes
- CV parsing and AI analysis are placeholder implementations
- Authentication flow needs to be implemented

## License

MIT

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
