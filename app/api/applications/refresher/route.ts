import { NextResponse } from 'next/server';
import pool from '@/lib/db';

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
      country,
      // Refresher-specific fields
      currentSkillLevel,
      previousExperience,
      learningGoals,
      preferredSchedule,
      mentorshipInterest
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

    // Verify the course is a refresher course
    const [courseCheck] = await pool.query(
      'SELECT program_type FROM courses WHERE course_id = ?',
      [courseId]
    );

    if (!courseCheck || (courseCheck as any[])[0]?.program_type !== 'refresher') {
      return NextResponse.json(
        { error: 'Invalid refresher course ID' },
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

    // Store refresher-specific data in a separate table if needed
    // For now, we'll include it in the response for future implementation
    const applicationId = (result as any).insertId;

    return NextResponse.json({
      id: applicationId,
      message: 'Refresher course application submitted successfully',
      refresherData: {
        currentSkillLevel,
        previousExperience,
        learningGoals,
        preferredSchedule,
        mentorshipInterest
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Error submitting refresher application:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    let query = `
      SELECT 
        a.*,
        c.title as course_title,
        c.program_type
      FROM applications a
      JOIN courses c ON a.course_id = c.course_id
      WHERE c.program_type = 'refresher'
    `;
    
    const params: any[] = [];
    
    if (status) {
      query += ' AND a.status = ?';
      params.push(status);
    }
    
    query += ' ORDER BY a.application_date DESC';
    
    const [applications] = await pool.query(query, params);
    
    return NextResponse.json(applications);
  } catch (error) {
    console.error('Error fetching refresher applications:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
