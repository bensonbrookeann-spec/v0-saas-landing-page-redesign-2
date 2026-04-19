"use client"

import { useState, use } from "react"
import Link from "next/link"
import { ChevronDown, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock member data
const mockMemberData: Record<string, {
  name: string
  score: number
  tenure: string
  branch: string
  avgMonthlyDeposits: string
  monthlyAverage: string
  businessName: string
  transactions: Array<{
    date: string
    merchant: string
    amount: string
    classification: string
    type: "deposit" | "subscription" | "payment" | "payout"
  }>
  suggestedTalkingPoint: string
}> = {
  "1": {
    name: "Sarah Chen",
    score: 94,
    tenure: "3 years",
    branch: "Downtown",
    avgMonthlyDeposits: "2,180",
    monthlyAverage: "Growing",
    businessName: "Chen Ceramics LLC",
    transactions: [
      { date: "Apr 12", merchant: "Etsy Inc.", amount: "$847.50", classification: "Marketplace Payout", type: "payout" },
      { date: "Apr 10", merchant: "Stripe", amount: "$1,245.00", classification: "Payment Processor Deposit", type: "deposit" },
      { date: "Apr 08", merchant: "QuickBooks", amount: "$30.00", classification: "Business Software Subscription", type: "subscription" },
      { date: "Apr 05", merchant: "Faire Wholesale", amount: "$2,340.00", classification: "Wholesale Payment", type: "deposit" },
      { date: "Apr 02", merchant: "Etsy Inc.", amount: "$623.75", classification: "Marketplace Payout", type: "payout" },
      { date: "Mar 28", merchant: "Blick Art Materials", amount: "$189.43", classification: "Likely Supplier Payment", type: "payment" },
      { date: "Mar 25", merchant: "Stripe", amount: "$890.00", classification: "Payment Processor Deposit", type: "deposit" },
    ],
    suggestedTalkingPoint: "Sarah has Chen Ceramics LLC registered for 8 months with 847 Etsy sales. She's depositing business income into her personal checking account. Ask if she's considered a business checking account to separate finances and simplify tax prep. Mention our business credit card with 2% cash back on supplies.",
  },
  "2": {
    name: "Marcus Chen",
    score: 85,
    tenure: "1 year",
    branch: "Westside",
    avgMonthlyDeposits: "4,850",
    monthlyAverage: "Above Avg",
    businessName: "Unknown",
    transactions: [
      { date: "Mar 15", merchant: "Stripe", amount: "$2,450.00", classification: "Payment Processor Deposit", type: "deposit" },
      { date: "Mar 14", merchant: "QuickBooks", amount: "$79.99", classification: "Business Software Subscription", type: "subscription" },
      { date: "Mar 12", merchant: "Shopify Payout", amount: "$1,890.00", classification: "Marketplace Payout", type: "payout" },
      { date: "Mar 10", merchant: "Office Depot", amount: "$234.50", classification: "Likely Supplier Payment", type: "payment" },
      { date: "Mar 08", merchant: "Square Deposit", amount: "$567.00", classification: "Payment Processor Deposit", type: "deposit" },
    ],
    suggestedTalkingPoint: "Marcus shows strong e-commerce activity through Shopify and Square. Ask about their online store and if they need merchant services or a business line of credit.",
  },
}

// Default member data for IDs not in mock
const defaultMember = {
  name: "Member Name",
  score: 50,
  tenure: "2 years",
  branch: "Branch",
  avgMonthlyDeposits: "3,200",
  monthlyAverage: "Average",
  businessName: "Unknown",
  transactions: [
    { date: "Jan 15", merchant: "Stripe", amount: "$1,200.00", classification: "Payment Processor Deposit", type: "deposit" as const },
    { date: "Jan 14", merchant: "QuickBooks", amount: "$49.99", classification: "Business Software Subscription", type: "subscription" as const },
    { date: "Jan 12", merchant: "PayPal", amount: "$890.00", classification: "Marketplace Payout", type: "payout" as const },
  ],
  suggestedTalkingPoint: "This member shows promising business signals. Consider discussing business banking products.",
}

// Circular Score Component
function CircularScore({ score, size = 120 }: { score: number; size?: number }) {
  const strokeWidth = 10
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
        <span className="text-4xl font-bold text-cream-foreground">{score}</span>
      </div>
    </div>
  )
}

// Classification Badge Component
function ClassificationBadge({ classification, type }: { classification: string; type: string }) {
  const getStyles = () => {
    switch (type) {
      case "deposit":
        return "bg-primary text-white"
      case "subscription":
        return "bg-primary text-white"
      case "payment":
        return "border border-[#3a3530] text-white/80 bg-transparent"
      case "payout":
        return "border border-[#3a3530] text-white/80 bg-transparent"
      default:
        return "border border-[#3a3530] text-white/80 bg-transparent"
    }
  }

  return (
    <span className={`px-2 py-1 rounded text-xs ${getStyles()}`}>
      {classification}
    </span>
  )
}

export default function MemberDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [dateRange, setDateRange] = useState("90")
  
  const member = mockMemberData[id] || defaultMember

  return (
    <div className="p-6">
      {/* Back Button */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      <div className="flex gap-6">
        {/* Member Card - Cream themed */}
        <div className="w-64 shrink-0">
          <div className="bg-cream rounded-xl p-6">
            {/* Member Name */}
            <h2 className="text-2xl font-semibold text-cream-foreground leading-tight mb-4">
              {member.name.split(" ").map((word, i) => (
                <span key={i}>
                  {word}
                  {i === 0 && <br />}
                </span>
              ))}
            </h2>

            {/* Score */}
            <div className="flex flex-col items-center mb-6">
              <span className="text-sm text-cream-foreground/70 mb-2">Score</span>
              <CircularScore score={member.score} size={140} />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-cream-foreground/20">
              <div>
                <div className="text-sm font-semibold text-cream-foreground">Tenure</div>
                <div className="text-sm text-cream-foreground/70">{member.tenure}</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-cream-foreground">Branch</div>
                <div className="text-sm text-cream-foreground/70">{member.branch}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <div className="text-xl font-bold text-cream-foreground">${member.avgMonthlyDeposits}</div>
                <div className="text-xs text-cream-foreground/70">Avg. monthly<br />deposits</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-cream-foreground">{member.monthlyAverage}</div>
                <div className="text-xs text-cream-foreground/70">Monthly<br />deposits</div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Feed */}
        <div className="flex-1 bg-[#1a1814] rounded-xl p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Transaction Feed</h3>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-36 bg-[#2a2520] border-[#3a3530] text-white/80">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#2a2520] border-[#3a3530]">
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="60">Last 60 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="180">Last 180 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Transaction Table */}
          <table className="w-full text-sm mb-6">
            <thead>
              <tr className="border-b border-[#2a2520] text-white/60">
                <th className="text-left py-2 font-medium">Date</th>
                <th className="text-left py-2 font-medium">Merchant</th>
                <th className="text-left py-2 font-medium">Amount</th>
                <th className="text-left py-2 font-medium">Classification</th>
              </tr>
            </thead>
            <tbody>
              {member.transactions.map((tx, i) => (
                <tr key={i} className="border-b border-[#2a2520]/50">
                  <td className="py-3 text-white">{tx.date}</td>
                  <td className="py-3 text-white">{tx.merchant}</td>
                  <td className="py-3 text-white">{tx.amount}</td>
                  <td className="py-3">
                    <ClassificationBadge classification={tx.classification} type={tx.type} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Suggested Talking Point */}
          <div className="bg-primary rounded-xl p-4">
            <h4 className="font-semibold text-white mb-2">Suggested Talking Point</h4>
            <p className="text-sm text-white/90">
              {member.suggestedTalkingPoint}
            </p>
          </div>

          {/* Action Button */}
          <div className="mt-6">
            <Link href={`/dashboard/outreach/${id}`}>
              <Button className="bg-primary text-white hover:bg-primary/90">
                Generate Outreach Script
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
