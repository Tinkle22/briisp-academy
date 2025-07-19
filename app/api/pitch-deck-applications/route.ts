import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { ResultSetHeader } from 'mysql2';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    const requiredFields = ['applicant_name', 'email', 'phone', 'funding_stage', 'business_description', 'budget_range'];
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
      INSERT INTO pitch_deck_applications (
        applicant_name, email, phone, company_name, industry, funding_stage,
        funding_amount, business_description, target_audience, current_traction,
        team_size, previous_funding, pitch_deadline, specific_requirements,
        preferred_start_date, budget_range, referral_source, additional_notes,
        status, application_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW())
    `;

    const values = [
      data.applicant_name,
      data.email,
      data.phone,
      data.company_name || null,
      data.industry || null,
      data.funding_stage,
      data.funding_amount || null,
      data.business_description,
      data.target_audience || null,
      data.current_traction || null,
      data.team_size ? parseInt(data.team_size) : null,
      data.previous_funding || false,
      data.pitch_deadline || null,
      data.specific_requirements || null,
      data.preferred_start_date || null,
      data.budget_range,
      data.referral_source || null,
      data.additional_notes || null
    ];

    const [result] = await pool.query<ResultSetHeader>(insertQuery, values);

    return NextResponse.json({
      message: 'Pitch deck application submitted successfully',
      applicationId: result.insertId
    }, { status: 201 });

  } catch (error) {
    console.error('Error submitting pitch deck application:', error);
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
        application_id, applicant_name, email, phone, company_name, industry,
        funding_stage, funding_amount, business_description, budget_range,
        status, application_date
      FROM pitch_deck_applications
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
    console.error('Error fetching pitch deck applications:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching applications' },
      { status: 500 }
    );
  }
}
