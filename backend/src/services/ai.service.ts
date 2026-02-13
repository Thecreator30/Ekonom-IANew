import { env } from '../config/env';

export class AiService {
    private static async callOpenAI(messages: { role: string; content: string }[]) {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages,
                response_format: { type: 'json_object' },
            }),
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.status}`);
        }

        const data = await response.json();
        return JSON.parse(data.choices[0].message.content);
    }

    static async generatePromotionContent(context: {
        businessType: string;
        metrics: any;
        goal: string;
    }) {
        const systemPrompt = `Tu es Eko, un assistant IA expert en marketing pour les petits commerçants.
Ton style est : Energique, Professionnel mais accessible, et orienté résultats.
Règles strictes : Pas de promesses financières, pas de claims médicaux.
Réponds uniquement en JSON valide.`;

        const userPrompt = `Business : ${context.businessType}
Objectif : ${context.goal}
Données actuelles : ${JSON.stringify(context.metrics)}

Génère 3 suggestions de promotions. Pour chaque suggestion :
1. Un titre accrocheur (max 40 chars)
2. Une description courte (max 100 chars)
3. La valeur de la réduction suggérée (ex: -20%)
4. Une justification basée sur les données

Format JSON : { "suggestions": [{ "title": "...", "description": "...", "discount": "...", "reasoning": "..." }] }`;

        try {
            return await this.callOpenAI([
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt },
            ]);
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
Si on te demande de générer du contenu promotionnel, réponds en JSON : { "content": "..." }
Sinon, réponds en JSON : { "content": "ta réponse ici" }`;

        try {
            return await this.callOpenAI([
                { role: 'system', content: systemPrompt },
                { role: 'user', content: prompt },
            ]);
        } catch (error) {
            console.error('AI Chat Error:', error);
            return { content: "Désolé, je suis temporairement indisponible. Réessayez dans un instant." };
        }
    }
}
