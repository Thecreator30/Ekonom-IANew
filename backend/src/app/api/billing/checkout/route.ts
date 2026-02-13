import { NextRequest, NextResponse } from "next/server";
import { BillingService } from "@/services/billing.service";
import { AuthService } from "@/services/auth.service";

export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        const merchant = await AuthService.verifyToken(authHeader.replace("Bearer ", ""));
        if (!merchant) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await req.json();
        const { plan } = body; // 'PRO' or 'ENTERPRISE'

        const checkoutUrl = await BillingService.createCheckoutSession(merchant.id, plan);

        return NextResponse.json({ url: checkoutUrl });
    } catch (error: any) {
        console.error("Billing Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
