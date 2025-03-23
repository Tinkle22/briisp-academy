import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Fetch course materials from the downloadable_files table
    const [materials] = await pool.query(
      `SELECT 
        file_id, 
        file_name, 
        file_url, 
        file_type, 
        file_size, 
        description, 
        upload_date 
      FROM downloadable_files 
      WHERE course_id = ? 
      ORDER BY upload_date DESC`,
      [params.id]
    );
    
    return NextResponse.json(materials);
  } catch (error) {
    console.error('Error fetching course materials:', error);
    return NextResponse.json({ error: 'Failed to fetch course materials' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const {
      file_name,
      file_url,
      file_type,
      file_size,
      description
    } = body;

    // Insert new material for the course
    const [result] = await pool.query(
      `INSERT INTO downloadable_files (
        course_id,
        file_name,
        file_url,
        file_type,
        file_size,
        description
      ) VALUES (?, ?, ?, ?, ?, ?)`,
      [params.id, file_name, file_url, file_type, file_size, description]
    );

    const insertId = (result as any).insertId;
    
    return NextResponse.json({ 
      message: 'Course material added successfully',
      file_id: insertId
    });
  } catch (error) {
    console.error('Error adding course material:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}