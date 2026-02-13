import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // Ensure this is set in your environment
const ai = new GoogleGenAI({ apiKey });

export interface PromotionContent {
  title: string;
  description: string;
}

export const generatePromotionContent = async (instruction: string): Promise<PromotionContent> => {
  try {
    const model = 'gemini-3-flash-preview';
    const prompt = `You are an expert marketing copywriter for small businesses. 
    Based on the following instruction, generate a catchy title and a persuasive description for a promotional offer.
    
    Instruction: "${instruction}"
    
    Return the result in JSON format with two keys: "title" and "description".
    Keep the tone professional yet exciting.
    The response MUST be valid JSON.
    Example output:
    {
      "title": "Offre Spéciale Été ☀️",
      "description": "Profitez de 50% de réduction sur toute la collection..."
    }
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text) as PromotionContent;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
};