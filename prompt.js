import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { getMeals} from "./supabase.js";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    }
  ];

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  safetySettings
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const generateChatSession = async (chat) => {

    const meals = await getMeals();

    return model.startChat({
        generationConfig,
        history: [
          {
            role: "user",
            parts: chat,
          },
        ],
      });
}