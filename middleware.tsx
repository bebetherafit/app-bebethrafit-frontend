import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './app/lib/firebase-admin';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 로그인 페이지는 항상 접근 가능
  if (pathname === '/login') {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get('firebase-auth');

  // 세션이 없으면 로그인 페이지로 리디렉트
  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // 세션 쿠키 검증
    // await auth.verifySessionCookie(sessionCookie);
    return NextResponse.next();
  } catch (error) {
    // 세션이 유효하지 않으면 로그인 페이지로 리디렉트
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
