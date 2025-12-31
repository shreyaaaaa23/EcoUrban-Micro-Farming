
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

// Fixed: Initialization must use process.env.API_KEY directly.
// To ensure we always use the latest key (e.g. from an AI Studio dialog), we instantiate right before use.

export const analyzePlantHealth = async (imageDataBase64: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: imageDataBase64 } },
          { text: "Analyze the health of this plant. Identify the species if possible. Provide a health score (0-100) and specific advice on lighting, watering, and nutrients. Keep it concise." }
        ]
      },
      config: {
        systemInstruction: "You are an expert urban botanist and AI horticulturist. Your goal is to help apartment dwellers maintain thriving micro-farms."
      }
    });
    // Fixed: response.text is a getter property, not a method.
    return response.text || "Analysis unavailable.";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "Could not analyze image. Please check your connection.";
  }
};

export const getGeneticRecommendations = async (markers: string): Promise<any> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Based on these genetic health markers: ${markers}, suggest 3-4 specific microgreens or medicinal plants that would optimize this user's nutrition. Explain the bio-chemical link. Return as a JSON array with name, benefit, and reason.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              benefit: { type: Type.STRING },
              reason: { type: Type.STRING }
            },
            required: ["name", "benefit", "reason"]
          }
        }
      }
    });
    // Fixed: response.text is a property.
    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Gemini DNA Recs Error:", error);
    return [];
  }
};
