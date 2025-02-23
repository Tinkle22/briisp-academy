import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET all downloadable files
export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT f.*, c.title as course_title
      FROM downloadable_files f
      LEFT JOIN courses c ON f.course_id = c.course_id
      ORDER BY f.upload_date DESC
    `);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching files:', error);
    return NextResponse.json({ error: 'Failed to fetch files' }, { status: 500 });
  }
}

// POST create new file
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { file_name, file_url, description, course_id, file_type, file_size } = data;

    if (!file_name || !file_url) {
      return NextResponse.json(
        { error: 'File name and URL are required' },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      `INSERT INTO downloadable_files 
       (file_name, file_url, description, course_id, file_type, file_size) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [file_name, file_url, description || null, course_id || null, file_type || null, file_size || null]
    );

    const { insertId } = result as any;
    return NextResponse.json({ id: insertId, ...data }, { status: 201 });
  } catch (error) {
    console.error('Error creating file:', error);
    return NextResponse.json({ error: 'Failed to create file' }, { status: 500 });
  }
}