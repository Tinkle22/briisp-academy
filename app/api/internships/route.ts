import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'paid' or 'unpaid'
    const industry = searchParams.get('industry');
    const location = searchParams.get('location');

    let query = `
      SELECT 
        i.*,
        c.name as company_name,
        c.logo_url as company_logo,
        c.location as company_location,
        COUNT(ia.application_id) as total_applications
      FROM internships i
      LEFT JOIN companies c ON i.company_id = c.company_id
      LEFT JOIN internship_applications ia ON i.internship_id = ia.internship_id
      WHERE i.is_active = true
    `;
    
    const params: any[] = [];
    
    if (type) {
      query += ' AND i.type = ?';
      params.push(type);
    }
    
    if (industry) {
      query += ' AND i.industry = ?';
      params.push(industry);
    }
    
    if (location) {
      query += ' AND c.location LIKE ?';
      params.push(`%${location}%`);
    }
    
    query += ' GROUP BY i.internship_id ORDER BY i.created_at DESC';
    
    const [internships] = await pool.query(query, params);
    
    return NextResponse.json(internships);
  } catch (error) {
    console.error('Error fetching internships:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      company_id,
      type, // 'paid' or 'unpaid'
      duration_months,
      requirements,
      responsibilities,
      industry,
      skills_required,
      application_deadline,
      start_date,
      stipend_amount
    } = body;

    // Validate required fields
    if (!title || !description || !company_id || !type || !duration_months || !industry) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      `INSERT INTO internships (
        title, description, company_id, type, duration_months,
        requirements, responsibilities, industry, skills_required,
        application_deadline, start_date, stipend_amount
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title, description, company_id, type, duration_months,
        requirements, responsibilities, industry, skills_required,
        application_deadline, start_date, stipend_amount
      ]
    );

    return NextResponse.json({ 
      id: (result as any).insertId,
      message: 'Internship created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating internship:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
