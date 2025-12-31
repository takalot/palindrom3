import { GoogleGenerativeAI } from '@google/generative-ai';

export class GeminiService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY || process.env.REACT_APP_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set in environment variables');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async discoverPalindromes(text?: string): Promise<{ palindromes: Array<{ text: string; book: string; chapter: string; verse: string; meaning?: string }> }> {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = text 
      ? `Find interesting palindromic sequences in this Hebrew text: "${text}". Focus on the Tanakh. Return JSON: {palindromes: [{text, book, chapter, verse, meaning?}]}`
      : `Discover interesting palindromic sequences in the Hebrew Tanakh. Return JSON: {palindromes: [{text, book, chapter, verse, meaning?}]}`;
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().replace(/```json|```/g, '').trim();
    return JSON.parse(responseText);
  }

  async identifySource(original: string): Promise<{ found: boolean; book?: string; chapter?: string; verse?: string }> {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `Identify the exact source in the Hebrew Tanakh for this text snippet: "${original}". Return JSON: {found: boolean, book?, chapter?, verse?}`;
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().replace(/```json|```/g, '').trim();
    return JSON.parse(responseText);
  }
}