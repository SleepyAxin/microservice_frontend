import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) 
{
  const { pathname } = request.nextUrl
  const isAuthenticated = request.cookies.get('auth-token')

  // 如果用户未登录且访问的不是登录页面，重定向到登录页
  if (!isAuthenticated && pathname !== '/auth') 
  {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  // 如果用户已登录且访问登录页面，重定向到仪表板
  if (isAuthenticated && pathname === '/auth') 
  {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = 
{
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}