import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json()

    // Require env variable — do NOT leak URL in GitHub
    const LLM_URL = process.env.LLM_URL
    if (!LLM_URL) {
      throw new Error("Missing URL environment variable")
    }

    // Call your private AI server
    const response = await fetch(LLM_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    })

    if (!response.ok) {
      throw new Error(`AI server responded with status ${response.status}`)
    }

    const data = await response.json()

    // Return only the .response text
    return NextResponse.json({ response: data.response })

  } catch (err) {
    console.error("AI server error:", err)
    return NextResponse.json(
      { error: "Failed to communicate with AI server" },
      { status: 500 }
    )
  }
}
