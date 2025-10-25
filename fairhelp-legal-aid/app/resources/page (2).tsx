"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Search,
  Phone,
  MapPin,
  Globe,
  ExternalLink,
  Scale,
  FileText,
  Clock,
  Users,
  Languages,
  CheckCircle2,
  AlertCircle,
  Building2,
  Heart,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const legalAidOrganizations = [
  {
    name: "Legal Aid Society",
    description: "Provides free legal services to low-income individuals and families in civil matters.",
    phone: "1-800-555-0100",
    website: "https://legalaid.org",
    areas: ["Housing", "Family Law", "Benefits"],
    hours: "Mon-Fri: 9am-5pm",
    languages: ["English", "Spanish", "Mandarin"],
    eligibility: "Income below 125% of federal poverty line",
    responseTime: "24-48 hours",
    yearsActive: "75+ years",
    peopleHelped: "50,000+ annually",
    status: "open",
    color: "blue",
    locations: ["New York", "Los Angeles", "Chicago"],
  },
  {
    name: "National Housing Law Project",
    description: "Advocates for housing justice and provides resources for tenants facing eviction.",
    phone: "1-800-555-0101",
    website: "https://nhlp.org",
    areas: ["Housing", "Eviction Defense"],
    hours: "Mon-Thu: 9am-7pm, Fri: 9am-5pm",
    languages: ["English", "Spanish"],
    eligibility: "All tenants facing housing issues",
    responseTime: "Same day for emergencies",
    yearsActive: "50+ years",
    peopleHelped: "30,000+ annually",
    status: "open",
    color: "green",
    locations: ["Nationwide"],
  },
  {
    name: "Pro Bono Net",
    description: "Connects people with free legal help and self-help resources online.",
    phone: "1-800-555-0102",
    website: "https://probono.net",
    areas: ["General Legal Aid", "Self-Help Resources"],
    hours: "24/7 Online Access",
    languages: ["English", "Spanish", "French", "Vietnamese"],
    eligibility: "Open to all",
    responseTime: "1-3 business days",
    yearsActive: "25+ years",
    peopleHelped: "100,000+ annually",
    status: "open",
    color: "purple",
    locations: ["Online - All States"],
  },
  {
    name: "American Bar Association Free Legal Answers",
    description:
      "Online platform where qualifying users can ask legal questions and receive answers from volunteer lawyers.",
    website: "https://abafreelegalanswers.org",
    areas: ["General Legal Questions"],
    hours: "24/7 Online Platform",
    languages: ["English", "Spanish"],
    eligibility: "Income below 200% of federal poverty line",
    responseTime: "2-5 business days",
    yearsActive: "10+ years",
    peopleHelped: "200,000+ questions answered",
    status: "open",
    color: "orange",
    locations: ["42 States Available"],
  },
  {
    name: "Volunteer Lawyers Project",
    description: "Matches low-income individuals with volunteer attorneys for free legal representation.",
    phone: "1-800-555-0103",
    website: "https://vlp.org",
    areas: ["Family Law", "Immigration", "Consumer Rights"],
    hours: "Mon-Thu: 9am-7pm, Fri: 9am-5pm",
    languages: ["English", "Spanish", "Creole"],
    eligibility: "Income-based qualification required",
    responseTime: "1 week for case review",
    yearsActive: "40+ years",
    peopleHelped: "15,000+ annually",
    status: "open",
    color: "teal",
    locations: ["Boston", "Miami", "Seattle"],
  },
  {
    name: "Immigrant Legal Resource Center",
    description: "Provides legal assistance and resources for immigrants and their families.",
    phone: "1-800-555-0104",
    website: "https://ilrc.org",
    areas: ["Immigration", "Citizenship", "Deportation Defense"],
    hours: "Mon-Fri: 9am-5pm",
    languages: ["English", "Spanish", "Arabic", "Tagalog"],
    eligibility: "All immigrants regardless of status",
    responseTime: "48 hours",
    yearsActive: "35+ years",
    peopleHelped: "25,000+ annually",
    status: "open",
    color: "indigo",
    locations: ["San Francisco", "Washington DC"],
  },
]

const colorClasses = {
  blue: "border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20",
  green: "border-l-green-500 bg-green-50/50 dark:bg-green-950/20",
  purple: "border-l-purple-500 bg-purple-50/50 dark:bg-purple-950/20",
  orange: "border-l-orange-500 bg-orange-50/50 dark:bg-orange-950/20",
  teal: "border-l-teal-500 bg-teal-50/50 dark:bg-teal-950/20",
  indigo: "border-l-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20",
}

const badgeColors = {
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  green: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  purple: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  orange: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  teal: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
  indigo: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
}

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
  const [selectedArea, setSelectedArea] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const allAreas = Array.from(new Set(legalAidOrganizations.flatMap((org) => org.areas)))

  const filteredOrganizations = legalAidOrganizations.filter((org) => {
    const matchesArea = selectedArea === "all" || org.areas.includes(selectedArea)
    const matchesSearch =
      searchQuery === "" ||
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.areas.some((area) => area.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesArea && matchesSearch
  })

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

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Legal Resources Directory</h1>
          <p className="text-base text-muted-foreground">
            Find free legal aid, emergency assistance, and self-help resources
          </p>
        </div>

        <div className="mb-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by organization, location, or legal issue..."
              className="pl-10 bg-background border-border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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

            <div className="flex flex-wrap gap-2 mb-6">
              <Button
                variant={selectedArea === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedArea("all")}
              >
                All Areas
              </Button>
              {allAreas.map((area) => (
                <Button
                  key={area}
                  variant={selectedArea === area ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedArea(area)}
                >
                  {area}
                </Button>
              ))}
            </div>

            <div className="grid gap-6">
              {filteredOrganizations.map((org, index) => (
                <div
                  key={index}
                  className={`border-l-4 border rounded-lg p-6 transition-shadow hover:shadow-lg ${colorClasses[org.color as keyof typeof colorClasses]}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">{org.name}</h3>
                        {org.status === "open" && (
                          <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Available
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{org.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-xs text-muted-foreground">Hours</div>
                        <div className="font-medium">{org.hours}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-xs text-muted-foreground">Response</div>
                        <div className="font-medium">{org.responseTime}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-xs text-muted-foreground">Experience</div>
                        <div className="font-medium">{org.yearsActive}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Heart className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-xs text-muted-foreground">Helped</div>
                        <div className="font-medium">{org.peopleHelped}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-xs text-muted-foreground mb-2">Practice Areas</div>
                    <div className="flex flex-wrap gap-2">
                      {org.areas.map((area, i) => (
                        <span
                          key={i}
                          className={`text-xs px-3 py-1 rounded-full font-medium ${badgeColors[org.color as keyof typeof badgeColors]}`}
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Languages className="h-4 w-4" />
                        <span className="text-xs font-medium">Languages Spoken</span>
                      </div>
                      <div className="text-foreground">{org.languages.join(", ")}</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <MapPin className="h-4 w-4" />
                        <span className="text-xs font-medium">Service Areas</span>
                      </div>
                      <div className="text-foreground">{org.locations.join(", ")}</div>
                    </div>
                  </div>

                  <div className="mb-4 p-3 bg-muted/50 rounded-md">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div className="text-sm">
                        <span className="font-medium">Eligibility: </span>
                        <span className="text-muted-foreground">{org.eligibility}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {org.phone && (
                      <Button asChild size="sm" className="bg-foreground text-background hover:bg-foreground/90">
                        <a href={`tel:${org.phone}`}>
                          <Phone className="h-4 w-4 mr-2" />
                          Call Now
                        </a>
                      </Button>
                    )}
                    {org.website && (
                      <Button asChild variant="outline" size="sm">
                        <a href={org.website} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4 mr-2" />
                          Visit Website
                          <ExternalLink className="h-3 w-3 ml-2" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {filteredOrganizations.length === 0 && (
              <div className="text-center py-12">
                <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No organizations found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
              </div>
            )}
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
