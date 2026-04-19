"use client"

import { useState, use } from "react"
import Link from "next/link"
import { ArrowLeft, Copy, Phone, Check, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

// Mock member data for outreach
const mockMemberData: Record<string, {
  name: string
  score: number
  businessType: string
  businessName: string
  generatedScript: {
    intro: string
    highlightName: string
    body: string
    highlightBusinessType: string
    offer: string
    highlightProduct: string
    closing: string
  }
}> = {
  "1": {
    name: "Sarah Chen",
    score: 94,
    businessType: "Handmade Ceramics",
    businessName: "Chen Ceramics LLC",
    generatedScript: {
      intro: "Hi ",
      highlightName: "Sarah",
      body: ", this is [Your Name] from [Credit Union]. I've been a fan of your work — I actually saw ",
      highlightBusinessType: "Chen Ceramics",
      offer: " on Etsy! I noticed you've been with us for 3 years and wanted to reach out because we have some ",
      highlightProduct: "business banking options",
      closing: " that could really help as your business grows. A dedicated business checking account would make tax time so much easier, and we're offering new business members a $200 bonus. Would you have 15 minutes this week to chat about it?",
    },
  },
  "2": {
    name: "Marcus Chen",
    score: 85,
    businessType: "E-commerce",
    businessName: "Unknown",
    generatedScript: {
      intro: "Hi ",
      highlightName: "Marcus",
      body: ", I noticed your account has been growing steadily. It looks like your ",
      highlightBusinessType: "online retail business",
      offer: " is doing well! Have you considered a ",
      highlightProduct: "business line of credit",
      closing: " to help manage inventory? We also offer merchant services with lower fees than most processors.",
    },
  },
}

// Default member data
const defaultMember = {
  name: "Member Name",
  score: 65,
  businessType: "Small Business",
  businessName: "Unknown",
  generatedScript: {
    intro: "Hi ",
    highlightName: "there",
    body: ", I noticed some interesting activity in your account that suggests you may be running a ",
    highlightBusinessType: "small business",
    offer: ". Have you considered our ",
    highlightProduct: "business banking products",
    closing: "? We offer competitive rates and dedicated support for business owners like you.",
  },
}

// Circular Score Component (smaller version for header)
function CircularScoreSmall({ score, size = 50 }: { score: number; size?: number }) {
  const strokeWidth = 4
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-muted/30"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="text-primary transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold text-cream-foreground">{score}</span>
      </div>
    </div>
  )
}

export default function OutreachScriptPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [copied, setCopied] = useState(false)
  const [contextRecap, setContextRecap] = useState(true)
  const [selectedVariation, setSelectedVariation] = useState<string | null>(null)

  const member = mockMemberData[id] || defaultMember
  const script = member.generatedScript

  const handleCopyScript = () => {
    const fullScript = `${script.intro}${script.highlightName}${script.body}${script.highlightBusinessType}${script.offer}${script.highlightProduct}${script.closing}`
    navigator.clipboard.writeText(fullScript)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleLogCall = () => {
    // In a real app, this would open a modal or navigate to a call logging form
    alert("Call logged successfully!")
  }

  return (
    <div className="p-6">
      {/* Back Button */}
      <Link
        href={`/dashboard/members/${id}`}
        className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Member Details
      </Link>

      {/* Outreach Script Card - Cream themed */}
      <div className="max-w-lg mx-auto">
        <div className="bg-cream rounded-2xl p-6 shadow-lg">
          {/* Header */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 border border-cream-foreground/10 mb-6">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-cream-foreground/20" />
            
            {/* Member Info */}
            <div className="flex-1">
              <div className="font-semibold text-cream-foreground">{member.name}</div>
              <div className="text-xs text-cream-foreground/60 flex items-center gap-2">
                Context Recap
                <Switch
                  checked={contextRecap}
                  onCheckedChange={setContextRecap}
                  className="scale-75"
                />
              </div>
            </div>

            {/* Score */}
            <CircularScoreSmall score={member.score} />

            {/* Business Type */}
            <div className="text-right">
              <div className="text-xs text-cream-foreground/60">Detected</div>
              <div className="text-xs font-medium text-cream-foreground">{member.businessType}</div>
            </div>

            {/* Icon */}
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-primary" />
            </div>
          </div>

          {/* Generated Script */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-cream-foreground mb-3">Generated script</h3>
            <div className="text-sm text-cream-foreground/80 leading-relaxed space-y-3">
              <p>
                {script.intro}
                <span className="text-primary font-medium">{script.highlightName}</span>
                {script.body}
                <span className="text-primary font-medium">{script.highlightBusinessType}</span>
                {script.offer}
                <span className="text-primary font-medium">{script.highlightProduct}</span>
                {script.closing}
              </p>
            </div>
          </div>

          {/* Variation Buttons */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-cream-foreground mb-3">Variation</h4>
            <div className="flex gap-2">
              {["More Formal", "More Casual", "Shorter"].map((variant) => (
                <Button
                  key={variant}
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedVariation(selectedVariation === variant ? null : variant)}
                  className={`rounded-full border-cream-foreground/30 text-cream-foreground hover:bg-white/50 ${
                    selectedVariation === variant ? "bg-white/50 border-primary" : ""
                  }`}
                >
                  {variant}
                </Button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleCopyScript}
              className="w-full bg-primary text-white hover:bg-primary/90 rounded-full py-6"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Script
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={handleLogCall}
              className="w-full rounded-full py-6 border-cream-foreground/30 text-cream-foreground hover:bg-white/50"
            >
              <Phone className="w-4 h-4 mr-2" />
              Log Call
            </Button>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-cream-foreground/50 mt-6 italic">
            Generated by MemberSignal AI — based on 90 days of transaction signals.
          </p>
        </div>
      </div>
    </div>
  )
}
