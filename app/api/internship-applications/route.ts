import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { ResultSetHeader } from 'mysql2';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    const requiredFields = ['applicant_name', 'email', 'phone', 'university', 'course_of_study', 'year_of_study'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Insert the application into the database
    const insertQuery = `
      INSERT INTO internship_applications (
        applicant_name, email, phone, university, course_of_study, year_of_study,
        gpa, cv_url, cover_letter, portfolio_url, linkedin_url, github_url,
        availability_start, preferred_duration, motivation, relevant_experience,
        technical_skills, soft_skills, preferred_industry, internship_type_preference,
        status, application_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW())
    `;

    const values = [
      data.applicant_name,
      data.email,
      data.phone,
      data.university,
      data.course_of_study,
      data.year_of_study,
      data.gpa || null,
      data.cv_url || null,
      data.cover_letter || null,
      data.portfolio_url || null,
      data.linkedin_url || null,
      data.github_url || null,
      data.availability_start || null,
      data.preferred_duration || null,
      data.motivation || null,
      data.relevant_experience || null,
      data.technical_skills || null,
      data.soft_skills || null,
      data.preferred_industry || null,
      data.internship_type_preference || null
    ];

    const [result] = await pool.query<ResultSetHeader>(insertQuery, values);

    return NextResponse.json({
      message: 'Internship application submitted successfully',
      applicationId: result.insertId
    }, { status: 201 });

  } catch (error) {
    console.error('Error submitting internship application:', error);
    console.error('Error details:', (error as Error).message);
    console.error('Stack trace:', (error as Error).stack);
    return NextResponse.json(
      { 
        error: 'An error occurred while submitting your application. Please try again.',
        details: (error as Error).message
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = `
      SELECT
        application_id, applicant_name, email, phone, university, course_of_study,
        year_of_study, internship_type_preference, status, application_date
      FROM internship_applications
    `;
    
    const queryParams: any[] = [];

    if (status) {
      query += ' WHERE status = ?';
      queryParams.push(status);
    }

    query += ' ORDER BY application_date DESC LIMIT ? OFFSET ?';
    queryParams.push(limit, offset);

    const [applications] = await pool.query(query, queryParams);

    return NextResponse.json({
      applications,
      pagination: {
        limit,
        offset,
        total: (applications as any[]).length
      }
    });

  } catch (error) {
    console.error('Error fetching internship applications:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching applications' },
      { status: 500 }
    );
  }
}
