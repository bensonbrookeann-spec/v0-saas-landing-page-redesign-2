"use client"

import Link from "next/link"
import { Search, Clock, CheckCircle, XCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

// Mock outreach history data
const mockOutreachHistory = [
  {
    id: "1",
    memberId: "2",
    memberName: "Man Cutkatch",
    status: "completed",
    scriptGenerated: "2024-03-15",
    callLogged: "2024-03-16",
    outcome: "Interested in business line of credit",
  },
  {
    id: "2",
    memberId: "8",
    memberName: "Sarah Mitchell",
    status: "completed",
    scriptGenerated: "2024-03-14",
    callLogged: "2024-03-14",
    outcome: "Set up meeting for merchant services demo",
  },
  {
    id: "3",
    memberId: "1",
    memberName: "Member Johnnson",
    status: "pending",
    scriptGenerated: "2024-03-17",
    callLogged: null,
    outcome: null,
  },
  {
    id: "4",
    memberId: "9",
    memberName: "Marcus Chen",
    status: "no_answer",
    scriptGenerated: "2024-03-13",
    callLogged: "2024-03-13",
    outcome: "No answer - follow up scheduled",
  },
  {
    id: "5",
    memberId: "3",
    memberName: "Keri Hoeon",
    status: "pending",
    scriptGenerated: "2024-03-17",
    callLogged: null,
    outcome: null,
  },
]

// Mock pending outreach
const mockPendingOutreach = [
  { id: "4", name: "Sane Velmand", score: 72, reason: "High business signal detected" },
  { id: "5", name: "Mark Sannet", score: 68, reason: "Multiple payment processors" },
  { id: "6", name: "David Sternson", score: 65, reason: "Growing transaction volume" },
  { id: "7", name: "James Moare", score: 58, reason: "New e-commerce activity" },
]

function StatusBadge({ status }: { status: string }) {
  const getStatusConfig = () => {
    switch (status) {
      case "completed":
        return { icon: CheckCircle, label: "Completed", className: "bg-green-500/20 text-green-400" }
      case "pending":
        return { icon: Clock, label: "Pending", className: "bg-yellow-500/20 text-yellow-400" }
      case "no_answer":
        return { icon: XCircle, label: "No Answer", className: "bg-red-500/20 text-red-400" }
      default:
        return { icon: Clock, label: status, className: "bg-gray-500/20 text-gray-400" }
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${config.className}`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  )
}

export default function OutreachPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredHistory = mockOutreachHistory.filter(item =>
    item.memberName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-6">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-[#2a2520] mb-6">Outreach</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Outreach Suggestions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-4 border border-[#e8e4de]">
            <h2 className="text-lg font-semibold text-[#2a2520] mb-4">Suggested Outreach</h2>
            <div className="space-y-3">
              {mockPendingOutreach.map((member) => (
                <div
                  key={member.id}
                  className="p-3 rounded-lg bg-[#faf8f5] border border-[#e8e4de]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-[#2a2520]">{member.name}</span>
                    <span className="text-sm text-primary font-semibold">{member.score}</span>
                  </div>
                  <p className="text-xs text-[#2a2520]/60 mb-3">{member.reason}</p>
                  <Link href={`/dashboard/outreach/${member.id}`}>
                    <Button size="sm" className="w-full bg-primary text-white hover:bg-primary/90">
                      Generate Script
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Outreach History */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-4 border border-[#e8e4de]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#2a2520]">Outreach History</h2>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2a2520]/40" />
                <Input
                  placeholder="Search history..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-[#faf8f5] border-[#e8e4de] text-[#2a2520] placeholder:text-[#2a2520]/40 h-9"
                />
              </div>
            </div>

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e8e4de] text-[#2a2520]/60">
                  <th className="text-left py-2 font-medium">Member</th>
                  <th className="text-left py-2 font-medium">Status</th>
                  <th className="text-left py-2 font-medium">Generated</th>
                  <th className="text-left py-2 font-medium">Outcome</th>
                  <th className="text-left py-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((item) => (
                  <tr key={item.id} className="border-b border-[#e8e4de]">
                    <td className="py-3">
                      <Link
                        href={`/dashboard/members/${item.memberId}`}
                        className="text-[#2a2520] font-medium hover:text-primary transition-colors"
                      >
                        {item.memberName}
                      </Link>
                    </td>
                    <td className="py-3">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="py-3 text-[#2a2520]/60">{item.scriptGenerated}</td>
                    <td className="py-3 text-[#2a2520]/60 max-w-48 truncate">
                      {item.outcome || "-"}
                    </td>
                    <td className="py-3">
                      <Link href={`/dashboard/outreach/${item.memberId}`}>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                          View Script
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredHistory.length === 0 && (
              <div className="text-center py-8">
                <p className="text-[#2a2520]/60">No outreach history found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
