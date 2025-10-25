import { DocumentUpload } from "@/components/document-upload"
import { Button } from "@/components/ui/button"
import { Scale, FileText, MessageSquare, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted px-4 py-2 text-sm">
              <Scale className="h-4 w-4" />
              <span>Free Legal Document Help</span>
            </div>
            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight md:text-6xl">
              Understand Your Legal Documents in Plain English
            </h1>
            <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl">
              FairHelp simplifies complex legal documents like eviction notices, contracts, and court papers. Get clear
              explanations and helpful guidance in real-time.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <a href="#upload">Upload Document</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#how-it-works">How It Works</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="how-it-works" className="border-b py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">How FairHelp Works</h2>
            <p className="text-lg text-muted-foreground">Three simple steps to understand your legal documents</p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">1. Upload Document</h3>
              <p className="text-muted-foreground">
                Upload your legal document in PDF, DOCX, or image format. We support eviction notices, contracts, and
                court papers.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Scale className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">2. Document Analysis</h3>
              <p className="text-muted-foreground">
                We analyze your document and translate complex legal jargon into clear, easy-to-understand language.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">3. Get Guidance</h3>
              <p className="text-muted-foreground">
                Ask specific questions about your document and get instant, helpful answers to guide your next steps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section id="upload" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Upload Your Document</h2>
              <p className="text-lg text-muted-foreground">Drag and drop your legal document or click to browse</p>
            </div>
            <DocumentUpload />
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="border-t py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Users className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Need More Help?</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Access our directory of legal aid organizations and pro bono lawyers in your area
            </p>
            <Button size="lg" variant="outline" asChild>
              <a href="/resources">Browse Legal Resources</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-t bg-muted/50 py-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center text-sm text-muted-foreground">
            <p className="font-semibold mb-2">Important Legal Disclaimer</p>
            <p>
              FairHelp is an educational tool and does not provide legal advice. The information provided is for general
              informational purposes only. For specific legal advice, please consult with a qualified attorney.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
