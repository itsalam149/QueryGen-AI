import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI
const apiKey = process.env.GEMINI_API_KEY ?? "";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-thinking-exp-01-21",
});

const generationConfig = {
    temperature: 0.7,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 65536,
    responseMimeType: "text/plain",
};

export async function POST(req: Request) {
    try {
        const { query } = await req.json();
        if (!query) {
            return NextResponse.json({ error: "Query is required" }, { status: 400 });
        }

        const chatSession = model.startChat({ generationConfig, history: [] });

        // Send the query to Gemini
        const result = await chatSession.sendMessage(`Convert this natural language query to SQL: ${query}`);
        const sqlResponse = result.response.text();

        // Extract SQL from markdown code block
        const match = sqlResponse.match(/```sql\n([\s\S]*?)\n```/);
        const cleanSQL = match ? match[1].trim() : sqlResponse.trim();

        return NextResponse.json({ sql: cleanSQL });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
