import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import pool from '@/lib/db';

export async function GET() {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('session');

    if (!sessionCookie) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const session = JSON.parse(sessionCookie.value);
    const userId = session.user_id;

    const query = `
      SELECT 
        uce.enrollment_id,
        uce.user_id,
        uce.status,
        uce.enrollment_date,
        c.course_id,
        c.title as course_title,
        c.course_code,
        c.description,
        c.duration_months,
        c.price,
        c.department,
        c.category,
        c.image_url,
        c.program_type,
        c.num_lectures,
        c.skill_level,
        c.languages,
        c.class_days
      FROM user_course_enrollments uce
      JOIN courses c ON uce.course_id = c.course_id
      WHERE uce.user_id = ?
      ORDER BY uce.enrollment_date DESC
    `;

    const [rows] = await pool.query(query, [userId]);

    // Transform the data to match the expected structure
    const enrollments = (rows as any[]).map(row => ({
      enrollment_id: row.enrollment_id,
      user_id: row.user_id,
      status: row.status,
      enrollment_date: row.enrollment_date,
      course: {
        course_id: row.course_id,
        title: row.course_title,
        course_code: row.course_code,
        description: row.description,
        duration_months: row.duration_months,
        price: row.price,
        department: row.department,
        category: row.category,
        image_url: row.image_url,
        program_type: row.program_type,
        num_lectures: row.num_lectures,
        skill_level: row.skill_level,
        languages: row.languages,
        class_days: row.class_days
      }
    }));

    return NextResponse.json(enrollments);
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}