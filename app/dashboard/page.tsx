"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Mock data for the lead list
const mockMembers = [
  {
    id: "1",
    rank: 1,
    name: "Sarah Mitchell",
    score: 92,
    drivers: [{ name: "PayPal", color: "bg-[#003087]" }],
    tenure: "2 years",
    branch: "Downtown",
    summary: "High-volume PayPal deposits averaging $12K/month suggest established e-commerce business. Recent activity spike indicates seasonal inventory preparation.",
  },
  {
    id: "2",
    rank: 2,
    name: "Marcus Chen",
    score: 85,
    drivers: [{ name: "Shopify", color: "bg-[#96bf48]" }, { name: "Square", color: "bg-black" }],
    tenure: "1 year",
    branch: "Westside",
    summary: "Dual payment processor usage with Shopify and Square indicates omnichannel retail operation. Monthly deposits growing 15% quarter-over-quarter.",
  },
  {
    id: "3",
    rank: 3,
    name: "Jennifer Rodriguez",
    score: 78,
    drivers: [{ name: "Shopify", color: "bg-[#96bf48]" }],
    tenure: "1 year",
    branch: "Northgate",
    summary: "Consistent Shopify payouts of $8K weekly point to successful online storefront. Transaction patterns suggest subscription-based product offering.",
  },
  {
    id: "4",
    rank: 4,
    name: "David Thompson",
    score: 72,
    drivers: [{ name: "PayPal", color: "bg-[#003087]" }],
    tenure: "4 years",
    branch: "Eastlake",
    summary: "Long-tenured member with steady PayPal income stream. Recent increase in transaction frequency suggests business expansion or new revenue channel.",
  },
  {
    id: "5",
    rank: 5,
    name: "Amanda Foster",
    score: 68,
    drivers: [{ name: "Shopify", color: "bg-[#96bf48]" }, { name: "Square", color: "bg-black" }],
    tenure: "2 years",
    branch: "Downtown",
    summary: "Mixed online and in-person sales via Shopify and Square. Seasonal patterns indicate retail business with strong Q4 performance historically.",
  },
  {
    id: "6",
    rank: 6,
    name: "Robert Kim",
    score: 65,
    drivers: [{ name: "PayPal", color: "bg-[#003087]" }],
    tenure: "2 years",
    branch: "Westside",
    summary: "Regular PayPal deposits consistent with freelance or consulting income. Invoice-style payment patterns suggest B2B service provider.",
  },
  {
    id: "7",
    rank: 7,
    name: "Lisa Patel",
    score: 58,
    drivers: [{ name: "Square", color: "bg-black" }],
    tenure: "1 year",
    branch: "Northgate",
    summary: "Square-only transactions indicate brick-and-mortar focus. Weekend transaction spikes suggest food service or retail establishment.",
  },
]

// Signal Driver Badge Component
function DriverBadge({ name, color }: { name: string; color: string }) {
  const getIcon = () => {
    switch (name) {
      case "PayPal":
        return (
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.766.766 0 0 1 .757-.64h6.636c2.208 0 3.906.666 4.89 1.92.947 1.205 1.143 2.684.62 4.407l-.04.143-.034.12.03.19c.47 2.951-1.202 5.643-4.462 6.16-.47.075-.97.112-1.49.112H9.57a.766.766 0 0 0-.756.64l-.99 5.655a.641.641 0 0 1-.633.55h-.115z" />
          </svg>
        )
      case "Shopify":
        return (
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.337 3.415c-.042-.003-.083-.003-.122.003-.039.006-.075.021-.108.043l-.633.426a3.556 3.556 0 0 0-.372-.857 1.81 1.81 0 0 0-.81-.708c-.354-.162-.77-.197-1.168-.127-.133.024-.262.061-.387.11a2.606 2.606 0 0 0-.427.21l-.065-.186a.165.165 0 0 0-.054-.073.17.17 0 0 0-.086-.035l-1.08-.105a.17.17 0 0 0-.115.033.165.165 0 0 0-.06.1l-2.87 13.34a.165.165 0 0 0 .04.144.17.17 0 0 0 .138.054l1.18-.114a.17.17 0 0 0 .15-.137l.77-3.592c.032-.005.064-.008.096-.008.226 0 .44.085.6.238.16.152.264.36.296.585.034.225-.007.454-.113.647-.106.193-.277.344-.48.426l.32 1.13c.527-.177.973-.544 1.26-1.02.287-.476.402-1.04.324-1.586a2.06 2.06 0 0 0-.604-1.186 2.12 2.12 0 0 0-1.218-.564l1.38-6.42c.097-.017.195-.027.293-.03a.94.94 0 0 1 .565.145.89.89 0 0 1 .352.458c.077.213.11.44.095.665a3.09 3.09 0 0 1-.22.88l-.01.03 1.08.34c.087-.253.158-.513.213-.776a4.16 4.16 0 0 0 .098-1.03 2.5 2.5 0 0 0-.22-1.025 1.907 1.907 0 0 0-.65-.773z" />
          </svg>
        )
      case "Square":
        return (
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 3h18v18H3V3zm15.5 2.5h-13v13h13v-13z" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs text-white ${color}`}>
      {getIcon()}
      {name}
    </span>
  )
}

// Score Bar Component
function ScoreBar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-semibold text-[#2a2520] w-8">{score}</span>
      <div className="w-20 h-2 bg-[#e8e4de] rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}

export default function LeadListDashboard() {
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 9

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  return (
    <div className="p-6">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-[#2a2520] mb-6">Lead List Dashboard</h1>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-sm text-[#2a2520]/60">Filters</span>
        
        <Select defaultValue="all">
          <SelectTrigger className="w-32 bg-white border-[#e8e4de] text-[#2a2520] rounded-full">
            <SelectValue placeholder="Branch" />
          </SelectTrigger>
          <SelectContent className="bg-white border-[#e8e4de]">
            <SelectItem value="all">Branch</SelectItem>
            <SelectItem value="downtown">Downtown</SelectItem>
            <SelectItem value="westside">Westside</SelectItem>
            <SelectItem value="northgate">Northgate</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="w-32 bg-white border-[#e8e4de] text-[#2a2520] rounded-full">
            <SelectValue placeholder="Balance" />
          </SelectTrigger>
          <SelectContent className="bg-white border-[#e8e4de]">
            <SelectItem value="all">Balance</SelectItem>
            <SelectItem value="high">$50k+</SelectItem>
            <SelectItem value="medium">$10k-$50k</SelectItem>
            <SelectItem value="low">Under $10k</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="w-32 bg-white border-[#e8e4de] text-[#2a2520] rounded-full">
            <SelectValue placeholder="Tenure" />
          </SelectTrigger>
          <SelectContent className="bg-white border-[#e8e4de]">
            <SelectItem value="all">Tenure</SelectItem>
            <SelectItem value="5plus">5+ years</SelectItem>
            <SelectItem value="2to5">2-5 years</SelectItem>
            <SelectItem value="under2">Under 2 years</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="w-36 bg-white border-[#e8e4de] text-[#2a2520] rounded-full">
            <SelectValue placeholder="Score Range" />
          </SelectTrigger>
          <SelectContent className="bg-white border-[#e8e4de]">
            <SelectItem value="all">Score Range</SelectItem>
            <SelectItem value="high">80-100</SelectItem>
            <SelectItem value="medium">50-79</SelectItem>
            <SelectItem value="low">0-49</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-[#e8e4de] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#e8e4de] text-[#2a2520]/60 bg-[#faf8f5]">
              <th className="text-left py-3 px-4 font-medium">Rank</th>
              <th className="text-left py-3 px-4 font-medium">
                <button
                  onClick={() => handleSort("name")}
                  className="flex items-center gap-1 hover:text-[#2a2520] transition-colors"
                >
                  Member Name
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="text-left py-3 px-4 font-medium">Business Signal Score</th>
              <th className="text-left py-3 px-4 font-medium">Top Signal Drivers</th>
              <th className="text-left py-3 px-4 font-medium">Account Tenure</th>
              <th className="text-left py-3 px-4 font-medium">Branch</th>
              <th className="text-left py-3 px-4 font-medium">AI Summary</th>
              <th className="text-left py-3 px-4 font-medium">CTA</th>
            </tr>
          </thead>
          <tbody>
            {mockMembers.map((member) => (
              <tr
                key={member.id}
                className="border-b border-[#e8e4de] hover:bg-[#faf8f5] transition-colors"
              >
                <td className="py-3 px-4 text-[#2a2520]">{member.rank}</td>
                <td className="py-3 px-4">
                  <Link
                    href={`/dashboard/members/${member.id}`}
                    className="text-[#2a2520] font-medium hover:text-primary transition-colors"
                  >
                    {member.name}
                  </Link>
                </td>
                <td className="py-3 px-4">
                  <ScoreBar score={member.score} />
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-1 flex-wrap">
                    {member.drivers.map((driver, index) => (
                      <DriverBadge key={index} name={driver.name} color={driver.color} />
                    ))}
                  </div>
                </td>
                <td className="py-3 px-4 text-[#2a2520]">{member.tenure}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded text-xs bg-[#f5f3f0] text-[#2a2520] border border-[#e8e4de]">
                    {member.branch}
                  </span>
                </td>
                <td className="py-3 px-4 text-[#2a2520]/70 text-xs max-w-xs">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="line-clamp-2 cursor-help leading-relaxed">
                          {member.summary}
                        </p>
                      </TooltipTrigger>
                      <TooltipContent 
                        side="top" 
                        className="max-w-sm bg-[#2a2520] border-[#3a3530] text-white p-3"
                      >
                        <p className="text-xs leading-relaxed">{member.summary}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </td>
                <td className="py-3 px-4">
                  <Link href={`/dashboard/outreach/${member.id}`}>
                    <Button
                      size="sm"
                      className="bg-primary text-white hover:bg-primary/90 text-xs"
                    >
                      Generate Outreach
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-6">
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 text-[#2a2520]/60 hover:text-[#2a2520]"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        
        {[1, 2].map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "ghost"}
            size="icon"
            className={`w-8 h-8 ${
              currentPage === page
                ? "bg-[#2a2520] text-white"
                : "text-[#2a2520]/60 hover:text-[#2a2520]"
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        ))}
        
        <span className="text-[#2a2520]/40 px-2">...</span>
        
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 text-[#2a2520]/60 hover:text-[#2a2520]"
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 text-[#2a2520]/60 hover:text-[#2a2520]"
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
