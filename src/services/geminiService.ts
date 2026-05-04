/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const geminiService = {
  async askAboutElement(elementName: string, symbol: string, question: string) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `I am looking at the element ${elementName} (${symbol}) in a periodic table app. 
                   Question: ${question}`,
        config: {
          systemInstruction: "You are an expert chemist assistant. Provide concise, accurate information about chemical elements. Use simple language suitable for students.",
        },
      });
      return response.text || "I'm not sure about that. Let me look it up! 🧪";
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw new Error("I'm having trouble connecting to my chemistry brain right now. Please try again later!");
    }
  },

  async explainReaction(reactant1: string, reactant2: string) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Explain what happens when ${reactant1} reacts with ${reactant2}. 
                   Provide the chemical equation and a brief explanation of the process.`,
        config: {
          systemInstruction: "You are a laboratory supervisor. Explain chemical reactions clearly and focus on safety and the scientific principles involved.",
        },
      });
      return response.text || "The reaction setup seems to be missing something. 🧪";
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw new Error("The virtual lab is currently undergoing maintenance. Reaction explanation unavailable.");
    }
  },

  async balanceEquation(equation: string) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Balance this chemical equation: ${equation}. 
                   Return ONLY the balanced equation. Use subscript characters where appropriate (e.g., H₂O instead of H2O).`,
        config: {
          systemInstruction: "You are a stoichiometry expert. You take unbalanced chemical equations and return their balanced versions. No explanation, just the equation.",
        },
      });
      return (response.text || "").trim();
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw new Error("I couldn't balance that one. Try a simpler reaction like H2 + O2 -> H2O.");
    }
  }
};
