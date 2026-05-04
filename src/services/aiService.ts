/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function askChemistryTeacher(userMessage: string, currentElement: string = "general chemistry") {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: `You are a friendly chemistry teacher for high school students.
        Answer questions about chemistry, elements, and the periodic table.
        Keep answers clear, short (3-5 sentences), and educational.
        Use simple language. Add 1 relevant emoji per answer.
        Current element context: ${currentElement}`,
      }
    });

    if (!response.text) {
      return "I'm having a bit of trouble connecting to my lab notes. Please try again later! 🧪";
    }

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, something went wrong in the lab! 🧪 Make sure the Gemini API key is set correctly.";
  }
}
