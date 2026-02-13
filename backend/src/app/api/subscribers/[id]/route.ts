import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/infrastructure/prisma";
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

        const subscriber = await prisma.subscriber.findUnique({
            where: { id: params.id, merchant_id: merchant.id },
            include: { coupons: true }
        });

        if (!subscriber) return NextResponse.json({ error: "Not Found" }, { status: 404 });

        return NextResponse.json(subscriber);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const merchant = await authenticate(req);
        if (!merchant) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const existing = await prisma.subscriber.findUnique({
            where: { id: params.id, merchant_id: merchant.id }
        });

        if (!existing) return NextResponse.json({ error: "Not Found" }, { status: 404 });

        await prisma.subscriber.delete({
            where: { id: params.id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
