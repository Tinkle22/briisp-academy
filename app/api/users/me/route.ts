import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import pool from '@/lib/db';

export async function GET() {
  try {
    // Get session cookie
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('session');

    if (!sessionCookie) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Parse session data
    const session = JSON.parse(sessionCookie.value);
    const userId = session.user_id;

    if (!userId) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      );
    }

    // Query to get user details - removed 'role' from SELECT
    const query = `
      SELECT user_id, email, first_name, last_name, is_active, created_at, updated_at
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

    // Return user data (first row)
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