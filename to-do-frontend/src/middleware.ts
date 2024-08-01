// middleware.ts

import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
    const targetUrl = `${process.env.NEXT_APP_API_URL}` + req.nextUrl.pathname + req.nextUrl.search

    console.log("targetUrl:" + targetUrl);
    try {
        console.log("Inside try")
        const response = await fetch(targetUrl, {
            method: req.method,
            headers: req.headers,
            body: req.method !== 'GET' && req.method !== 'HEAD' && req.method !== 'DELETE' ? await req.text() : undefined,
        })

        console.log("Over here")
        const data = await response.text()

        console.log("Over there")

        console.log("Data: " + data)
        console.log("Status: " + response.status)

        if (response.status == 204 || response.status == 304) {
            return new NextResponse(null, {
                status: response.status,
                headers: response.headers,
            })
        }

        return new NextResponse(data, {
            status: response.status,
            headers: response.headers,
        })


    } catch (error) {
        console.log("Error: " + error)
        return new NextResponse(JSON.stringify({ error: `Error proxying request ${(error as any).msg}` }), { status: 500 })
    }
}

export const config = {
    matcher: '/api/:path*',
}