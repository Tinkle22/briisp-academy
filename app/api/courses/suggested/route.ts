import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import pool from '@/lib/db';
import { getFileUrl } from '@/lib/file-config';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const department = searchParams.get('department');

    if (!department) {
      return NextResponse.json({ error: 'Department is required' }, { status: 400 });
    }

    const query = `
      SELECT 
        c.*,
        COUNT(uce.enrollment_id) as total_students,
        AVG(CASE WHEN r.is_passed = 1 THEN 1 ELSE 0 END) as success_rate
      FROM courses c
      LEFT JOIN user_course_enrollments uce ON c.course_id = uce.course_id
      LEFT JOIN results r ON c.course_id = r.course_id
      WHERE c.department = ?
      GROUP BY c.course_id
      LIMIT 3
    `;

    const [courses] = await pool.query(query, [department]);

    // Process image URLs to use dashboard file access
    const processedCourses = (courses as any[]).map(course => ({
      ...course,
      image_url: course.image_url ? getFileUrl(course.image_url) : null
    }));

    return NextResponse.json(processedCourses);
  } catch (error) {
    console.error('Error fetching suggested courses:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 