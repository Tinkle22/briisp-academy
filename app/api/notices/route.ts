import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { Notice } from '@/lib/types';

export async function GET(request: Request) {
  try {
    const [notices] = await pool.query(
      'SELECT * FROM notice_board WHERE is_active = true ORDER BY publish_date DESC LIMIT 3'
    );
    return NextResponse.json(notices);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body: Notice = await request.json();
    const { title, description, priority, publish_date, expiry_date } = body;

    const [result] = await pool.query(
      `INSERT INTO notice_board (title, description, priority, publish_date, expiry_date)
       VALUES (?, ?, ?, ?, ?)`,
      [title, description, priority, publish_date, expiry_date]
    );

    return NextResponse.json({ id: (result as any).insertId }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}