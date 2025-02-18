/* eslint-disable @typescript-eslint/no-explicit-any */

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decode } from "./helpers/jwtHelpers";

const authRoutes = ["/login", "/register"];
export async function middleware(request: NextRequest) {
  console.log(request, "middleware");

  const { pathname } = request.nextUrl;
  const accessToken = (await cookies()).get("accessToken")?.value;
  //protechting hybrid route
  if (!accessToken) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      // return NextResponse.redirect(new URL("/login", request.url));
      return NextResponse.redirect(
        new URL(
          pathname ? `/login?redirect=${pathname}` : "/login",
          request.url
        )
      );
    }
  }

  let decodedToken = null;
  decodedToken = decode(accessToken) as any;
  const role = decodedToken?.role;
  // if (role == "admin" && pathname === "/admin-dashboard") {
  //   return NextResponse.next();
  // }
  // if (role == "driver" && pathname === "/driver-dashboard") {
  //   return NextResponse.next();
  // }
  // if (role == "user" && pathname === "/dashboard") {
  //   return NextResponse.next();
  if (role == "admin" && pathname.match(/^\/admin-dashboard/)) {
    return NextResponse.next();
  }
  if (role == "driver" && pathname.match(/^\/driver-dashboard/)) {
    return NextResponse.next();
  }
  if (role == "user" && pathname.match(/^\/dashboard/)) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    // "/login",
    // "/register",
    // nested router katre :page* use kora hoyasa
    "/dashboard/:page*",
    "/admin-dashboard/:page*",
    "/driver-dashboard/:page*",
  ],
};
