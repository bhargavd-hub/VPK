import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { message, history, productContext } = await req.json()

  // If no API key configured, return a helpful fallback response
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    return NextResponse.json({
      reply: `I'm the VPK AI Assistant! Unfortunately, the AI service isn't configured yet. 

To enable full AI responses, add your **GEMINI_API_KEY** to your \`.env.local\` file:

\`\`\`
GEMINI_API_KEY=your_api_key_here
\`\`\`

In the meantime, here's some general advice:
- For home improvement projects, always measure twice and cut once
- Ensure you have the right safety equipment before starting any task
- Check our product catalog for the tools and materials you need

How else can I help you today?`,
    })
  }

  try {
    const systemInstruction = `You are a helpful customer support assistant for VPK, a home improvement and building materials store. 
Help users find products, provide product details, and answer general questions about home improvement projects.

Current VPK product catalog:
${productContext}

When answering questions about products, refer to this catalog. Format responses using Markdown for readability.`

    const prompt = history ? `${history}\nUser: ${message}\nAssistant:` : `User: ${message}\nAssistant:`

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemInstruction }] },
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 1000, temperature: 0.7 },
      }),
    })

    const data = await res.json()
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'I could not generate a response.'
    return NextResponse.json({ reply })
  } catch (err) {
    console.error('Gemini API error:', err)
    return NextResponse.json({ reply: 'Sorry, I encountered an error. Please try again.' }, { status: 500 })
  }
}
