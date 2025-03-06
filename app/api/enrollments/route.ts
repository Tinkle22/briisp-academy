import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2/promise';

interface Enrollment extends RowDataPacket {
  enrollment_id: number;
  user_id: number;
  course_id: number;
  status: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const courseId = searchParams.get('courseId');

    if (!userId || !courseId) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const [enrollments] = await pool.query<Enrollment[]>(
      'SELECT * FROM user_course_enrollments WHERE user_id = ? AND course_id = ? AND status = \'active\'',
      [userId, courseId]
    );

    return NextResponse.json(enrollments[0] || null);
  } catch (error) {
    console.error('Error fetching enrollment:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 