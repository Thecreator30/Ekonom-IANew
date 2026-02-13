import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_KEY || "");

export class AiService {
    private static model = genAI.getGenerativeModel({ model: "gemini-pro" });

    static async generatePromotionContent(context: {
        businessType: string;
        metrics: any;
        goal: string;
    }) {
        // EkoBot Persona Prompt
        const prompt = `
      Tu es Eko, un assistant IA expert en marketing pour les petits commerçants (${context.businessType}).
      Ton style est : Energique, Professionnel mais accessible, et orienté résultats.
      
      Contexte :
      - Business : ${context.businessType}
      - Objectif : ${context.goal}
      - Données actuelles : ${JSON.stringify(context.metrics)}

      Génère 3 suggestions de promotions performantes pour atteindre cet objectif.
      Pour chaque suggestion, fournis :
      1. Un titre accrocheur (max 40 chars).
      2. Une description courte (max 100 chars).
      3. La valeur de la réduction suggérée (ex: -20%).
      4. Une justification basée sur les données (pourquoi ça va marcher).

      Réponds uniquement en JSON au format :
      {
        "suggestions": [
          { "title": "...", "description": "...", "discount": "...", "reasoning": "..." }
        ]
      }
    `;

        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            // Clean markdown if present
            const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
            return JSON.parse(jsonStr);
        } catch (error) {
            console.error("AI Generation Error:", error);
            // Fallback if AI fails (or no key provided)
            return {
                suggestions: [
                    {
                        title: "Offre Flash",
                        description: "20% de réduction sur tout le magasin aujourd'hui !",
                        discount: "-20%",
                        reasoning: "Classique et efficace pour booster le trafic immédiat."
                    }
                ]
            };
        }
    }
}
