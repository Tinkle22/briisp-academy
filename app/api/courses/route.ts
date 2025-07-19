import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { Course } from '@/lib/types';
import { getFileUrl } from '@/lib/file-config';

export async function GET() {
  try {
    const [courses] = await pool.query('SELECT * FROM courses');

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

export async function POST(request: Request) {
  try {
    const body: Course = await request.json();
    const {
      title, description, duration_months, price, department,
      category, image_url, program_type, num_lectures,
      skill_level, languages, class_days, course_code
    } = body;

    const [result] = await pool.query(
      `INSERT INTO courses (
        title, description, duration_months, price, department,
        category, image_url, program_type, num_lectures,
        skill_level, languages, class_days, course_code
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, description, duration_months, price, department,
       category, image_url, program_type, num_lectures,
       skill_level, languages, class_days, course_code]
    );

    return NextResponse.json({ id: (result as any).insertId }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}