"use client"

import Link from "next/link"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"

// Mock members data
const mockMembers = [
  { id: "1", name: "Member Johnnson", score: 30, branch: "Branch", tenure: "2 years", status: "Active" },
  { id: "2", name: "Man Cutkatch", score: 85, branch: "Downtown", tenure: "1 year", status: "Active" },
  { id: "3", name: "Keri Hoeon", score: 78, branch: "Branch", tenure: "1 year", status: "Active" },
  { id: "4", name: "Sane Velmand", score: 72, branch: "Mamontarg", tenure: "4 years", status: "Active" },
  { id: "5", name: "Mark Sannet", score: 68, branch: "Branch", tenure: "2 years", status: "Active" },
  { id: "6", name: "David Sternson", score: 65, branch: "Branch", tenure: "2 years", status: "Active" },
  { id: "7", name: "James Moare", score: 58, branch: "Branch", tenure: "1 year", status: "Active" },
  { id: "8", name: "Sarah Mitchell", score: 92, branch: "Downtown", tenure: "3 years", status: "Active" },
  { id: "9", name: "Marcus Chen", score: 81, branch: "Westside", tenure: "2 years", status: "Active" },
  { id: "10", name: "Jennifer Adams", score: 76, branch: "Downtown", tenure: "4 years", status: "Active" },
]

// Score indicator component
function ScoreIndicator({ score }: { score: number }) {
  const getColor = () => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-primary"
    if (score >= 40) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${getColor()}`} />
      <span className="text-[#2a2520] font-semibold">{score}</span>
    </div>
  )
}

export default function MembersListPage() {
  const [searchQuery, setSearchQuery] = useState("")
  
  const filteredMembers = mockMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.branch.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-6">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-[#2a2520] mb-6">Members</h1>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2a2520]/40" />
        <Input
          placeholder="Search members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-white border-[#e8e4de] text-[#2a2520] placeholder:text-[#2a2520]/40"
        />
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMembers.map((member) => (
          <Link
            key={member.id}
            href={`/dashboard/members/${member.id}`}
            className="bg-white rounded-xl p-4 border border-[#e8e4de] hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-[#2a2520]">{member.name}</h3>
                <p className="text-sm text-[#2a2520]/60">{member.branch}</p>
              </div>
              <ScoreIndicator score={member.score} />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#2a2520]/60">Tenure: {member.tenure}</span>
              <span className="px-2 py-0.5 rounded-full text-xs bg-green-500/20 text-green-600">
                {member.status}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#2a2520]/60">No members found matching your search.</p>
        </div>
      )}
    </div>
  )
}
