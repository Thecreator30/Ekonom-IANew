import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/infrastructure/prisma";
import { AuthService } from "@/services/auth.service";

// Helper for Auth
async function authenticate(req: NextRequest) {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return null;
    return AuthService.verifyToken(authHeader.replace("Bearer ", ""));
}

// GET /api/promotions/[id] - Get Single Promotion
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const merchant = await authenticate(req);
        if (!merchant) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const promotion = await prisma.promotion.findUnique({
            where: { id: params.id, merchant_id: merchant.id }
        });

        if (!promotion) return NextResponse.json({ error: "Not Found" }, { status: 404 });

        return NextResponse.json(promotion);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// PUT /api/promotions/[id] - Update Promotion
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const merchant = await authenticate(req);
        if (!merchant) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await req.json();

        // Ensure the promotion exists and belongs to the merchant
        const existing = await prisma.promotion.findUnique({
            where: { id: params.id, merchant_id: merchant.id }
        });
        if (!existing) return NextResponse.json({ error: "Not Found" }, { status: 404 });

        const updated = await prisma.promotion.update({
            where: { id: params.id },
            data: {
                title: body.title,
                description: body.description,
                discount_value: body.discount_value,
                status: body.status, // Can be used to Archive/Publish
                target_segment: body.target_segment,
                scheduled_at: body.scheduled_at ? new Date(body.scheduled_at) : undefined,
            }
        });

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// DELETE /api/promotions/[id] - Delete Promotion (or Archive)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const merchant = await authenticate(req);
        if (!merchant) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        // Hard delete or Soft delete? Typically soft delete/archive is better, but let's allow delete for Drafts
        const existing = await prisma.promotion.findUnique({
            where: { id: params.id, merchant_id: merchant.id }
        });

        if (!existing) return NextResponse.json({ error: "Not Found" }, { status: 404 });

        await prisma.promotion.delete({
            where: { id: params.id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
