"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Upload, FileText, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function DocumentUpload() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && isValidFileType(droppedFile)) {
      setFile(droppedFile)
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && isValidFileType(selectedFile)) {
      setFile(selectedFile)
    }
  }

  const isValidFileType = (file: File) => {
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/png",
      "image/jpeg",
    ]
    return validTypes.includes(file.type)
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)

    // Create FormData and store file
    const formData = new FormData()
    formData.append("file", file)

    try {
      // Simulate upload and processing
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Store file in sessionStorage for the analysis page
      const reader = new FileReader()
      reader.onload = () => {
        sessionStorage.setItem(
          "uploadedDocument",
          JSON.stringify({
            name: file.name,
            type: file.type,
            size: file.size,
            data: reader.result,
          }),
        )
        router.push("/analyze")
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error("Upload failed:", error)
      setIsUploading(false)
    }
  }

  const removeFile = () => {
    setFile(null)
  }

  return (
    <Card className="p-8">
      {!file ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative flex min-h-[300px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
            isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
          }`}
        >
          <input
            type="file"
            onChange={handleFileSelect}
            accept=".pdf,.docx,.png,.jpg,.jpeg"
            className="absolute inset-0 cursor-pointer opacity-0"
          />
          <Upload className="mb-4 h-12 w-12 text-muted-foreground" />
          <p className="mb-2 text-lg font-semibold">Drop your document here</p>
          <p className="mb-4 text-sm text-muted-foreground">or click to browse</p>
          <p className="text-xs text-muted-foreground">Supports PDF, DOCX, PNG, and JPG (Max 10MB)</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center gap-4 rounded-lg border p-4">
            <FileText className="h-10 w-10 text-primary" />
            <div className="flex-1">
              <p className="font-semibold">{file.name}</p>
              <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <Button variant="ghost" size="icon" onClick={removeFile} disabled={isUploading}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={handleUpload} disabled={isUploading} className="w-full" size="lg">
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing Document...
              </>
            ) : (
              "Analyze Document"
            )}
          </Button>
        </div>
      )}
    </Card>
  )
}
