import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { Curriculum } from '@/lib/types';

export async function GET() {
  try {
    const [curriculum] = await pool.query('SELECT * FROM curriculum');
    return NextResponse.json(curriculum);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body: Curriculum = await request.json();
    const { course_id, week_number, topic, content, learning_objectives } = body;

    const [result] = await pool.query(
      `INSERT INTO curriculum (course_id, week_number, topic, content, learning_objectives)
       VALUES (?, ?, ?, ?, ?)`,
      [course_id, week_number, topic, content, learning_objectives]
    );

    return NextResponse.json({ id: (result as any).insertId }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}