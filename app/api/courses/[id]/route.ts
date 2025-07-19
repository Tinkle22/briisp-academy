import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getFileUrl } from '@/lib/file-config';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await pool.query('DELETE FROM courses WHERE course_id = ?', [params.id]);
    return NextResponse.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [courses] = await pool.query('SELECT * FROM courses WHERE course_id = ?', [params.id]);
    const course = (courses as any[])[0];

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // Process image URL to use dashboard file access
    const processedCourse = {
      ...course,
      image_url: course.image_url ? getFileUrl(course.image_url) : null
    };

    return NextResponse.json(processedCourse);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const {
      title, description, duration_months, price, department,
      category, image_url, program_type, num_lectures,
      skill_level, languages, class_days, course_code
    } = body;

    await pool.query(
      `UPDATE courses SET 
        title = ?, description = ?, duration_months = ?, price = ?, 
        department = ?, category = ?, image_url = ?, program_type = ?, 
        num_lectures = ?, skill_level = ?, languages = ?, 
        class_days = ?, course_code = ?
       WHERE course_id = ?`,
      [title, description, duration_months, price, department,
       category, image_url, program_type, num_lectures,
       skill_level, languages, class_days, course_code, params.id]
    );

    return NextResponse.json({ message: 'Course updated successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 