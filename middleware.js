import { NextResponse, NextRequest } from "next/server";


export default function middleware(req) {
    let userParam = localStorage.getItem('user');
    let url = req.url;

    if(!userParam && url.includes('/admin')){
        const url = req.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }
} 
