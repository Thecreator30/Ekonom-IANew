import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/infrastructure/prisma";
import { AuthService } from "@/services/auth.service";

// GET /api/coupons - List all coupons (with optional filtering)
export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        const merchant = await AuthService.verifyToken(authHeader.replace("Bearer ", ""));
        if (!merchant) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { searchParams } = new URL(req.url);
        const status = searchParams.get('status');

        const coupons = await prisma.coupon.findMany({
            where: {
                merchant_id: merchant.id,
                ...(status ? { status: status as any } : {})
            },
            orderBy: { created_at: 'desc' },
            take: 50
        });

        return NextResponse.json(coupons);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
