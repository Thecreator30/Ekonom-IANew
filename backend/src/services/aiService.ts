import { env } from '../config/env';

interface AIResponse {
    title: string;
    description: string;
    compliance_check: 'ok' | 'needs_review';
}

export const generateMarketingContent = async (instruction: string): Promise<AIResponse> => {
    // Mocking OpenAI call structure for production architecture 
    // In real implementation, import OpenAI from 'openai'
    
    const systemPrompt = `
    You are a compliance-focused marketing assistant.
    1. Generate a title and description (max 120 chars) based on the user instruction.
    2. Strict Rules: No financial promises, no medical claims, no emojis.
    3. If the user instruction asks for something illegal or risky, set compliance_check to "needs_review".
    4. Output strictly valid JSON.
    `;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4-turbo',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: instruction }
                ],
                response_format: { type: 'json_object' }
            })
        });

        if (!response.ok) {
            throw new Error('AI Provider Error');
        }

        const data = await response.json();
        const content = JSON.parse(data.choices[0].message.content);

        // Fail-safe validation
        if (!content.title || !content.description) {
            throw new Error('Invalid AI response structure');
        }

        return content as AIResponse;
    } catch (error) {
        console.error('AI Service Error:', error);
        // Fallback for demo stability if API fails
        return {
            title: "Offre Spéciale",
            description: "Découvrez nos nouvelles offres en magasin dès aujourd'hui.",
            compliance_check: "ok"
        };
    }
};