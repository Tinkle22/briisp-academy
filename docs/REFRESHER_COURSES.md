# Refresher Course Platform

## Overview

The Refresher Course platform is designed for graduates and professionals who wish to sharpen or update their ICT-related skills through practical, hands-on training.

## Features

### 🛠 Platform Features
- **Flexible Learning Schedules**: Evening and weekend classes to fit busy lifestyles
- **Hands-on Projects & Certification**: Real-world projects with industry certification upon completion
- **Mentor-Guided Labs**: Expert mentors provide personalized guidance throughout the learning journey
- **Assessment & Progress Tracking**: Regular assessments and detailed progress tracking to monitor advancement

### 📚 Courses Offered
- Data Science Bootcamp
- Cybersecurity Fundamentals & Practice
- Networking Essentials (Cisco-based)
- Web & Mobile App Development (Frontend & Backend)
- Machine Learning & AI for Beginners
- Cloud Computing & DevOps Intro

## Technical Implementation

### API Routes

#### Refresher Courses API
- **GET** `/api/courses/refresher` - Fetch all refresher courses
- **POST** `/api/courses/refresher` - Create new refresher course

#### Refresher Applications API
- **GET** `/api/applications/refresher` - Fetch refresher course applications
- **POST** `/api/applications/refresher` - Submit refresher course application

### Frontend Routes

#### Public Pages
- `/refresher` - Main refresher courses page
- `/refresher/[id]` - Individual course details page

#### Application Flow
- `/apply?program=refresher` - Application form with refresher-specific fields
- `/apply?program=refresher&course=[id]` - Pre-filled application for specific course

### Database Schema

#### Courses Table
Refresher courses are stored in the existing `courses` table with `program_type = 'refresher'`.

#### Applications Table
Refresher applications use the existing `applications` table with additional fields for:
- Current skill level
- Previous experience
- Learning goals
- Preferred schedule
- Mentorship interest

### Navigation Integration

#### Main Navigation
- Added "Refresher Courses" link to main navbar
- Direct access to `/refresher` page

#### Services Dropdown
- Updated refresher course links to point to correct routes
- Apply link: `/apply?program=refresher`
- View more link: `/refresher`

## Usage

### For Students/Professionals

1. **Browse Courses**: Visit `/refresher` to see available refresher courses
2. **View Details**: Click on any course to see detailed information, curriculum, and features
3. **Apply**: Use the application form with refresher-specific fields
4. **Track Progress**: Access course materials and track learning progress

### For Administrators

1. **Add Courses**: Use the API to create new refresher courses
2. **Manage Applications**: Review and process refresher course applications
3. **Update Content**: Add curriculum, materials, and course information

## Sample Data

To populate the database with sample refresher courses, run:

```sql
-- Execute the SQL script
source scripts/add-refresher-courses.sql;
```

This will add:
- 6 sample refresher courses
- Curriculum data for key courses
- Proper course codes and metadata

## File Structure

```
app/
├── api/
│   ├── courses/
│   │   └── refresher/
│   │       └── route.ts
│   └── applications/
│       └── refresher/
│           └── route.ts
├── (root)/
│   └── (adults)/
│       └── refresher/
│           ├── page.tsx
│           └── [id]/
│               ├── page.tsx
│               └── course-details.tsx
└── apply/
    └── page.tsx (enhanced with refresher fields)

components/
├── navbar.tsx (updated navigation)
└── services-dropdown.tsx (updated links)

scripts/
└── add-refresher-courses.sql

docs/
└── REFRESHER_COURSES.md
```

## Key Components

### RefresherCoursesPage
Main landing page showcasing:
- Platform features
- Available courses
- Course listings with enrollment data
- Call-to-action sections

### RefresherCourseDetails
Individual course page with:
- Course overview and details
- Curriculum breakdown
- Platform features
- Downloadable materials
- Application integration

### Enhanced Application Form
Application form with refresher-specific fields:
- Current skill level assessment
- Previous experience description
- Learning goals definition
- Schedule preferences
- Mentorship interest

## Future Enhancements

1. **Progress Tracking Dashboard**: Student portal for tracking course progress
2. **Mentor Assignment System**: Automated mentor-student matching
3. **Certificate Generation**: Automated certificate creation upon completion
4. **Advanced Analytics**: Detailed reporting on course effectiveness
5. **Integration with LMS**: Learning management system integration
6. **Mobile App**: Dedicated mobile application for course access

## Support

For technical support or questions about the refresher course platform, please contact the development team or refer to the main application documentation.
