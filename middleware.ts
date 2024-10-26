// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


// Define the paths that require authentication
const protectedPaths = ['/']; // Add paths that need authentication

export function middleware(request: NextRequest) {
  const access_token = request.cookies.get('access_token'); // Get the session cookie

  // If the path is protected and there is no session cookie, redirect to the login page
  if (protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path)) && !access_token) {
    return NextResponse.redirect(new URL('/auth/login', request.url)); // Redirect to login page
  }

   
  

  // Allow the request to proceed
  return NextResponse.next();
}

// Define the routes where the middleware will run
export const config = {
  matcher: ['/'], // Apply middleware only to these routes
};