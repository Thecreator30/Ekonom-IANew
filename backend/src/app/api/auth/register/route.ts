import { NextResponse } from 'next/server';
import { AuthService } from '@/services/auth.service';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const result = await AuthService.register(body);
        return NextResponse.json(result);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
