import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Daftar route yang perlu proteksi
  const protectedPaths = ['/Favorite', '/profile', '/Visited'];
  const adminPaths = ['/admin'];

  // Cek apakah path saat ini perlu diproteksi
  const isProtectedPath = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  );

  const isAdminPath = adminPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath) {
    try {
      // Cek status autentikasi ke backend
      const authCheckResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/me`, {
        headers: {
          Cookie: request.headers.get('cookie') || ''
        }
      });

      if (!authCheckResponse.ok) {
        // Redirect ke login jika tidak terautentikasi
        return NextResponse.redirect(new URL('/login', request.url));
      }

      if (isAdminPath) {
        const userData = await authCheckResponse.json();
        if (userData.user?.role !== 'admin') {
          // Redirect ke dashboard jika bukan admin
          return NextResponse.redirect(new URL('/dashboard', request.url));
        }
      }

    } catch (error) {
      console.error('Auth check failed:', error);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/Favorite/:path*',
    '/profile/:path*',
    '/Visited/:path*',
  ]
};
