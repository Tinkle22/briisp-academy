import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    // Query for refresher courses with additional features
    const [courses] = await pool.query(`
      SELECT 
        c.*,
        GROUP_CONCAT(DISTINCT g.image_url) as gallery_images,
        COUNT(DISTINCT uce.enrollment_id) as total_enrollments
      FROM courses c
      LEFT JOIN gallery g ON c.course_id = g.course_id
      LEFT JOIN user_course_enrollments uce ON c.course_id = uce.course_id
      WHERE c.program_type = 'refresher'
      GROUP BY c.course_id
      ORDER BY c.created_at DESC
    `);

    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error fetching refresher courses:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title, description, duration_months, price, department,
      category, image_url, num_lectures, skill_level, 
      languages, class_days, course_code, features
    } = body;

    // Insert refresher course with program_type set to 'refresher'
    const [result] = await pool.query(
      `INSERT INTO courses (
        title, description, duration_months, price, department,
        category, image_url, program_type, num_lectures,
        skill_level, languages, class_days, course_code
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 'refresher', ?, ?, ?, ?, ?)`,
      [title, description, duration_months, price, department,
       category, image_url, num_lectures, skill_level, 
       languages, class_days, course_code]
    );

    return NextResponse.json({ 
      id: (result as any).insertId,
      message: 'Refresher course created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating refresher course:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
