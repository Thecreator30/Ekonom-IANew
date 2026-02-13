import { GoogleGenAI } from "@google/genai";
import { env } from '../config/env';

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY || '' });

export class AiService {
    private static async callGemini(prompt: string): Promise<any> {
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });

        const text = response.text;
        if (!text) throw new Error('No response from Gemini');
        return JSON.parse(text);
    }

    static async generatePromotionContent(context: {
        businessType: string;
        metrics: any;
        goal: string;
    }) {
        const prompt = `Tu es Eko, un assistant IA expert en marketing pour les petits commerçants.
Ton style est : Energique, Professionnel mais accessible, et orienté résultats.
Règles strictes : Pas de promesses financières, pas de claims médicaux.

Business : ${context.businessType}
Objectif : ${context.goal}
Données actuelles : ${JSON.stringify(context.metrics)}

Génère 3 suggestions de promotions. Pour chaque suggestion :
1. Un titre accrocheur (max 40 chars)
2. Une description courte (max 100 chars)
3. La valeur de la réduction suggérée (ex: -20%)
4. Une justification basée sur les données

Réponds en JSON : { "suggestions": [{ "title": "...", "description": "...", "discount": "...", "reasoning": "..." }] }`;

        try {
            return await this.callGemini(prompt);
        } catch (error) {
            console.error('AI Generation Error:', error);
            return {
                suggestions: [{
                    title: "Offre Flash",
                    description: "20% de réduction sur tout le magasin aujourd'hui !",
                    discount: "-20%",
                    reasoning: "Classique et efficace pour booster le trafic immédiat.",
                }],
            };
        }
    }

    static async chat(prompt: string) {
        const systemPrompt = `Tu es Eko, un assistant marketing IA pour les commerçants.
Tu aides à créer des promotions, rédiger des messages marketing, et donner des conseils.
Sois concis, professionnel et orienté action.
Réponds en JSON : { "content": "ta réponse ici" }

Demande de l'utilisateur : ${prompt}`;

        try {
            return await this.callGemini(systemPrompt);
        } catch (error) {
            console.error('AI Chat Error:', error);
            return { content: "Désolé, je suis temporairement indisponible. Réessayez dans un instant." };
        }
    }
}
