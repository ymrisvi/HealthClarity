# Medical Report Assistant

## Overview

This is a full-stack web application that helps users understand medical reports and get information about medicines in simple, non-technical language. The application allows users to upload medical reports (images or PDFs), which are then analyzed using AI to provide easy-to-understand explanations. Users can also search for medicine information to learn about what medications do and their effects.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with clear separation between frontend and backend components:

### Authentication & Usage Control
- **Replit Auth**: OpenID Connect integration with social login support (Google, GitHub, X/Twitter, Apple, Email)
- **Usage Limits**: Anonymous users get 1 free analysis, authenticated users have unlimited access
- **Session Management**: PostgreSQL-backed session storage with automatic refresh tokens
- **Social Login UI**: Enhanced login interface showcasing available social authentication providers
- **Admin Portal**: Role-based access control with comprehensive user analytics and activity tracking

### Admin Dashboard Features
- **User Management**: Complete user list with usage statistics, visit counts, and admin status
- **Real-time Analytics**: Daily and total metrics for reports, medicine searches, and user activity
- **Activity Monitoring**: Live feed of user actions including logins, uploads, and searches
- **Role-based Security**: Admin-only access with proper authentication verification

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent UI design
- **State Management**: TanStack Query for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation
- **File Structure**: Organized with `client/src/` containing all frontend code

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with structured error handling
- **File Uploads**: Multer middleware for handling multipart form data
- **Development**: Hot reload support with Vite integration

## Key Components

### Data Storage
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Database**: PostgreSQL with Neon serverless provider (ACTIVE)
- **Schema**: Defined in `shared/schema.ts` with user-linked data:
  - `users`: Stores user profile information from Replit Auth (enhanced with admin fields)
  - `sessions`: Session storage for authentication persistence
  - `medical_reports`: User-linked medical reports with analysis results
  - `medicine_searches`: User-linked medicine lookup cache
  - `user_activity`: Tracks all user actions for admin analytics (logins, uploads, searches)
  - `usage_stats`: Daily aggregated usage statistics for admin dashboard
- **Storage Implementation**: DatabaseStorage class with user relationship tracking
- **Fallback**: MemStorage class available for development/testing (not currently used)

### AI Integration Services
- **OpenAI Integration**: GPT-4o model for medical report analysis and medicine information
- **OCR Processing**: Tesseract.js for text extraction from images
- **Vision API**: OpenAI vision capabilities for processing medical images and PDFs

### File Processing Pipeline
- **Upload Handling**: Supports JPEG, PNG, and PDF files up to 10MB
- **Text Extraction**: Multi-stage process using OCR first, then AI vision as fallback
- **Analysis**: Structured AI analysis providing summaries, normal results, attention items, and explanations

### UI Components
- **shadcn/ui**: Complete component library with Radix UI primitives
- **Authentication Components**:
  - `SocialLoginBanner`: Enhanced social login interface with provider icons and benefits
  - `AuthBanner`: Usage limit warnings and login prompts (now uses SocialLoginBanner)
  - `UserHeader`: User profile display with dropdown menu
  - `HistoryView`: Complete analysis history with timestamps
  - `Landing`: Dedicated landing page for anonymous users showcasing social login options
- **Core Components**: 
  - `FileUpload`: Drag-and-drop file upload with validation
  - `MedicineSearch`: Medicine lookup with search suggestions
  - `ResultsDisplay`: Structured display of AI analysis results
  - `MedicalDisclaimer`: Important safety information
- **Contact & Legal Pages**:
  - `Contact`: Complete contact form with email functionality via SendGrid to mohideenrisviy@gmail.com
  - `Privacy`: Detailed privacy policy covering data handling and user rights
  - `Terms`: Complete terms of service with medical disclaimers and usage guidelines
  - Footer navigation links to contact and legal pages from landing and home pages

## Data Flow

1. **Authentication Flow**: User visits site → Replit Auth redirect (if needed) → User profile creation/update → Session establishment → Access granted

2. **Usage Control Flow**: Anonymous user action → Check session usage count → Allow if under limit OR prompt for login → Track usage if allowed

3. **File Upload Flow**: User uploads medical report → Usage limit check → File validation → Text extraction (OCR/AI) → AI analysis → User-linked database storage → UI display

4. **Medicine Search Flow**: User enters medicine name → Usage limit check → API request → Check cache → OpenAI query (if not cached) → User-linked cache storage → UI display

5. **History Access Flow**: Authenticated user → Fetch user-linked reports and searches → Display chronologically with timestamps → Allow result re-viewing

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless database connection
- **drizzle-orm**: Type-safe database ORM with PostgreSQL dialect
- **openai**: Official OpenAI API client for GPT-4o integration
- **tesseract.js**: Client-side OCR for text extraction from images
- **multer**: File upload middleware for Express

### UI Dependencies
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **@tanstack/react-query**: Server state management and caching
- **tailwindcss**: Utility-first CSS framework
- **wouter**: Lightweight routing library

### Development Tools
- **vite**: Fast build tool and development server
- **typescript**: Type safety across the entire application
- **drizzle-kit**: Database migration and schema management

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds React application to `dist/public/`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations in `migrations/` directory

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **OPENAI_API_KEY**: OpenAI API key for AI services (supports multiple env var names)
- **NODE_ENV**: Environment mode (development/production)

### Production Considerations
- Static file serving integrated with Express for single-deployment architecture
- Database migrations managed through `drizzle-kit push` command
- Error handling with structured responses and proper HTTP status codes
- File upload limits and type validation for security

The application is designed to be deployed as a single Node.js application that serves both the API and static frontend files, making it suitable for platforms like Replit, Vercel, or traditional hosting environments.