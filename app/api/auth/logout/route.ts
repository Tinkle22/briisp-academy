import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // In a more complex setup with server-side sessions, you would invalidate the session here
    
    return NextResponse.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { message: 'An error occurred during logout' },
      { status: 500 }
    );
  }
}
