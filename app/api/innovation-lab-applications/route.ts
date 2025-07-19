import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { ResultSetHeader } from 'mysql2';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    const requiredFields = ['applicant_name', 'email', 'phone', 'university_organization', 'project_title', 'idea_description', 'innovation_type', 'development_stage'];
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
      INSERT INTO innovation_lab_applications (
        applicant_name, email, phone, university_organization, project_title,
        idea_description, innovation_type, development_stage, problem_statement,
        solution_approach, target_market, software_needs, hardware_needs,
        technologies_involved, technical_expertise_required, project_duration,
        expected_outcomes, success_metrics, project_deadline, team_size,
        team_member_roles, team_experience, previous_projects, lab_access_needs,
        equipment_requirements, funding_requirements, mentorship_needs,
        collaboration_interests, additional_notes, status, application_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW())
    `;

    const values = [
      data.applicant_name,
      data.email,
      data.phone,
      data.university_organization,
      data.project_title,
      data.idea_description,
      data.innovation_type,
      data.development_stage,
      data.problem_statement || null,
      data.solution_approach || null,
      data.target_market || null,
      data.software_needs || null,
      data.hardware_needs || null,
      data.technologies_involved || null,
      data.technical_expertise_required || null,
      data.project_duration || null,
      data.expected_outcomes || null,
      data.success_metrics || null,
      data.project_deadline || null,
      data.team_size ? parseInt(data.team_size) : null,
      data.team_member_roles || null,
      data.team_experience || null,
      data.previous_projects || null,
      data.lab_access_needs || null,
      data.equipment_requirements || null,
      data.funding_requirements || null,
      data.mentorship_needs || null,
      data.collaboration_interests || false,
      data.additional_notes || null
    ];

    const [result] = await pool.query<ResultSetHeader>(insertQuery, values);

    return NextResponse.json({
      message: 'Innovation lab application submitted successfully',
      applicationId: result.insertId
    }, { status: 201 });

  } catch (error) {
    console.error('Error submitting innovation lab application:', error);
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
        application_id, applicant_name, email, phone, university_organization,
        project_title, innovation_type, development_stage, status, application_date
      FROM innovation_lab_applications
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
    console.error('Error fetching innovation lab applications:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching applications' },
      { status: 500 }
    );
  }
}
