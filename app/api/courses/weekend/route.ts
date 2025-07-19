import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getFileUrl } from '@/lib/file-config';

export async function GET() {
  try {
    // Directly query for weekend courses
    const [courses] = await pool.query('SELECT * FROM courses WHERE program_type = ?', ['weekend']);

    // Process image URLs to use dashboard file access
    const processedCourses = (courses as any[]).map(course => ({
      ...course,
      image_url: course.image_url ? getFileUrl(course.image_url) : null
    }));

    return NextResponse.json(processedCourses);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}