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
  const prompt = `CORE STRATEGIC TASK: Analyze the following narrative and extract a high-impact "Battle Plan" for a viral social media post.
  
  ANALYSIS GUIDELINES:
  1. TITLES: Create a Provocative, High-Energy main title (max 5 words) and a subHeadline that builds massive curiosity.
  2. ALL MAIN POINTS: Extract 3-6 "Neural Points" capturing ALL critical insights. For each, provide a short, punchy 'title' and an EXTREMELY concise 'description' (max 12 words) to ensure they fit the design.
  3. ICON MAPPING: Assign one of these iconTypes: shield, diamond, star, rocket, check, lightbulb, zap, target, trophy, award, laptop, globe, trending, search, activity, cpu.
  4. EXECUTIVE SUMMARY: Write a "Killer Closer" summary. It MUST be a complete, powerful sentence (max 22 words). DO NOT STOP MID-SENTENCE.
  5. TONE: Extreme quality, high-status, growth hacker personality.
  
  THEME CONTEXT: The design is Ultra-Premium Golden & Aqua.
  
  TEXT TO ANALYZE: "${content}"`;
  
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
    ["gemini-3-flash-preview", "gemini-3.1-pro-preview"],
    async (modelId) => {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().toLocaleString('default', { month: 'long' });
      
      const response = await ai.models.generateContent({
        model: modelId,
        contents: `STRATEGIC TASK: Generate a 30-day "Viral Velocity" social media strategy for: "${topic}".
 
        CORE OBJECTIVES:
        1. REAL-TIME TRENDS: Identify viral trends and sounds for ${currentMonth} ${currentYear}. 
        2. VIRAL PSYCHOLOGY: Design high-retention hooks (e.g., The "New Paradigm" of..., Why [Competitor Style] is failing).
        3. HUMAN TONE: Post content must be "No-AI" style. Sentence fragments, provocative questions, high energy.
        4. CONCISE IMPACT: Each post should be 1-2 powerful paragraphs (100-150 words) with a Hook, Value, and CTA. 
        5. PLATFORM VERSATILE: Works for IG/TikTok (vertical) and LinkedIn/X text.`,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          systemInstruction: "You are an elite Social Media Growth Hacker. Output a JSON 'plan' array. Each item MUST have: 'day' (1-30), 'theme', 'idea' (the viral hook), and 'postContent' (1-2 paragraphs of high-impact, human-sounding copy). Be concise but extremely valuable.",
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

export async function generateSeriesPlan(topic: string, dayCount: number, extraInstructions: string = "") {
  checkApiKey();
  return await tryGenerate(
    ["gemini-3-flash-preview", "gemini-3.1-pro-preview"],
    async (modelId) => {
      const currentYear = new Date().getFullYear();
      
      const response = await ai.models.generateContent({
        model: modelId,
        contents: `STRATEGIC TASK: Create a comprehensive ${dayCount}-day "Social Media Course/Series" titled with the topic: "${topic}".
 
        SPECIFIC INSTRUCTIONS: ${extraInstructions}
 
        SERIES ARCHITECTURE:
        1. PROGRESSIVE LEARNING: Day 1 starts with basic logic; Day ${dayCount} ends with mastery.
        2. HUMAN-WRITTEN VIRALITY: Every post MUST sound like a real person, not an AI. Use conversational hooks, industry secrets, and "unpopular opinions" to spark engagement.
        3. PRACTICAL & VALUABLE: Provide actual steps, frameworks, or "cheat codes" readers can use immediately.
        4. ALGORITHM RESISTANT: Avoid AI clichés. Use rhythmic pacing, sentence fragments, and personal-styled insights.
        5. CONCISE IMPACT: Each post should be ~150 words of high-impact value. 

        Output ${dayCount} items in the JSON 'plan' array.`,
        config: {
          responseMimeType: "application/json",
          systemInstruction: `You are an elite educator and growth hacker. Respond with valid JSON. 
          The 'plan' array should contain ${dayCount} items. 
          Each item: {'day': number, 'theme': 'The lesson title', 'idea': 'The viral angle', 'postContent': 'The actual human-written post copy'}. 
          Ensure the content is up-to-date for ${currentYear}.`,
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

export async function searchProfiles(platform: string, topic: string, recognition: string, location: string, followers: string, excludeUrls: string[] = []) {
  checkApiKey();
  const excludeText = excludeUrls.length > 0 ? ` DO NOT return any of these URLs: ${excludeUrls.join(', ')}.` : "";
  const query = `Find ${platform} profiles for: Topic: ${topic}, Role: ${recognition}, Location: ${location}, Followers: ${followers}.${excludeText}`;
  
  return await tryGenerate(
    ["gemini-3-flash-preview", "gemini-3.1-pro-preview"],
    async (modelId) => {
      const response = await ai.models.generateContent({
        model: modelId,
        contents: query,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          systemInstruction: `You are a professional profile tracker. Perform a Google Search to find ACTUAL and REAL ${platform} profile links matching the user's criteria. 
          Return a JSON 'results' array with up to 10 unique and NEW items.
          Please provide a MIX of both verified (high-status) and unverified (emerging) profile links.
          Each item MUST have: 'name', 'url' (direct link to profile), 'headline' (job title or bio snippet), 'location', and 'isVerified' (boolean).
          CRITICAL: Ensure ALL urls start with https:// and are direct profile links.`,
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              results: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    url: { type: Type.STRING },
                    headline: { type: Type.STRING },
                    location: { type: Type.STRING },
                    isVerified: { type: Type.BOOLEAN }
                  },
                  required: ["name", "url", "headline", "location", "isVerified"]
                }
              }
            },
            required: ["results"]
          }
        }
      });
      
      const data = JSON.parse(response.text.trim());
      return data.results;
    }
  );
}
