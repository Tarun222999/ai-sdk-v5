import { openai } from "@ai-sdk/openai"
import { UIMessage, InferUITools, UIDataTypes, streamText, convertToModelMessages, tool, stepCountIs } from "ai"
import { z } from "zod";

const tools = {
    getWeather: tool({
        description: "Get the weather for location",
        inputSchema: z.object({
            city: z.string().describe("city to get the weather for")
        }),
        execute: async ({ city }) => {
            if (city === "Gotham city") {
                return "70F and cloudy"
            } else if (city === "Metropolis") {
                return "80F and sunny"
            } else {
                return "Unknown"
            }
        }
    })
}

export type ChatTools = InferUITools<typeof tools>
export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>
export async function POST(req: Request) {
    const { messages }: { messages: ChatMessage[] } = await req.json();
    const result = streamText({
        model: openai("gpt-5-mini"),
        messages: convertToModelMessages(messages),
        tools,
        stopWhen: stepCountIs(2)
    });

    return result.toUIMessageStreamResponse();
}