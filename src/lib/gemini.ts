import { GoogleGenAI, Type } from "@google/genai";

/**
 * Skyronix AI Service (Modern GoogleGenAI SDK)
 * Using Gemini 3 series for maximum reliability and higher quota limits.
 */

// Robust API Key detection for Vite/Vercel/Local environments
const getApiKey = () => {
  // 1. Try the platform-provided key (Common in AI Studio / Node environments)
  const processKey = typeof process !== 'undefined' ? (process.env?.GEMINI_API_KEY || process.env?.VITE_GEMINI_API_KEY) : null;
  if (processKey && processKey !== "PASTE_YOUR_KEY_HERE" && processKey !== "MY_GEMINI_API_KEY") return processKey;

  // 2. Try Vite-prefixed env (Standard for Vercel + Vite)
  const viteKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
  if (viteKey && viteKey !== "PASTE_YOUR_KEY_HERE") return viteKey;

  // 3. Fallback to any raw GEMINI_API_KEY from import.meta
  const rawKey = (import.meta as any).env?.GEMINI_API_KEY;
  if (rawKey && rawKey !== "PASTE_YOUR_KEY_HERE") return rawKey;

  return "";
};

const API_KEY = getApiKey();
const ai = new GoogleGenAI({ apiKey: API_KEY });

function checkApiKey() {
  if (!API_KEY) {
    throw new Error("API Key is missing. Please ensure GEMINI_API_KEY is set in your Secrets panel.");
  }
}

/**
 * Robust model request helper with fallback support.
 */
async function tryGenerate(
  modelIds: string[], 
  generateFn: (modelId: string) => Promise<any>
) {
  let lastError: any = null;
  
  for (const modelId of modelIds) {
    try {
      console.log(`[AI] Attempting task with ${modelId}...`);
      return await generateFn(modelId);
    } catch (error: any) {
      const errorMessage = error.message?.toLowerCase() || "";
      console.warn(`[AI] Model ${modelId} failed: ${errorMessage}`);
      lastError = error;
      
      if (
        errorMessage.includes("429") || 
        errorMessage.includes("quota") || 
        errorMessage.includes("404") || 
        errorMessage.includes("not found") ||
        errorMessage.includes("403") ||
        errorMessage.includes("permission") ||
        errorMessage.includes("failed to fetch")
      ) {
        continue;
      }
    }
  }
  
  const finalMsg = lastError?.message || "AI Request failed";
  if (finalMsg.includes("429")) {
    throw new Error("Quota Exceeded: The AI is currently very busy. Please try again in 60 seconds.");
  }
  throw lastError || new Error("All AI models failed to respond.");
}

export async function generateSkyronixPoints(content: string) {
  checkApiKey();
  const prompt = `Analyze this text and extract precisely in JSON: title, subHeadline, points (list with title, description, iconType), and a summary. TEXT: ${content}`;
  
  return await tryGenerate(
    ["gemini-3.1-flash-lite-preview", "gemini-3-flash-preview"],
    async (modelId) => {
      const response = await ai.models.generateContent({
        model: modelId,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          systemInstruction: "You are a professional content extractor. Always respond with valid JSON.",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              subHeadline: { type: Type.STRING },
              points: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                    iconType: { type: Type.STRING }
                  },
                  required: ["title", "description", "iconType"]
                }
              },
              summary: { type: Type.STRING }
            },
            required: ["title", "subHeadline", "points", "summary"]
          }
        }
      });
      
      return JSON.parse(response.text.trim());
    }
  );
}

export async function generateAIText(prompt: string) {
  checkApiKey();
  return await tryGenerate(
    ["gemini-3-flash-preview"],
    async (modelId) => {
      const response = await ai.models.generateContent({
        model: modelId,
        contents: prompt
      });
      return response.text;
    }
  );
}

export async function generateImage(prompt: string) {
  checkApiKey();
  return await tryGenerate(
    ["gemini-2.5-flash-image"],
    async (modelId) => {
      const response = await ai.models.generateContent({
        model: modelId,
        contents: `Create a professional cinematic artistic image based on the following request. Resolve typos if necessary (e.g. 'crate' means 'create'): ${prompt}`,
      });
      
      const imagePart = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
      if (imagePart?.inlineData) {
        return `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`;
      }
      return null;
    }
  );
}

export async function generateResearchPlan(topic: string) {
  checkApiKey();
  return await tryGenerate(
    ["gemini-3.1-pro-preview", "gemini-3-flash-preview"],
    async (modelId) => {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().toLocaleString('default', { month: 'long' });
      
      const response = await ai.models.generateContent({
        model: modelId,
        contents: `Research task: Create a comprehensive 30-day social media content strategy for: "${topic}". 
        
        CRITICAL REAL-TIME REQUIREMENTS:
        1. LIVE 2026 DATA: You MUST research and incorporate current market trends, viral hooks, and real-time news for ${currentMonth} ${currentYear}.
        2. GOOGLE SEARCH: Effectively use your research tools to find what is trending on social media RIGHT NOW in ${currentYear}.
        3. HUMAN-WRITTEN STYLE: Avoid generic AI-sounding phrases.
        4. LONGER POSTS: Each 'postContent' must be substantial (at least 3-4 paragraphs), including hashtags and a clear call-to-action.
        5. STRATEGIC JOURNEY: The 30 days should take the audience from awareness to trust to conversion.`,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          systemInstruction: "You are a Social Media Strategist. Your output must be a JSON object containing a 'plan' array. Each item in 'plan' must have: 'day' (number 1-30), 'theme' (short phase title), 'idea' (the core concept incorporating a current trend), and 'postContent' (a long, professional post).",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              plan: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    day: { type: Type.NUMBER },
                    theme: { type: Type.STRING },
                    idea: { type: Type.STRING },
                    postContent: { type: Type.STRING }
                  },
                  required: ["day", "theme", "idea", "postContent"]
                }
              }
            },
            required: ["plan"]
          }
        }
      });
      
      const data = JSON.parse(response.text.trim());
      return data.plan;
    }
  );
}

export async function chatWithAI(messages: any[]) {
  checkApiKey();
  return await tryGenerate(
    ["gemini-3-flash-preview"],
    async (modelId) => {
      const response = await ai.models.generateContent({
        model: modelId,
        contents: messages,
        config: {
          systemInstruction: "You are Skyronix Assistant, helpful and creative."
        }
      });
      return response.text;
    }
  );
}
