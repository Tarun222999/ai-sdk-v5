import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { text } from "stream/consumers";

export async function POST(req: Request) {
    try {
        const { text } = await req.json()

        const result = await generateObject({
            model: openai('gpt-5-mini'),
            output: "enum",
            enum: ["positive", "negative", "neutral"],
            prompt: `Classify the sentiment in this text:${text}`
        })

        return result.toJsonResponse()
    } catch (error) {
        console.log("Error generating sentiment", error)
        return new Response("Failed to generate sentiment", { status: 500 })
    }
}