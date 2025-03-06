// app/api/login/route.ts
import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2/promise';
import { SignJWT } from 'jose';

interface User extends RowDataPacket {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Use the same secret as in your middleware
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Verify user credentials
    const [users] = await pool.query<User[]>(
      'SELECT * FROM users WHERE email = ? AND password = ? AND is_active = true',
      [email, password]
    );

    if (Array.isArray(users) && users.length > 0) {
      const user = users[0];
      
      // Create JWT token
      const token = await new SignJWT({ 
        userId: user.user_id,
        email: user.email,
        name: `${user.first_name} ${user.last_name}`
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('24h')
        .sign(new TextEncoder().encode(JWT_SECRET));

      // Set HTTP-only cookie
      const response = NextResponse.json(
        { 
          success: true, 
          userId: user.user_id,
          name: `${user.first_name} ${user.last_name}`
        },
        { status: 200 }
      );
      
      response.cookies.set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // 24 hours
      });

      return response;
    } else {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}