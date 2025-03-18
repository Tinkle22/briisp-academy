import { NextResponse } from 'next/server';
import { compare } from 'bcrypt';
import pool from '@/lib/db';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user by email - add more detailed error handling
    let user;
    try {
      const [rows] = await pool.query(
        'SELECT user_id, first_name, last_name, email, password FROM users WHERE email = ?',
        [email]
      );
      user = rows;
    } catch (dbError) {
      console.error('Database query error:', dbError);
      return NextResponse.json(
        { message: 'Database connection error' },
        { status: 500 }
      );
    }

    // Check if user exists
    if (!user || !Array.isArray(user) || user.length === 0) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const userData = user[0];
    
    // Add logging to see the structure of userData
    console.log('User data retrieved:', { 
      id: (userData as any).user_id,
      email: (userData as any).email,
      hasPassword: !!(userData as any).password
    });

    // Verify password with better error handling
    let passwordMatch = false;
    try {
      // Make sure password exists before comparing
      if (!(userData as any).password) {
        console.error('Password field is missing or null');
        return NextResponse.json(
          { message: 'Account has invalid credentials' },
          { status: 401 }
        );
      }
      
      passwordMatch = await compare(password, (userData as any).password);
    } catch (bcryptError) {
      console.error('Password comparison error:', bcryptError);
      return NextResponse.json(
        { message: 'Authentication error' },
        { status: 500 }
      );
    }

    if (!passwordMatch) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Return user data (excluding password)
    // After successful password verification
    if (passwordMatch) {
      const { password: _, ...userWithoutPassword } = userData as { password: string; [key: string]: any };
      
      // Create session cookie
      const cookieStore = cookies();
      cookieStore.set('session', JSON.stringify({
        user_id: userWithoutPassword.user_id,
        email: userWithoutPassword.email
      }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });

      return NextResponse.json({
        message: 'Login successful',
        user: userWithoutPassword
      });
    }
    const { password: _, ...userWithoutPassword } = userData as { password: string; [key: string]: any };
    
    // Make sure user_id is always returned as a number
    const safeUser = {
      ...userWithoutPassword,
      user_id: typeof userWithoutPassword.user_id === 'number' 
        ? userWithoutPassword.user_id 
        : parseInt(userWithoutPassword.user_id, 10)
    };
    
    console.log('Sending user data to client:', safeUser);
    
    return NextResponse.json({
      message: 'Login successful',
      user: safeUser
    });
  } catch (error) {
    // More detailed error logging
    console.error('Login error details:', error);
    return NextResponse.json(
      { message: 'An error occurred during login' },
      { status: 500 }
    );
  }
}