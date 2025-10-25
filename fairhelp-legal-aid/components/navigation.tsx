"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Scale, FileText, MessageSquare, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Home", icon: Scale },
    { href: "/analyze", label: "Analysis", icon: FileText },
    { href: "/chat", label: "Questions", icon: MessageSquare },
    { href: "/resources", label: "Resources", icon: BookOpen },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
          <Scale className="h-6 w-6" />
          <span>FairHelp</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href
            return (
              <Button key={link.href} variant={isActive ? "secondary" : "ghost"} size="sm" asChild>
                <Link href={link.href} className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              </Button>
            )
          })}
        </nav>

        <div className="flex md:hidden items-center gap-1">
          {links.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href
            return (
              <Button key={link.href} variant={isActive ? "secondary" : "ghost"} size="icon" asChild>
                <Link href={link.href}>
                  <Icon className="h-4 w-4" />
                  <span className="sr-only">{link.label}</span>
                </Link>
              </Button>
            )
          })}
        </div>
      </div>
    </header>
  )
}
