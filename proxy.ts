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

  //  Skip Next internals + API routes
  if (pathname.startsWith("/_next")) return NextResponse.next();
  if (pathname.startsWith("/api")) return NextResponse.next();

  // Skip public static files (logo.png, images, fonts, etc.)
  const isStaticFile =
    /\.(png|jpg|jpeg|gif|svg|webp|ico|css|js|map|txt|xml|woff|woff2|ttf|eot)$/.test(
      pathname,
    );

  if (isStaticFile) return NextResponse.next();

  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });

  const isLoggedIn = !!token;
  const isPublicRoute = isRoute(pathname, PUBLIC_ROUTES);
  const isAuthRoute = isRoute(pathname, AUTH_ROUTES);

  // logged in user tries to access login/signup => redirect to home
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // Protect private routes
  if (!isLoggedIn && !isPublicRoute && !isAuthRoute) {
    const loginUrl = new URL("/i/flow/login", req.url);
    loginUrl.searchParams.set("redirect_after_login", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
