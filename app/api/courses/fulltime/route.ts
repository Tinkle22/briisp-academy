import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    // Directly query for full-time courses
    const [courses] = await pool.query('SELECT * FROM courses WHERE program_type = ?', ['fulltime']);
    return NextResponse.json(courses);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}