import type { Message } from "@ai-sdk/react"
import { FileText, User } from "lucide-react"

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <div
        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${isUser ? "bg-muted" : "bg-primary/10"}`}
      >
        {isUser ? <User className="h-4 w-4" /> : <FileText className="h-4 w-4 text-primary" />}
      </div>
      <div className={`max-w-[80%] rounded-lg p-4 ${isUser ? "bg-muted" : "bg-card border"}`}>
        <p className="text-sm leading-relaxed">{message.content}</p>
      </div>
    </div>
  )
}
