
import { streamObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { pokemonSchema } from "./schema";

export async function POST(req: Request) {
    try {
        const { type } = await req.json()

        const result = streamObject({
            model: openai("gpt-5-nano"),
            output: "array",
            schema: pokemonSchema,
            prompt: `Generate a list of 5 type ${type} pokemon`
        })

        return result.toTextStreamResponse()
    } catch (error) {
        console.log("Error getting pokemon:", error)
        return new Response("Failed to generate token", { status: 500 })
    }
} 