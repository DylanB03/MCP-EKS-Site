import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json()

    // Replace this URL with your actual AI server endpoint
    const AI_SERVER_URL = process.env.AI_SERVER_URL || "http://localhost:8000/chat"

    const response = await fetch(AI_SERVER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any authentication headers your server requires
        // "Authorization": `Bearer ${process.env.AI_SERVER_TOKEN}`,
      },
      body: JSON.stringify({
        message,
        context,
        // Add any additional parameters your AI model needs
        max_tokens: 500,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      throw new Error(`AI server responded with status: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json({
      response: data.response || data.message || "I'm sorry, I couldn't process that request.",
    })
  } catch (error) {
    console.error("Error communicating with AI server:", error)

    return NextResponse.json({ error: "Failed to get response from AI server" }, { status: 500 })
  }
}
