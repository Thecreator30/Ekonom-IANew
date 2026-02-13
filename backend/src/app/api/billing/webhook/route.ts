import { NextRequest, NextResponse } from "next/server";
import { BillingService } from "@/services/billing.service";

// Disable Body Parser in Next.js (Edge case for Webhooks) - handled by retrieving buffer manually if needed
// But in App Router, we just read arrayBuffer()

export async function POST(req: NextRequest) {
    try {
        const signature = req.headers.get("stripe-signature");
        if (!signature) throw new Error("No signature");

        const text = await req.text(); // Get raw body
        const buffer = Buffer.from(text); // Need buffer for signature verification if using local lib, but stripe-node handles text/buffer mix differently. 
        // Ideally we pass Buffer. API logic in service expects Buffer.

        await BillingService.handleWebhook(signature, buffer);

        return NextResponse.json({ received: true });
    } catch (error: any) {
        console.error("Webhook Error:", error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
