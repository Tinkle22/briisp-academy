import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      internship_id,
      student_name,
      student_email,
      student_phone,
      university,
      course_of_study,
      year_of_study,
      gpa,
      cv_url,
      cover_letter,
      portfolio_url,
      linkedin_url,
      github_url,
      availability_start,
      preferred_duration,
      motivation,
      relevant_experience,
      technical_skills,
      soft_skills,
      preferred_industry,
      internship_type_preference
    } = body;

    // Validate required fields
    if (!student_name || !student_email || !student_phone ||
        !university || !course_of_study || !year_of_study) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // If internship_id is provided and not "none", validate it
    if (internship_id && internship_id !== 'none') {
      // Check if internship exists and is active
      const [internshipCheck] = await pool.query(
        'SELECT internship_id, application_deadline FROM internships WHERE internship_id = ? AND is_active = true',
        [internship_id]
      );

      if (!internshipCheck || (internshipCheck as any[]).length === 0) {
        return NextResponse.json(
          { error: 'Internship not found or no longer active' },
          { status: 404 }
        );
      }

      const internship = (internshipCheck as any[])[0];

      // Check if application deadline has passed
      if (internship.application_deadline && new Date() > new Date(internship.application_deadline)) {
        return NextResponse.json(
          { error: 'Application deadline has passed' },
          { status: 400 }
        );
      }

      // Check for duplicate applications for specific internship
      const [existingApplication] = await pool.query(
        'SELECT application_id FROM internship_applications WHERE internship_id = ? AND student_email = ?',
        [internship_id, student_email]
      );

      if (existingApplication && (existingApplication as any[]).length > 0) {
        return NextResponse.json(
          { error: 'You have already applied for this internship' },
          { status: 400 }
        );
      }
    } else {
      // For general applications, check if user has already submitted a general application
      const [existingGeneralApplication] = await pool.query(
        'SELECT application_id FROM internship_applications WHERE internship_id IS NULL AND student_email = ?',
        [student_email]
      );

      if (existingGeneralApplication && (existingGeneralApplication as any[]).length > 0) {
        return NextResponse.json(
          { error: 'You have already submitted a general internship application' },
          { status: 400 }
        );
      }
    }

    // Insert application
    const [result] = await pool.query(
      `INSERT INTO internship_applications (
        internship_id, student_name, student_email, student_phone,
        university, course_of_study, year_of_study, gpa, cv_url,
        cover_letter, portfolio_url, linkedin_url, github_url,
        availability_start, preferred_duration, motivation,
        relevant_experience, technical_skills, soft_skills,
        preferred_industry, internship_type_preference
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        (internship_id && internship_id !== 'none') ? internship_id : null,
        student_name, student_email, student_phone,
        university, course_of_study, year_of_study, gpa, cv_url,
        cover_letter, portfolio_url, linkedin_url, github_url,
        availability_start, preferred_duration, motivation,
        relevant_experience, technical_skills, soft_skills,
        preferred_industry, internship_type_preference
      ]
    );

    const applicationId = (result as any).insertId;
    const isSpecificApplication = internship_id && internship_id !== 'none';
    const message = isSpecificApplication
      ? 'Internship application submitted successfully'
      : 'General internship program application submitted successfully';

    return NextResponse.json({
      id: applicationId,
      message: message,
      type: isSpecificApplication ? 'specific' : 'general'
    }, { status: 201 });

  } catch (error) {
    console.error('Error submitting internship application:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const internship_id = searchParams.get('internship_id');
    
    let query = `
      SELECT 
        ia.*,
        i.title as internship_title,
        c.name as company_name
      FROM internship_applications ia
      JOIN internships i ON ia.internship_id = i.internship_id
      LEFT JOIN companies c ON i.company_id = c.company_id
      WHERE 1=1
    `;
    
    const params: any[] = [];
    
    if (status) {
      query += ' AND ia.status = ?';
      params.push(status);
    }
    
    if (internship_id) {
      query += ' AND ia.internship_id = ?';
      params.push(internship_id);
    }
    
    query += ' ORDER BY ia.application_date DESC';
    
    const [applications] = await pool.query(query, params);
    
    return NextResponse.json(applications);
  } catch (error) {
    console.error('Error fetching internship applications:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
