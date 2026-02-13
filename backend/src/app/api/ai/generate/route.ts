import { NextRequest, NextResponse } from "next/server";
import { AiService } from "@/services/ai.service";
import { AuthService } from "@/services/auth.service";

export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        const merchant = await AuthService.verifyToken(authHeader.replace("Bearer ", ""));
        if (!merchant) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await req.json();
        const { businessType, metrics, goal, prompt } = body;

        // Direct prompt mode (from Eko chat UI)
        if (prompt) {
            const result = await AiService.chat(prompt);
            return NextResponse.json(result);
        }

        // Structured promotion generation
        const suggestions = await AiService.generatePromotionContent({
            businessType: businessType || "Commerce général",
            metrics: metrics || {},
            goal: goal || "Augmenter le trafic",
        });

        return NextResponse.json(suggestions);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
