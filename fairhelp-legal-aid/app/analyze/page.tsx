"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, ArrowLeft, Loader2, AlertCircle } from "lucide-react"
import { SimplifiedDocument } from "@/components/simplified-document"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface DocumentData {
  name: string
  type: string
  size: number
  data: string
}

export default function AnalyzePage() {
  const router = useRouter()
  const [document, setDocument] = useState<DocumentData | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const [simplifiedText, setSimplifiedText] = useState("")
  const [keyPoints, setKeyPoints] = useState<string[]>([])
  const [error, setError] = useState("")

  useEffect(() => {
    // Retrieve document from sessionStorage
    const storedDoc = sessionStorage.getItem("uploadedDocument")
    if (!storedDoc) {
      router.push("/")
      return
    }

    const docData = JSON.parse(storedDoc) as DocumentData
    setDocument(docData)

    // Simulate AI analysis
    analyzeDocument(docData)
  }, [router])

  const analyzeDocument = async (doc: DocumentData) => {
    try {
      setIsAnalyzing(true)

      // Call AI API to simplify the document
      const response = await fetch("/api/simplify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: doc.name,
          fileType: doc.type,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze document")
      }

      const data = await response.json()
      setSimplifiedText(data.simplifiedText)
      setKeyPoints(data.keyPoints)
    } catch (err) {
      setError("Failed to analyze document. Please try again.")
      console.error(err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  if (!document) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => router.push("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">{document.name}</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            {(document.size / 1024 / 1024).toFixed(2)} MB • {document.type}
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isAnalyzing ? (
          <Card className="p-12">
            <div className="flex flex-col items-center justify-center text-center">
              <Loader2 className="mb-4 h-12 w-12 animate-spin text-primary" />
              <h2 className="mb-2 text-xl font-semibold">Analyzing Your Document</h2>
              <p className="text-muted-foreground">Our AI is reading and simplifying your legal document...</p>
            </div>
          </Card>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Tabs defaultValue="simplified" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="simplified">Simplified Version</TabsTrigger>
                  <TabsTrigger value="original">Original Document</TabsTrigger>
                </TabsList>
                <TabsContent value="simplified" className="mt-4">
                  <SimplifiedDocument text={simplifiedText} keyPoints={keyPoints} />
                </TabsContent>
                <TabsContent value="original" className="mt-4">
                  <Card className="p-6">
                    <p className="text-sm text-muted-foreground">
                      Original document preview would appear here. In a production app, this would render the actual PDF
                      or document content.
                    </p>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="mb-4 font-semibold">Quick Actions</h3>
                <div className="space-y-2">
                  <Button className="w-full" onClick={() => router.push("/chat")}>
                    Ask Questions About This Document
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <a href="/resources">Find Legal Help</a>
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" onClick={() => window.print()}>
                    Print Simplified Version
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="mb-2 font-semibold">Important Reminder</h3>
                <p className="text-sm text-muted-foreground">
                  This is an AI-generated simplification for educational purposes only. Always consult with a qualified
                  attorney for legal advice specific to your situation.
                </p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
