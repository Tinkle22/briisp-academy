import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// Add this export to mark the route as dynamic
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      courseId,
      studentType,
      studyMode,
      firstName,
      lastName,
      otherNames,
      gender,
      maritalStatus,
      dateOfBirth,
      nationality,
      idNumber,
      academicYear,
      intake,
      email,
      phoneNumber,
      country
    } = body;

    // Validate required fields
    if (!courseId || !studentType || !studyMode || !firstName || !lastName || 
        !gender || !dateOfBirth || !nationality || !idNumber || !academicYear || 
        !intake || !email || !phoneNumber || !country) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert application into database
    const [result] = await pool.query(
      `INSERT INTO applications (
        course_id,
        student_type,
        study_mode,
        first_name,
        last_name,
        other_names,
        gender,
        marital_status,
        date_of_birth,
        nationality,
        id_number,
        academic_year,
        intake,
        email,
        phone_number,
        country
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        courseId,
        studentType,
        studyMode,
        firstName,
        lastName,
        otherNames || null,
        gender,
        maritalStatus || null,
        dateOfBirth,
        nationality,
        idNumber,
        academicYear,
        intake,
        email,
        phoneNumber,
        country
      ]
    );

    // Send confirmation email (implement this later)
    // await sendApplicationConfirmationEmail(email, firstName);

    return NextResponse.json(
      { 
        success: true, 
        applicationId: (result as any).insertId,
        message: 'Application submitted successfully'
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting application:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const email = searchParams.get('email');
    
    let query = `
      SELECT 
        a.*,
        c.title as course_title,
        c.course_code
      FROM applications a
      JOIN courses c ON a.course_id = c.course_id
      WHERE 1=1
    `;
    
    const queryParams: any[] = [];
    
    if (status) {
      query += ` AND a.status = ?`;
      queryParams.push(status);
    }
    
    if (email) {
      query += ` AND a.email = ?`;
      queryParams.push(email);
    }
    
    query += ` ORDER BY a.application_date DESC`;

    const [applications] = await pool.query(query, queryParams);
    
    return NextResponse.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}