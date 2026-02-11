# Interview Preparation Platform - Development Setup

## Project Overview
Full-stack interview preparation application with the following workflow:
1. Landing page
2. User registration/login
3. CV upload and parsing
4. AI-powered CV analysis
5. Interview exam/practice
6. Results evaluation
7. Interview readiness assessment
8. Personalized training recommendations

## Tech Stack
- **Frontend**: Next.js (React) with TypeScript
- **Backend**: Node.js with Next.js API routes
- **Database**: MongoDB
- **Authentication**: JWT-based with NextAuth.js
- **Styling**: Tailwind CSS
- **Linting**: ESLint

## Project Setup Checklist

- [x] Create copilot-instructions.md
- [x] Scaffold Next.js project
- [x] Customize project structure with pages and components
- [x] Install required dependencies (will be added as needed)
- [x] Compile and verify no errors
- [x] Create development task
- [x] Update README with setup instructions

## Development Guidelines

### Project Structure
```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API routes
│   │   ├── auth/       # Authentication endpoints
│   │   ├── cv/         # CV upload and analysis endpoints
│   │   └── exam/       # Exam and results endpoints
│   ├── auth/           # Auth pages (login, register)
│   ├── dashboard/      # User dashboard
│   └── page.tsx        # Landing page
├── components/         # Reusable React components
├── lib/               # Utility functions and configurations
├── models/            # MongoDB models
└── styles/            # Global styles
```

### Key Features to Implement
1. User authentication and authorization
2. File upload handling for CVs
3. AI integration for CV analysis
4. Exam system with questions and scoring
5. Results dashboard with recommendations
6. User profile management

### Environment Variables
Create a `.env.local` file with:
- `MONGODB_URI`: MongoDB connection string
- `NEXTAUTH_SECRET`: Secret for NextAuth
- `NEXTAUTH_URL`: Application URL
- `AI_API_KEY`: External AI service key (if applicable)

### Running the Project
```bash
npm install              # Install dependencies
npm run dev             # Start development server
npm run build           # Build for production
npm run lint            # Run ESLint
```

The application will be available at `http://localhost:3000`

## Database Models
- User (email, password, profile info)
- CV (file metadata, analysis results)
- Exam (questions, user answers, scores)
- ExamResult (evaluation details, recommendations)
