import type { Message } from "ai/react"
import { Card } from "@/components/ui/card"
import { Scale, User } from "lucide-react"

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
          <Scale className="h-4 w-4 text-primary" />
        </div>
      )}
      <Card className={`max-w-[80%] p-4 ${isUser ? "bg-primary text-primary-foreground" : "bg-card"}`}>
        <p className="text-sm leading-relaxed">{message.content}</p>
      </Card>
      {isUser && (
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-muted">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  )
}
