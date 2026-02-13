import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

export interface PromotionContent {
  title: string;
  description: string;
}

const FALLBACK_RESPONSES: PromotionContent[] = [
  { title: "Offre Flash du Weekend", description: "Profitez de -25% sur toute la boutique ce samedi et dimanche ! Une occasion en or pour vos clients fideles." },
  { title: "Happy Hour -30%", description: "Lancez une offre happy hour : -30% entre 14h et 16h pour booster le trafic en heures creuses." },
  { title: "Pack Decouverte", description: "Creez un pack decouverte a prix reduit pour attirer de nouveaux clients et leur faire decouvrir vos best-sellers." },
  { title: "Parrainage Gagnant", description: "Offrez 10% a chaque client qui ramene un ami. Double recompense pour le parrain et le filleul !" },
  { title: "Vente Privee VIP", description: "Reservez une soiree exclusive pour vos meilleurs clients avec des reductions allant jusqu'a -40%." },
];

let fallbackIndex = 0;

const getFallback = (): PromotionContent => {
  const content = FALLBACK_RESPONSES[fallbackIndex % FALLBACK_RESPONSES.length];
  fallbackIndex++;
  return content;
};

export const generatePromotionContent = async (instruction: string): Promise<PromotionContent> => {
  // If no API key, return intelligent fallback
  if (!apiKey) {
    await new Promise(r => setTimeout(r, 600)); // Simulate delay
    return getFallback();
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const model = 'gemini-2.0-flash';
    const prompt = `Tu es un expert en marketing pour les petits commercants.
    Instruction : "${instruction}"

    Genere un titre accrocheur et une description persuasive pour une offre promotionnelle.
    Reponds en JSON avec deux cles : "title" et "description".
    Garde un ton professionnel mais dynamique. Reponds en francais.
    Le JSON doit etre valide.
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
    console.error("Gemini error, using fallback:", error);
    return getFallback();
  }
};
