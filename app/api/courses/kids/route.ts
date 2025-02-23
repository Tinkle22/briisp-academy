import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [courses] = await pool.query(
      `SELECT 
        c.*,
        GROUP_CONCAT(DISTINCT g.image_url) as gallery_images
      FROM courses c
      LEFT JOIN gallery g ON c.course_id = g.course_id
      WHERE c.category = 'kids'
      GROUP BY c.course_id
      ORDER BY c.created_at DESC
      LIMIT 3`
    );

    return NextResponse.json(courses);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 