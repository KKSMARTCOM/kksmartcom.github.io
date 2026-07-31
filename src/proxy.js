import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function proxy(request) {
  const token = request.cookies.get('authToken')?.value;

  const session = token ? verifyToken(token) : null;
  if (!session || session.role !== 'ADMIN') {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', request.nextUrl.pathname);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete('authToken');
    return response;
  }

  return NextResponse.next();
}

export const config = { matcher: ['/admin/:path*'] };
