import { NextResponse } from 'next/server';
import pool from '@/lib/db';
 
export async function GET() {
  try {
    const courses = await pool.query(`
      SELECT * FROM courses 
      WHERE department = 'Computer science' 
      ORDER BY created_at DESC 
      LIMIT 5
    `);

    return NextResponse.json(courses);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}