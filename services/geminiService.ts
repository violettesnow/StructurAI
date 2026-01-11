
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function processRawPrompt(content: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze and structure this raw prompt content into a reusable workflow template: "${content}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          description: { type: Type.STRING },
          systemPrompt: { type: Type.STRING },
          userVariables: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          category: { type: Type.STRING },
          tags: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          }
        },
        required: ["name", "description", "systemPrompt", "userVariables", "category", "tags"]
      }
    }
  });

  return JSON.parse(response.text);
}

export async function generateSamplePrompts() {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: "Generate 5 diverse, highly technical AI prompts that a senior developer might bookmark from Twitter or save in their notes. Return them as a list of objects with title and content.",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            content: { type: Type.STRING }
          }
        }
      }
    }
  });
  return JSON.parse(response.text);
}
