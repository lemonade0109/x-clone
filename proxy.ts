import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const PUBLIC_ROUTES = [
  "/",
  "/i/flow/login",
  "/i/flow/signup",
  "/about",
  "/help-center",
  "/privacy",
  "/resources",
  "/tos",
];

const AUTH_ROUTES = ["/i/flow/login", "/i/flow/signup"];

function isRoute(pathname: string, routes: string[]) {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export async function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Never run auth gating for API/Auth/Next internals/static
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });

  const isLoggedIn = !!token;
  const isPublicRoute = isRoute(pathname, PUBLIC_ROUTES);
  const isAuthRoute = isRoute(pathname, AUTH_ROUTES);

  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (!isLoggedIn && !isPublicRoute && !isAuthRoute) {
    const loginUrl = new URL("/i/flow/login", req.url);
    loginUrl.searchParams.set("redirect_after_login", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Skip all API routes entirely (including /api/auth/*)
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
