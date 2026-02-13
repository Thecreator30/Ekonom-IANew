import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/infrastructure/db";
import { AuthService } from "@/services/auth.service";

async function authenticate(req: NextRequest) {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return null;
    return AuthService.verifyToken(authHeader.replace("Bearer ", ""));
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const merchant = await authenticate(req);
        if (!merchant) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const coupon = await prisma.coupon.findUnique({
            where: { id: params.id, merchant_id: merchant.id },
            include: { subscriber: true }
        });

        if (!coupon) return NextResponse.json({ error: "Not Found" }, { status: 404 });

        return NextResponse.json(coupon);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
