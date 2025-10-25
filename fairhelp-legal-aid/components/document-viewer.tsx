"use client"

import { Card } from "@/components/ui/card"
import { FileText } from "lucide-react"

interface DocumentViewerProps {
  fileName: string
  fileType: string
  fileData: string
}

export function DocumentViewer({ fileName, fileType, fileData }: DocumentViewerProps) {
  // Handle PDF files
  if (fileType === "application/pdf") {
    return (
      <Card className="overflow-hidden">
        <iframe src={fileData} className="h-[800px] w-full border-0" title={fileName} />
      </Card>
    )
  }

  // Handle image files
  if (fileType.startsWith("image/")) {
    return (
      <Card className="overflow-hidden p-4">
        <img src={fileData || "/placeholder.svg"} alt={fileName} className="mx-auto max-w-full rounded" />
      </Card>
    )
  }

  // Handle DOCX and other unsupported formats
  return (
    <Card className="p-8">
      <div className="flex flex-col items-center justify-center text-center">
        <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
        <h3 className="mb-2 text-lg font-semibold">Document Preview Not Available</h3>
        <p className="text-sm text-muted-foreground">
          {fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ? "Word documents cannot be previewed directly in the browser. The simplified version shows the extracted content."
            : "This file type cannot be previewed directly in the browser."}
        </p>
        <p className="mt-4 text-xs text-muted-foreground">File: {fileName}</p>
      </div>
    </Card>
  )
}
