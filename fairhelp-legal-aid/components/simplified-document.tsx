import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, AlertTriangle, Scale } from "lucide-react"

interface SimplifiedDocumentProps {
  text: string
  keyPoints: string[]
}

export function SimplifiedDocument({ text, keyPoints }: SimplifiedDocumentProps) {
  const sections = text.split("\n\n").filter((line) => line.trim())

  return (
    <div className="space-y-6">
      <Card className="p-6 border-l-4 border-l-primary">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Document Summary</h2>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Time Sensitive
          </Badge>
        </div>

        <div className="space-y-4">
          {sections.map((section, index) => {
            // Check if section is a heading (starts with **)
            const isHeading = section.startsWith("**")

            if (isHeading) {
              const [heading, ...content] = section.split(":**")
              const cleanHeading = heading.replace(/\*\*/g, "").trim()
              const cleanContent = content.join(":**").trim()

              return (
                <div key={index} className="space-y-2">
                  <h3 className="font-semibold text-base flex items-center gap-2">
                    {cleanHeading === "What This Means" && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                    {cleanHeading === "Your Timeline" && <Clock className="h-4 w-4 text-blue-500" />}
                    {cleanHeading === "What You Can Do" && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                    {cleanHeading}
                  </h3>
                  <p className="leading-relaxed text-foreground/90 pl-6">{cleanContent}</p>
                </div>
              )
            }

            return (
              <p key={index} className="leading-relaxed text-foreground/90">
                {section}
              </p>
            )
          })}
        </div>
      </Card>

      {keyPoints.length > 0 && (
        <Card className="p-6 bg-muted/50">
          <h2 className="mb-4 text-xl font-semibold flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            Action Items
          </h2>
          <div className="space-y-3">
            {keyPoints.map((point, index) => (
              <div key={index} className="flex gap-3 p-3 rounded-lg bg-background border">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {index + 1}
                </div>
                <span className="leading-relaxed pt-0.5">{point}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card className="p-6 border-l-4 border-l-amber-500">
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          Important Next Steps
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Time is critical in legal matters. We recommend taking action within the next 24-48 hours. Use the "Ask
          Questions" feature to get specific guidance, or visit our Resources page to find free legal aid in your area.
        </p>
      </Card>
    </div>
  )
}
