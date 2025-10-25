import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Search, Phone, MapPin, Globe, ExternalLink, Scale, Users, FileText } from "lucide-react"
import Link from "next/link"

const legalAidOrganizations = [
  {
    name: "Legal Aid Society",
    description: "Provides free legal services to low-income individuals and families in civil matters.",
    phone: "1-800-555-0100",
    website: "https://legalaid.org",
    areas: ["Housing", "Family Law", "Benefits"],
  },
  {
    name: "National Housing Law Project",
    description: "Advocates for housing justice and provides resources for tenants facing eviction.",
    phone: "1-800-555-0101",
    website: "https://nhlp.org",
    areas: ["Housing", "Eviction Defense"],
  },
  {
    name: "Pro Bono Net",
    description: "Connects people with free legal help and self-help resources online.",
    phone: "1-800-555-0102",
    website: "https://probono.net",
    areas: ["General Legal Aid", "Self-Help Resources"],
  },
  {
    name: "American Bar Association Free Legal Answers",
    description:
      "Online platform where qualifying users can ask legal questions and receive answers from volunteer lawyers.",
    website: "https://abafreelegalanswers.org",
    areas: ["General Legal Questions"],
  },
]

const emergencyResources = [
  {
    name: "National Domestic Violence Hotline",
    description: "24/7 support for victims of domestic violence and abuse.",
    phone: "1-800-799-7233",
    available: "24/7",
  },
  {
    name: "Eviction Defense Hotline",
    description: "Immediate assistance for tenants facing eviction.",
    phone: "1-800-555-0200",
    available: "Mon-Fri 9am-5pm",
  },
  {
    name: "Legal Services Corporation",
    description: "Find local legal aid offices in your area.",
    phone: "1-800-555-0201",
    available: "Mon-Fri 9am-6pm",
  },
]

const selfHelpResources = [
  {
    title: "Understanding Your Eviction Notice",
    description: "Step-by-step guide to reading and responding to eviction notices.",
    type: "Guide",
    icon: FileText,
  },
  {
    title: "Tenant Rights by State",
    description: "Comprehensive database of tenant rights and protections in all 50 states.",
    type: "Database",
    icon: MapPin,
  },
  {
    title: "Court Forms and Templates",
    description: "Free downloadable legal forms for common civil matters.",
    type: "Forms",
    icon: FileText,
  },
  {
    title: "Know Your Rights",
    description: "Educational resources about your legal rights in various situations.",
    type: "Education",
    icon: Scale,
  },
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">Legal Resources</h1>
          <p className="text-lg text-muted-foreground">
            Find free legal aid, emergency assistance, and self-help resources
          </p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search resources by location or legal issue..." className="pl-10" />
          </div>
        </div>

        <Tabs defaultValue="organizations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="organizations">Legal Aid Organizations</TabsTrigger>
            <TabsTrigger value="emergency">Emergency Help</TabsTrigger>
            <TabsTrigger value="self-help">Self-Help Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="organizations" className="space-y-4">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold">Free Legal Aid Organizations</h2>
              <p className="text-muted-foreground">Organizations providing free legal services to those who qualify</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {legalAidOrganizations.map((org, index) => (
                <Card key={index} className="p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Scale className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold">{org.name}</h3>
                    </div>
                  </div>
                  <p className="mb-4 text-sm text-muted-foreground">{org.description}</p>
                  <div className="space-y-2 text-sm">
                    {org.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <a href={`tel:${org.phone}`} className="hover:underline">
                          {org.phone}
                        </a>
                      </div>
                    )}
                    {org.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={org.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 hover:underline"
                        >
                          Visit Website
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {org.areas.map((area, i) => (
                      <span key={i} className="rounded-full bg-muted px-3 py-1 text-xs">
                        {area}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="emergency" className="space-y-4">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold">Emergency Legal Assistance</h2>
              <p className="text-muted-foreground">Immediate help for urgent legal situations</p>
            </div>
            <div className="space-y-4">
              {emergencyResources.map((resource, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-destructive/10">
                      <Phone className="h-6 w-6 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1 text-lg font-semibold">{resource.name}</h3>
                      <p className="mb-3 text-sm text-muted-foreground">{resource.description}</p>
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                        <a
                          href={`tel:${resource.phone}`}
                          className="text-lg font-semibold text-primary hover:underline"
                        >
                          {resource.phone}
                        </a>
                        <span className="text-sm text-muted-foreground">{resource.available}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="self-help" className="space-y-4">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold">Self-Help Resources</h2>
              <p className="text-muted-foreground">
                Educational materials and tools to help you understand your rights
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {selfHelpResources.map((resource, index) => {
                const Icon = resource.icon
                return (
                  <Card key={index} className="p-6 transition-shadow hover:shadow-md">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{resource.title}</h3>
                          <span className="text-xs text-muted-foreground">{resource.type}</span>
                        </div>
                      </div>
                    </div>
                    <p className="mb-4 text-sm text-muted-foreground">{resource.description}</p>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Access Resource
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Button>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>

        <Card className="mt-8 border-primary/20 bg-primary/5 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">Can't Find What You Need?</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                If you're unable to find appropriate resources or need personalized assistance, consider reaching out to
                your local bar association or legal aid office. Many offer free consultations or can refer you to
                appropriate services.
              </p>
              <Button variant="outline" className="bg-background">
                Find Local Bar Association
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
