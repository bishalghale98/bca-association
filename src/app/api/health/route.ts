import dbConnect from '@/lib/dbConnect';
import { NextResponse } from 'next/server';
export async function GET() {
    try {
        await dbConnect()
        return NextResponse.json({
            success: true,
            message: "Api is working"
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error
        })
    }

}