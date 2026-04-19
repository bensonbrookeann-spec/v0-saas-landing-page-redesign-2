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

// Mock data for the lead list
const mockMembers = [
  {
    id: "1",
    rank: 1,
    name: "Sarah Chen",
    score: 94,
    drivers: [
      { name: "Etsy", color: "bg-[#f56400]" },
      { name: "Stripe", color: "bg-[#635bff]" },
      { name: "QuickBooks", color: "bg-[#2ca01c]" },
    ],
    tenure: "3 years",
    branch: "Downtown",
    summary: "Chen Ceramics LLC detected. Etsy deposits + Stripe payouts + QuickBooks subscription + Faire wholesale payment. 847 Etsy sales, est. $18K-$28K annual revenue. Business registered 8 months ago. High probability of needing business banking services.",
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
      case "Etsy":
        return (
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.559 3.89c0-.558.293-.706 1.027-.706h5.588c2.086 0 2.704 1.266 3.017 2.853h.851l-.205-4.086H4.86l.088 4.086h.88c.41-1.853.616-2.853 2.73-2.853zm.733 15.66v-6.97h3.5c1.88 0 2.3.97 2.593 2.557h.851l-.147-6.263h-.851c-.234 1.441-.654 2.5-2.534 2.5h-3.412V5.89c0-.735.616-.852 1.086-.852h3.647c2.476 0 3.382 1.177 4.057 3.383h.822l-.265-4.559H5.713v.822c1.557 0 2.408.294 2.408 1.5v12.529c0 1.205-.88 1.529-2.408 1.529v.793h8.998v-.793c-1.937 0-2.408-.412-2.408-1.793z" />
          </svg>
        )
      case "Stripe":
        return (
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
          </svg>
        )
      case "QuickBooks":
        return (
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 16.8c-.794 0-1.438-.644-1.438-1.438V8.638c0-.794-.644-1.438-1.438-1.438h-2.13v10.362c0 .794-.644 1.438-1.438 1.438-.794 0-1.438-.644-1.438-1.438V7.2h-2.13c-.794 0-1.438.644-1.438 1.438v6.724c0 .794-.644 1.438-1.438 1.438s-1.438-.644-1.438-1.438V8.638c0-2.383 1.931-4.313 4.313-4.313h5.692c2.383 0 4.313 1.931 4.313 4.313v6.724c0 .794-.644 1.438-1.438 1.438z" />
          </svg>
        )
      case "Faire":
        return (
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
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
    <div className="flex items-center gap-2.5">
      <span className="text-sm font-semibold text-[#3d3530] w-8">{score}</span>
      <div className="w-20 h-2 bg-[#e0d8ce] rounded-full overflow-hidden">
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
    <div className="p-8">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-[#3d3530] mb-6">Lead List Dashboard</h1>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm text-[#6b5f54] font-medium">Filters</span>
        
        <Select defaultValue="all">
          <SelectTrigger className="w-32 bg-[#faf7f4] border-[#ddd5cc] text-[#3d3530] rounded-full shadow-sm hover:shadow transition-shadow">
            <SelectValue placeholder="Branch" />
          </SelectTrigger>
          <SelectContent className="bg-[#faf7f4] border-[#ddd5cc] shadow-lg">
            <SelectItem value="all">Branch</SelectItem>
            <SelectItem value="downtown">Downtown</SelectItem>
            <SelectItem value="westside">Westside</SelectItem>
            <SelectItem value="northgate">Northgate</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="w-32 bg-[#faf7f4] border-[#ddd5cc] text-[#3d3530] rounded-full shadow-sm hover:shadow transition-shadow">
            <SelectValue placeholder="Balance" />
          </SelectTrigger>
          <SelectContent className="bg-[#faf7f4] border-[#ddd5cc] shadow-lg">
            <SelectItem value="all">Balance</SelectItem>
            <SelectItem value="high">$50k+</SelectItem>
            <SelectItem value="medium">$10k-$50k</SelectItem>
            <SelectItem value="low">Under $10k</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="w-32 bg-[#faf7f4] border-[#ddd5cc] text-[#3d3530] rounded-full shadow-sm hover:shadow transition-shadow">
            <SelectValue placeholder="Tenure" />
          </SelectTrigger>
          <SelectContent className="bg-[#faf7f4] border-[#ddd5cc] shadow-lg">
            <SelectItem value="all">Tenure</SelectItem>
            <SelectItem value="5plus">5+ years</SelectItem>
            <SelectItem value="2to5">2-5 years</SelectItem>
            <SelectItem value="under2">Under 2 years</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="w-36 bg-[#faf7f4] border-[#ddd5cc] text-[#3d3530] rounded-full shadow-sm hover:shadow transition-shadow">
            <SelectValue placeholder="Score Range" />
          </SelectTrigger>
          <SelectContent className="bg-[#faf7f4] border-[#ddd5cc] shadow-lg">
            <SelectItem value="all">Score Range</SelectItem>
            <SelectItem value="high">80-100</SelectItem>
            <SelectItem value="medium">50-79</SelectItem>
            <SelectItem value="low">0-49</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Data Table */}
      <div className="bg-[#faf7f4] rounded-2xl shadow-sm border border-[#e8e0d5]/50 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#e8e0d5] text-[#6b5f54] bg-[#f5f0ea]">
              <th className="text-left py-4 px-5 font-medium">Rank</th>
              <th className="text-left py-4 px-5 font-medium">
                <button
                  onClick={() => handleSort("name")}
                  className="flex items-center gap-1 hover:text-[#3d3530] transition-colors"
                >
                  Member Name
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="text-left py-4 px-5 font-medium">Business Signal Score</th>
              <th className="text-left py-4 px-5 font-medium">Top Signal Drivers</th>
              <th className="text-left py-4 px-5 font-medium">Account Tenure</th>
              <th className="text-left py-4 px-5 font-medium">Branch</th>
              <th className="text-left py-4 px-5 font-medium">AI Summary</th>
              <th className="text-left py-4 px-5 font-medium">CTA</th>
            </tr>
          </thead>
          <tbody>
            {mockMembers.map((member) => (
              <tr
                key={member.id}
                className="border-b border-[#e8e0d5]/50 hover:bg-[#f5f0ea] transition-colors"
              >
                <td className="py-4 px-5 text-[#3d3530] font-medium">{member.rank}</td>
                <td className="py-4 px-5">
                  <Link
                    href={`/dashboard/members/${member.id}`}
                    className="text-[#3d3530] font-medium hover:text-primary transition-colors"
                  >
                    {member.name}
                  </Link>
                </td>
                <td className="py-4 px-5">
                  <ScoreBar score={member.score} />
                </td>
                <td className="py-4 px-5">
                  <div className="flex gap-1.5 flex-wrap">
                    {member.drivers.map((driver, index) => (
                      <DriverBadge key={index} name={driver.name} color={driver.color} />
                    ))}
                  </div>
                </td>
                <td className="py-4 px-5 text-[#5a5048]">{member.tenure}</td>
                <td className="py-4 px-5">
                  <span className="px-2.5 py-1 rounded-lg text-xs bg-[#ebe5de] text-[#5a5048] font-medium">
                    {member.branch}
                  </span>
                </td>
                <td className="py-4 px-5 text-[#3d3530] text-sm max-w-md">
                  <p className="leading-relaxed">
                    {member.summary}
                  </p>
                </td>
                <td className="py-4 px-5">
                  <Link href={`/dashboard/outreach/${member.id}`}>
                    <Button
                      size="sm"
                      className="bg-primary text-white hover:bg-primary/90 text-xs shadow-sm"
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
      <div className="flex items-center justify-center gap-2 mt-8">
        <Button
          variant="ghost"
          size="icon"
          className="w-9 h-9 text-[#6b5f54] hover:text-[#3d3530] hover:bg-[#e8e0d5]/50"
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
            className={`w-9 h-9 ${
              currentPage === page
                ? "bg-[#3d3530] text-[#f5f0ea] shadow-sm"
                : "text-[#6b5f54] hover:text-[#3d3530] hover:bg-[#e8e0d5]/50"
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        ))}
        
        <span className="text-[#a09588] px-2">...</span>
        
        <Button
          variant="ghost"
          size="icon"
          className="w-9 h-9 text-[#6b5f54] hover:text-[#3d3530] hover:bg-[#e8e0d5]/50"
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="w-9 h-9 text-[#6b5f54] hover:text-[#3d3530] hover:bg-[#e8e0d5]/50"
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
