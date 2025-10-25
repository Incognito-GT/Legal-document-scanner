import { Card } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

interface SimplifiedDocumentProps {
  text: string
  keyPoints: string[]
}

export function SimplifiedDocument({ text, keyPoints }: SimplifiedDocumentProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="mb-4 text-xl font-semibold">Plain English Summary</h2>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p className="leading-relaxed text-foreground">{text}</p>
        </div>
      </Card>

      {keyPoints.length > 0 && (
        <Card className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Key Points to Remember</h2>
          <ul className="space-y-3">
            {keyPoints.map((point, index) => (
              <li key={index} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  )
}
