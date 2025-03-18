import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // Query to get user details
    const query = `
      SELECT user_id, email, first_name, last_name, role, created_at, updated_at
      FROM users
      WHERE user_id = ?
    `;
    
    const [rows] = await pool.query(query, [userId]);
    
    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Return the first (and should be only) user
    const userData = rows[0];
    
    // Remove sensitive information if needed
    const { password, ...userWithoutPassword } = userData as any;
    
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}