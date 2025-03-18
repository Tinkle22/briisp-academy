import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session');
  const isAuthPage = request.nextUrl.pathname.startsWith('/login');

  if (!session && !isAuthPage) {
    // Redirect to login if no session and trying to access protected route
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (session && isAuthPage) {
    // Redirect to dashboard if has session and trying to access login
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login']
};