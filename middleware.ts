import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
    "/sign-in",
    "/sign-up",
    "/welcome",
    "/"
   
])

const isPublicApiRoute = createRouteMatcher([
    "/api/videos"
])


export default clerkMiddleware((auth, req) => {
    const {userId} = auth();
    const currentUrl = new URL(req.url)
    
    const isAccessingDashboard = currentUrl.pathname === "/"
    const isApiRequest = currentUrl.pathname.startsWith("/api")

    // If the user is authenticated and not accessing the home page
    if(userId && isPublicRoute(req) && !isAccessingDashboard){
        return NextResponse.redirect(new URL("/", req.url))
    }

    // Not Logged in
    if(!userId){

        // If user is not logged in and trying to access protected routes
        if(!isPublicRoute(req) && !isPublicApiRoute(req)){
            return NextResponse.redirect(new URL("/sign-in", req.url))
        }

        // If the request is for protected routes and he is not logged in
        if(isApiRequest && !isPublicApiRoute(req)){
            return NextResponse.redirect(new URL("/sign-in", req.url))
        }
    }

    return NextResponse.next()

});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)","/(api|trpc)(.*)"],
  };