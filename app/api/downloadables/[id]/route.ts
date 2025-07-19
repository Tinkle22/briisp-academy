import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getFileUrl } from '@/lib/file-config';

// GET specific file by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const [rows] = await pool.query(
      `SELECT f.*, c.title as course_title
       FROM downloadable_files f
       LEFT JOIN courses c ON f.course_id = c.course_id
       WHERE f.file_id = ?`,
      [params.id]
    );
    
    const file = (rows as any[])[0];
    if (!file) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    
    // Process file URL to use dashboard file access
    const processedFile = {
      ...file,
      file_url: file.file_url ? getFileUrl(file.file_url) : null
    };

    return NextResponse.json(processedFile);
  } catch (error) {
    console.error('Error fetching file:', error);
    return NextResponse.json({ error: 'Failed to fetch file' }, { status: 500 });
  }
}

// PUT update file
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
      `UPDATE downloadable_files SET
       file_name = ?,
       file_url = ?,
       description = ?,
       course_id = ?,
       file_type = COALESCE(?, file_type),
       file_size = COALESCE(?, file_size)
       WHERE file_id = ?`,
      [file_name, file_url, description || null, course_id || null, file_type, file_size, params.id]
    );
    
    const { affectedRows } = result as any;
    if (affectedRows === 0) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    
    return NextResponse.json({ id: params.id, ...data });
  } catch (error) {
    console.error('Error updating file:', error);
    return NextResponse.json({ error: 'Failed to update file' }, { status: 500 });
  }
}

// DELETE file
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Note: This only removes the database record, not the actual file from Cloudinary
    // For production, you might want to delete the file from Cloudinary as well
    
    const [result] = await pool.query(
      'DELETE FROM downloadable_files WHERE file_id = ?',
      [params.id]
    );
    
    const { affectedRows } = result as any;
    if (affectedRows === 0) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
  }
}