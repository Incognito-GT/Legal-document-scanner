"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, ArrowLeft, Loader2, AlertCircle, Download, Printer, MessageSquare, Scale } from "lucide-react"
import { SimplifiedDocument } from "@/components/simplified-document"
import { DocumentViewer } from "@/components/document-viewer"
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

      // Call API to simplify the document
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

  const handleDownload = () => {
    if (!simplifiedText) return

    const content = `FairHelp Document Analysis\n\n${document?.name}\n\n${simplifiedText}\n\nKey Points:\n${keyPoints.map((point, i) => `${i + 1}. ${point}`).join("\n")}\n\nDisclaimer: This is a simplified version for educational purposes only. Always consult with a qualified attorney for legal advice.`

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${document?.name.replace(/\.[^/.]+$/, "")}_simplified.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!document) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => router.push("/")} size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleDownload} disabled={isAnalyzing}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button variant="outline" size="sm" onClick={() => window.print()} disabled={isAnalyzing}>
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 pb-6 border-b">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-1">{document.name}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{(document.size / 1024 / 1024).toFixed(2)} MB</span>
                <span>•</span>
                <span>{document.type.split("/")[1].toUpperCase()}</span>
                <span>•</span>
                <span>Analyzed {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
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
              <p className="text-muted-foreground max-w-md">
                We're carefully reading your legal document and translating complex legal language into plain English.
                This usually takes 10-15 seconds.
              </p>
            </div>
          </Card>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Tabs defaultValue="simplified" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="simplified">Simplified Version</TabsTrigger>
                  <TabsTrigger value="original">Original Document</TabsTrigger>
                </TabsList>
                <TabsContent value="simplified">
                  <SimplifiedDocument text={simplifiedText} keyPoints={keyPoints} />
                </TabsContent>
                <TabsContent value="original">
                  <DocumentViewer fileName={document.name} fileType={document.type} fileData={document.data} />
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-4">
              <Card className="p-6 border-l-4 border-l-primary">
                <h3 className="mb-4 font-semibold text-lg">What's Next?</h3>
                <div className="space-y-3">
                  <Button className="w-full justify-start" onClick={() => router.push("/chat")}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Ask Questions About This Document
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <a href="/resources">
                      <Scale className="mr-2 h-4 w-4" />
                      Find Legal Help Near You
                    </a>
                  </Button>
                </div>
              </Card>

              <Card className="p-6 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="mb-2 font-semibold text-amber-900 dark:text-amber-100">Legal Disclaimer</h3>
                    <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                      This simplified version is for educational purposes only and does not constitute legal advice.
                      Always consult with a qualified attorney for guidance specific to your situation.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="mb-3 font-semibold">Helpful Tips</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Save or print this simplified version for your records</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Keep the original document in a safe place</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Note any important deadlines mentioned</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Contact legal aid as soon as possible</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
