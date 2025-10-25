import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Search, Phone, MapPin, Globe, ExternalLink, Scale, FileText } from "lucide-react"
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

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Legal Resources Directory</h1>
          <p className="text-base text-muted-foreground">
            Find free legal aid, emergency assistance, and self-help resources
          </p>
        </div>

        <div className="mb-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by location or legal issue..." className="pl-10 bg-background border-border" />
          </div>
        </div>

        <Tabs defaultValue="organizations" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50">
            <TabsTrigger value="organizations">Legal Aid Organizations</TabsTrigger>
            <TabsTrigger value="emergency">Emergency Help</TabsTrigger>
            <TabsTrigger value="self-help">Self-Help Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="organizations" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-1">Free Legal Aid Organizations</h2>
              <p className="text-sm text-muted-foreground">
                Organizations providing free legal services to those who qualify
              </p>
            </div>
            <div className="space-y-6">
              {legalAidOrganizations.map((org, index) => (
                <div key={index} className="border-b pb-6 last:border-b-0">
                  <h3 className="text-lg font-semibold mb-2">{org.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{org.description}</p>
                  <div className="space-y-2 text-sm mb-3">
                    {org.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Phone:</span>
                        <a href={`tel:${org.phone}`} className="text-foreground hover:underline">
                          {org.phone}
                        </a>
                      </div>
                    )}
                    {org.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Website:</span>
                        <a
                          href={org.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground hover:underline inline-flex items-center gap-1"
                        >
                          {org.website.replace("https://", "")}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-muted-foreground">Practice Areas:</span>
                    {org.areas.map((area, i) => (
                      <span key={i} className="text-xs bg-muted px-2 py-1 border">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="emergency" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-1">Emergency Legal Assistance</h2>
              <p className="text-sm text-muted-foreground">Immediate help for urgent legal situations</p>
            </div>
            <div className="space-y-6">
              {emergencyResources.map((resource, index) => (
                <div key={index} className="border-b pb-6 last:border-b-0">
                  <h3 className="text-lg font-semibold mb-2">{resource.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`tel:${resource.phone}`}
                        className="text-base font-semibold text-foreground hover:underline"
                      >
                        {resource.phone}
                      </a>
                    </div>
                    <span className="text-sm text-muted-foreground">Available: {resource.available}</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="self-help" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-1">Self-Help Resources</h2>
              <p className="text-sm text-muted-foreground">
                Educational materials and tools to help you understand your rights
              </p>
            </div>
            <div className="space-y-6">
              {selfHelpResources.map((resource, index) => (
                <div key={index} className="border-b pb-6 last:border-b-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-base">{resource.title}</h3>
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">{resource.type}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                  <Button variant="outline" size="sm" className="bg-background">
                    Access Resource
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 border-t pt-8">
          <h3 className="text-lg font-semibold mb-2">Need Additional Assistance?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            If you're unable to find appropriate resources or need personalized assistance, contact your local bar
            association or legal aid office. Many offer free consultations or can refer you to appropriate services.
          </p>
          <Button variant="outline" className="bg-background">
            Find Local Bar Association
          </Button>
        </div>
      </div>
    </div>
  )
}
