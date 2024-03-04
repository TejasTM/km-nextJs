const { jwtVerify } = require("jose");
const { NextResponse, NextRequest } = require("next/server");

async function middleware(req) {
  const pathname = req.nextUrl.pathname;

  // Allow access to public routes (e.g., login, signup)
  if (
    pathname.startsWith("/auth/login") || 
    pathname.startsWith("/auth/signup") 
  ) {
    return NextResponse.next();
  }

  // Check if token is present in localStorage
  const token = localStorage.getItem("token");

  if (!token) {
    // Redirect to login page if token is not present
    return NextResponse.rewrite(new URL("/auth/login", req.url));
  }

  // Verify token
  try {
    const decodedToken = await jwtVerify(
      token,
      new TextEncoder().encode(`${process.env.JWT_SECRET}`)
    );

    if (!decodedToken) {
      // Redirect to login page if token is not valid
      return NextResponse.rewrite(new URL("/auth/login", req.url));
    }
  } catch (err) {
    // Redirect to login page if token verification fails
    return NextResponse.rewrite(new URL("/auth/login", req.url));
  }

  // If token is valid, allow access to the requested page
  return NextResponse.next();
}

module.exports = middleware;
