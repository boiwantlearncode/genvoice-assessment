import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secretKey = 'GenVoiceAI'; // Ensure this matches the key used to sign the JWT

async function isValidToken(token: string) {
  try {
    // Define your shared secret (use environment variable in production)
    const secret = new TextEncoder().encode(secretKey);

    // Verify the JWT token with the shared secret key
    const { payload } = await jwtVerify(token, secret);
    
    return true; 
  } catch (error) {
    console.error('JWT verification failed:', error);
    return false; 
  }
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('authToken');

  const url = req.nextUrl.clone();

  if (url.pathname === '/') {
    // If the user is authenticated, redirect them to the dashboard
    if (token && token.value) {
      if (await isValidToken(token.value)) {
        url.pathname = '/home';
        return NextResponse.redirect(url);
      } else {
        // Invalid or expired token, redirect to login
        url.pathname = '/login';
        return NextResponse.redirect(url);
      }
    } else {
      // If the user is not authenticated, redirect to login
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  if (token && token.value) {
    if (url.pathname === '/login' && await isValidToken(token.value)) {
      url.pathname = '/home';
      return NextResponse.redirect(url);

      // Invalid or expired token, do nothing
    }
  } else {
    if (url.pathname === '/home' || url.pathname === '/settings') {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Specify the routes where middleware should run
export const config = {
  matcher: ['/', '/login', '/home', '/settings'], 
};
