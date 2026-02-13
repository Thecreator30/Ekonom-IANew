import { NextRequest, NextResponse } from "next/server";
import { AiService } from "@/services/ai.service";
import { AuthService } from "@/services/auth.service";

export async function POST(req: NextRequest) {
    try {
        // 1. Auth Check
        const authHeader = req.headers.get("authorization");
        if (!authHeader) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        const merchant = await AuthService.verifyToken(authHeader.replace("Bearer ", ""));
        if (!merchant) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        // 2. Body Validation
        const body = await req.json();
        const { businessType, metrics, goal, prompt } = body;

        // 3. Generate
        if (prompt) {
            // Direct prompt mode (from Eko UI)
            const model = AiService['model']; // Access static private if needed, or check AiService
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return NextResponse.json({ content: response.text() });
        }

        const suggestions = await AiService.generatePromotionContent({
            businessType: businessType || "Commerce général",
            metrics: metrics || {},
            goal: goal || "Augmenter le trafic"
        });

        return NextResponse.json(suggestions);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
