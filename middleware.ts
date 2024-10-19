import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secretKey = 'GenVoiceAI'; // Ensure this matches the key used to sign the JWT

async function isValidToken(token: string) {
  try {
    // const secret = new TextEncoder().encode(secretKey);
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
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
    if (token && token.value) {
      if (await isValidToken(token.value)) {
        url.pathname = '/home';
        return NextResponse.redirect(url);
      } else {
        // Invalid or expired token, redirect to login with message in cookie
        url.pathname = '/login';
        const response = NextResponse.redirect(url);
        response.cookies.delete('authToken');
        response.cookies.set('message', 'Session expired. Please log in again.');
        return response;
      }
    } else {
      // If the user is not authenticated, redirect to login
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  if (url.pathname === '/login') {
    if (token && token.value) {
      if (await isValidToken(token.value)) {
        url.pathname = '/home';
        return NextResponse.redirect(url);
      }
    }
    return NextResponse.next();
  }

  if (url.pathname === '/home' || url.pathname === '/settings') {
    if (token && token.value) {
      if (await isValidToken(token.value)) {
        return NextResponse.next();
      } else {
        // Invalid or expired token, redirect to login with message in cookie
        url.pathname = '/login';
        const response = NextResponse.redirect(url);
        response.cookies.delete('authToken');
        response.cookies.set('message', 'Session expired. Please log in again.');
        return response;
      }
    } else {
      // If the user is not authenticated, redirect to login
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
