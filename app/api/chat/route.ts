import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || ""

    // Simulate streaming delay for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 800))

    let response = ""

    // Provide contextual responses based on common questions
    if (lastMessage.includes("pay") || lastMessage.includes("payment") || lastMessage.includes("rent")) {
      response = `If you're having trouble paying rent, here are some options to consider:

1. **Talk to your landlord immediately** - Many landlords prefer to work out a payment plan rather than go through eviction.

2. **Emergency rental assistance** - Many states and cities have programs that can help pay your rent. Check with your local housing authority or visit 211.org.

3. **Legal protections** - Some areas have eviction moratoriums or require landlords to accept payment plans. A legal aid attorney can tell you what applies in your situation.

Remember: This is educational information, not legal advice. Contact a local legal aid organization for guidance specific to your case.`
    } else if (lastMessage.includes("court") || lastMessage.includes("hearing")) {
      response = `Going to court can feel intimidating, but here's what to expect:

1. **Prepare your case** - Bring any documents that support your position: rent receipts, repair requests, photos, communications with your landlord.

2. **Arrive early** - Get to court at least 30 minutes before your hearing time. Dress professionally and be respectful.

3. **Tell your story clearly** - The judge will ask you questions. Answer honestly and stick to the facts.

4. **Get legal help** - Many courts have free legal clinics on eviction hearing days. Arrive early to speak with an attorney.

You have the right to defend yourself in court. Don't give up without exploring your options.`
    } else if (lastMessage.includes("move") || lastMessage.includes("leave")) {
      response = `If you're considering moving out, here are important things to know:

1. **Don't just leave** - Abandoning the property could hurt you legally and financially. Give proper notice if possible.

2. **Document everything** - Take photos of the property's condition when you leave. This protects you from unfair damage claims.

3. **Get it in writing** - If you and your landlord agree you'll move out, get the agreement in writing, including any terms about rent owed.

4. **Know your rights** - Even if you're moving, you may still have rights to your security deposit or protection from unfair charges.

Consider speaking with a legal aid attorney before making any final decisions.`
    } else if (
      lastMessage.includes("lawyer") ||
      lastMessage.includes("attorney") ||
      lastMessage.includes("legal aid")
    ) {
      response = `Getting legal help is one of the best steps you can take:

1. **Legal aid organizations** - Provide free legal help to people who qualify based on income. Check our Resources page for organizations in your area.

2. **Law school clinics** - Many law schools offer free legal clinics where students supervised by professors can help.

3. **Court self-help centers** - Most courthouses have self-help centers with free information and sometimes brief attorney consultations.

4. **Pro bono attorneys** - Some private attorneys take cases for free. Your local bar association can provide referrals.

Don't wait - legal aid organizations often have waiting lists, so reach out as soon as possible.`
    } else {
      response = `I'm here to help you understand your legal document. Here are some things I can explain:

- What the document means in plain English
- What timeline you're working with
- What options you might have
- Where to find legal help in your area

Feel free to ask me specific questions about your situation, like:
- "What happens if I can't pay the rent?"
- "How do I prepare for a court hearing?"
- "Where can I find a free lawyer?"

Remember: I provide educational information to help you understand your situation, but this isn't legal advice. For guidance specific to your case, please contact a legal aid organization.`
    }

    // Return response in a format compatible with the chat UI
    return new Response(response, {
      headers: {
        "Content-Type": "text/plain",
      },
    })
  } catch (error) {
    console.error("[v0] Error in chat API:", error)
    return NextResponse.json({ error: "Failed to process chat message" }, { status: 500 })
  }
}
