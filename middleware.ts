import { NextResponse, type NextRequest } from 'next/server'

// Protect the admin editor and its write API with HTTP Basic Auth.
// Set ADMIN_USER (optional, default "admin") and ADMIN_PASSWORD in Vercel env.
// If ADMIN_PASSWORD is not set, the admin area is locked entirely (fail closed).
export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}

function unauthorized() {
  return new NextResponse('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Modern Storage Admin", charset="UTF-8"',
    },
  })
}

export function middleware(req: NextRequest) {
  const expectedUser = process.env.ADMIN_USER || 'admin'
  const expectedPass = process.env.ADMIN_PASSWORD

  // No password configured → no access. Prevents an accidentally-open admin.
  if (!expectedPass) return unauthorized()

  const header = req.headers.get('authorization')
  if (!header || !header.startsWith('Basic ')) return unauthorized()

  let user = ''
  let pass = ''
  try {
    // atob is available in the Edge runtime that middleware runs on.
    const decoded = atob(header.slice('Basic '.length))
    const idx = decoded.indexOf(':')
    user = idx >= 0 ? decoded.slice(0, idx) : decoded
    pass = idx >= 0 ? decoded.slice(idx + 1) : ''
  } catch {
    return unauthorized()
  }

  if (user === expectedUser && pass === expectedPass) return NextResponse.next()
  return unauthorized()
}
