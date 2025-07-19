import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { ResultSetHeader } from 'mysql2';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    const requiredFields = ['student_name', 'email', 'phone', 'university', 'course_of_study', 'year_of_study', 'project_type'];
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
      INSERT INTO final_year_project_applications (
        student_name, email, phone, university, course_of_study, year_of_study,
        student_id, supervisor_name, supervisor_email, project_title, project_description,
        project_type, research_area, methodology, expected_outcomes, timeline_weeks,
        required_resources, technical_requirements, preferred_supervisor_expertise,
        project_deadline, defense_date, university_requirements, additional_notes,
        status, application_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW())
    `;

    const values = [
      data.student_name,
      data.email,
      data.phone,
      data.university,
      data.course_of_study,
      data.year_of_study,
      data.student_id || null,
      data.supervisor_name || null,
      data.supervisor_email || null,
      data.project_title || null,
      data.project_description || null,
      data.project_type,
      data.research_area || null,
      data.methodology || null,
      data.expected_outcomes || null,
      data.timeline_weeks ? parseInt(data.timeline_weeks) : null,
      data.required_resources || null,
      data.technical_requirements || null,
      data.preferred_supervisor_expertise || null,
      data.project_deadline || null,
      data.defense_date || null,
      data.university_requirements || null,
      data.additional_notes || null
    ];

    const [result] = await pool.query<ResultSetHeader>(insertQuery, values);

    return NextResponse.json({
      message: 'Final year project application submitted successfully',
      applicationId: result.insertId
    }, { status: 201 });

  } catch (error) {
    console.error('Error submitting FYP application:', error);
    return NextResponse.json(
      { error: 'An error occurred while submitting your application. Please try again.' },
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
        application_id, student_name, email, phone, university, course_of_study,
        year_of_study, project_title, project_type, status, application_date
      FROM final_year_project_applications
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
    console.error('Error fetching FYP applications:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching applications' },
      { status: 500 }
    );
  }
}
