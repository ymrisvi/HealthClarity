# Medical Report Assistant

## Overview

This is a full-stack web application that helps users understand medical reports and get information about medicines in simple, non-technical language. The application allows users to upload medical reports (images or PDFs), which are then analyzed using AI to provide easy-to-understand explanations. Users can also search for medicine information to learn about what medications do and their effects.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with clear separation between frontend and backend components:

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
- **Database**: PostgreSQL with Neon serverless provider
- **Schema**: Defined in `shared/schema.ts` with two main tables:
  - `medical_reports`: Stores uploaded files, extracted text, and AI analysis
  - `medicine_searches`: Caches medicine lookup results
- **Fallback**: In-memory storage implementation for development/testing

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
- **Custom Components**: 
  - `FileUpload`: Drag-and-drop file upload with validation
  - `MedicineSearch`: Medicine lookup with search suggestions
  - `ResultsDisplay`: Structured display of AI analysis results
  - `MedicalDisclaimer`: Important safety information

## Data Flow

1. **File Upload Flow**: User uploads medical report → File validation → Text extraction (OCR/AI) → AI analysis → Structured response → Database storage → UI display

2. **Medicine Search Flow**: User enters medicine name → API request → Check cache → OpenAI query (if not cached) → Structured medicine information → Cache result → UI display

3. **Data Persistence**: All interactions are stored in PostgreSQL with JSON fields for structured AI responses, enabling result caching and historical access

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