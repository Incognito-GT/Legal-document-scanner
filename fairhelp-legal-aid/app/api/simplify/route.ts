import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { fileName } = await req.json()

    // Simulate processing delay for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate realistic mock simplified text
    const simplifiedText = `This document is a notice informing you that your landlord is starting the legal process to end your tenancy. Here's what you need to know:

**What This Means:** Your landlord is asking you to move out of your rental property. They've stated that you haven't paid rent for the past two months, and they're giving you legal notice that they plan to take action if the situation isn't resolved.

**Your Timeline:** You typically have 3-5 days to respond to this notice (the exact time depends on your state). During this time, you can either pay the overdue rent, work out a payment plan with your landlord, or prepare to move. If you don't respond, your landlord may file an eviction lawsuit in court.

**What You Can Do:** Don't ignore this notice. You have rights as a tenant, and there may be options available to you. Consider reaching out to a local legal aid organization (see our Resources page) who can review your specific situation for free. They can help you understand if the eviction notice was filed correctly, if you have any defenses, or if you qualify for rental assistance programs.

Remember: An eviction notice is not the same as being evicted. You still have time to take action and explore your options.`

    const keyPoints = [
      "You have 3-5 days to respond to this notice",
      "Contact a legal aid organization immediately for free help",
      "Check if you qualify for emergency rental assistance programs",
      "You may have legal defenses even if you owe rent",
      "Don't ignore this notice - taking action now protects your rights",
    ]

    return NextResponse.json({
      simplifiedText,
      keyPoints,
    })
  } catch (error) {
    console.error("[v0] Error in simplify API:", error)
    return NextResponse.json({ error: "Failed to simplify document" }, { status: 500 })
  }
}
