import { NextResponse } from 'next/server';

export async function POST() {
  // Create a response to clear the auth token cookie
  const response = NextResponse.json({ success: true });

  // Clear the auth-token cookie
  response.cookies.set('auth-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: -1, // Set maxAge to -1 to delete the cookie
  });

  return response;
}
