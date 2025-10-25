"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, FileText, Loader2 } from "lucide-react"
import { ChatMessage } from "@/components/chat-message"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function ChatPage() {
  const router = useRouter()
  const [documentName, setDocumentName] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Welcome! Ask any questions about your legal document. I can help clarify what it means, explain your options, and guide you on next steps.",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const storedDoc = sessionStorage.getItem("uploadedDocument")
    if (!storedDoc) {
      router.push("/")
      return
    }
    const docData = JSON.parse(storedDoc)
    setDocumentName(docData.name)
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      })

      const content = await response.text()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("[v0] Chat error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm sorry, I encountered an error. Please try again.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => router.push("/analyze")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Analysis
            </Button>
            {documentName && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>{documentName}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto flex flex-1 flex-col px-4 py-8">
        <div className="mb-6">
          <h1 className="mb-2 text-3xl font-bold">Document Q&A</h1>
          <p className="text-muted-foreground">Get answers about your legal document</p>
        </div>

        <Card className="flex flex-1 flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto p-6">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Thinking...</span>
              </div>
            )}
          </div>

          <div className="border-t p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question about your document..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="mt-2 text-xs text-muted-foreground">
              Remember: This is for informational purposes only and not legal advice.
            </p>
          </div>
        </Card>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card className="p-4">
            <h3 className="mb-2 text-sm font-semibold">Example Questions</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• What are my rights in this situation?</li>
              <li>• What should I do next?</li>
              <li>• What does this legal term mean?</li>
            </ul>
          </Card>
          <Card className="p-4">
            <h3 className="mb-2 text-sm font-semibold">Quick Tips</h3>
            <p className="text-sm text-muted-foreground">
              Be specific with your questions for more accurate answers. You can ask follow-up questions anytime.
            </p>
          </Card>
          <Card className="p-4">
            <h3 className="mb-2 text-sm font-semibold">Need More Help?</h3>
            <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
              <a href="/resources">Find Legal Resources</a>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
