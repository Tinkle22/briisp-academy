import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getFileUrl } from '@/lib/file-config';

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

    // Process image URLs to use dashboard file access
    const processedCourses = (courses as any[]).map(course => ({
      ...course,
      image_url: course.image_url ? getFileUrl(course.image_url) : null,
      gallery_images: course.gallery_images ?
        course.gallery_images.split(',').map((url: string) => getFileUrl(url.trim())).join(',') :
        null
    }));

    return NextResponse.json(processedCourses);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 