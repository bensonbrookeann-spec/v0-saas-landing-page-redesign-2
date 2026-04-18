"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, Users, Send, Settings, ChevronDown, Bell, Copy, Phone } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// MemberSignal Logo Component
function MemberSignalLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <rect x="4" y="22" width="8" height="14" rx="2" fill="currentColor" />
      <rect x="16" y="14" width="8" height="22" rx="2" fill="currentColor" />
      <rect x="28" y="6" width="8" height="30" rx="2" fill="currentColor" />
    </svg>
  )
}

// Circular Score Component
function CircularScore({ score, size = 120 }: { score: number; size?: number }) {
  const strokeWidth = 8
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-muted/50"
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
        <span className="text-2xl font-bold text-cream-foreground">{score}</span>
      </div>
    </div>
  )
}

// Lead List Dashboard Preview - Dark themed to match mockups
function LeadListDashboard() {
  const members = [
    { rank: 1, name: "Sarah Mitchell", score: 92, drivers: ["Shopify"], tenure: "3 years", branch: "Downtown", summary: "High-volume e-commerce seller with consistent payment processor deposits..." },
    { rank: 2, name: "Marcus Chen", score: 85, drivers: ["Square", "Stripe"], tenure: "2 years", branch: "Westside", summary: "Retail business owner with multiple revenue streams and growing deposits..." },
    { rank: 3, name: "Jennifer Adams", score: 78, drivers: ["PayPal"], tenure: "4 years", branch: "Downtown", summary: "Freelance consultant with regular business software subscriptions..." },
    { rank: 4, name: "David Thompson", score: 72, drivers: ["Stripe"], tenure: "1 year", branch: "Northgate", summary: "New business signals detected, appears to be starting online services..." },
  ]

  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl bg-[#1a1814]">
      {/* Header */}
      <div className="bg-[#1a1814] px-4 py-3 flex items-center justify-between border-b border-[#2a2520]">
        <div className="flex items-center gap-3">
          <MemberSignalLogo className="w-8 h-8 text-primary" />
          <span className="text-primary font-semibold text-lg">MemberSignal</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 grid grid-cols-3 gap-0.5 opacity-60">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-white/60 rounded-full" />
            ))}
          </div>
          <Bell className="w-5 h-5 text-white/60" />
          <div className="w-8 h-8 rounded-full bg-cream" />
        </div>
      </div>
      
      {/* Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-20 bg-[#1a1814] py-6 flex flex-col items-center gap-6 border-r border-[#2a2520]">
          <div className="flex flex-col items-center gap-1 text-primary">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
            <span className="text-xs">Dashboard</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-white/50">
            <Users className="w-5 h-5" />
            <span className="text-xs">Members</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-white/50">
            <Send className="w-5 h-5" />
            <span className="text-xs">Outreach</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-white/50">
            <Settings className="w-5 h-5" />
            <span className="text-xs">Settings</span>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-4 bg-[#1a1814]">
          <h2 className="text-xl font-semibold mb-4 text-white">Lead List Dashboard</h2>
          
          {/* Filters */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm text-white/60">Filters</span>
            {["Branch", "Balance", "Tenure", "Score Range"].map((filter) => (
              <button
                key={filter}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#2a2520] text-sm text-white/80 border border-[#3a3530]"
              >
                {filter}
                <ChevronDown className="w-3 h-3" />
              </button>
            ))}
          </div>
          
          {/* Table */}
          <div className="rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2a2520] text-white/60">
                  <th className="text-left py-2 px-2 font-medium">Rank</th>
                  <th className="text-left py-2 px-2 font-medium">Member Name</th>
                  <th className="text-left py-2 px-2 font-medium">Business Signal Score</th>
                  <th className="text-left py-2 px-2 font-medium">Top Signal Drivers</th>
                  <th className="text-left py-2 px-2 font-medium">Account Tenure</th>
                  <th className="text-left py-2 px-2 font-medium">Branch</th>
                  <th className="text-left py-2 px-2 font-medium">AI Summary</th>
                  <th className="text-left py-2 px-2 font-medium">CTA</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.rank} className="border-b border-[#2a2520]/50">
                    <td className="py-2 px-2 text-white">{member.rank}</td>
                    <td className="py-2 px-2 text-white">{member.name}</td>
                    <td className="py-2 px-2">
                      <div className="w-20 h-2 bg-[#2a2520] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${member.score}%` }}
                        />
                      </div>
                    </td>
                    <td className="py-2 px-2">
                      <div className="flex gap-1">
                        {member.drivers.map((driver) => (
                          <span 
                            key={driver} 
                            className="px-2 py-0.5 rounded-full text-xs border border-[#3a3530] bg-[#2a2520] text-white/80"
                          >
                            {driver}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-2 px-2 text-white">{member.tenure}</td>
                    <td className="py-2 px-2">
                      <span className="px-2 py-0.5 rounded-full text-xs bg-[#2a2520] text-white/80 border border-[#3a3530]">
                        {member.branch}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-white/50 text-xs max-w-32 truncate">
                      {member.summary}
                    </td>
                    <td className="py-2 px-2">
                      <button className="px-3 py-1 rounded-md text-xs bg-primary text-white font-medium hover:bg-primary/90 transition-colors">
                        Generate Outreach
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

// Member Detail View Preview - Dark themed with cream member card
function MemberDetailView() {
  const transactions = [
    { date: "Mar 15", merchant: "Stripe", amount: "$2,450.00", classification: "Payment Processor Deposit" },
    { date: "Mar 14", merchant: "QuickBooks", amount: "$79.99", classification: "Business Software" },
    { date: "Mar 12", merchant: "Shopify Payout", amount: "$1,890.00", classification: "E-commerce Revenue" },
    { date: "Mar 10", merchant: "Office Depot", amount: "$234.50", classification: "Business Supplies" },
    { date: "Mar 08", merchant: "Square Deposit", amount: "$567.00", classification: "Payment Processor Deposit" },
  ]

  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl max-w-2xl bg-[#1a1814]">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-16 bg-[#1a1814] py-4 flex flex-col items-center gap-4 border-r border-[#2a2520]">
          <MemberSignalLogo className="w-6 h-6 text-primary" />
          <div className="flex flex-col items-center gap-1 text-primary">
            <div className="w-6 h-6 bg-primary/20 rounded flex items-center justify-center">
              <BarChart3 className="w-3 h-3" />
            </div>
            <span className="text-[10px]">Dashboard</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-white/50">
            <Users className="w-4 h-4" />
            <span className="text-[10px]">Members</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-white/50">
            <Send className="w-4 h-4" />
            <span className="text-[10px]">Outreach</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-white/50">
            <Settings className="w-4 h-4" />
            <span className="text-[10px]">Settings</span>
          </div>
        </div>
        
        {/* Member Card - Cream themed */}
        <div className="w-44 p-4 bg-cream">
          <h3 className="text-lg font-semibold text-cream-foreground">Sarah<br/>Mitchell</h3>
          <div className="flex justify-center my-3">
            <div className="relative">
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-xs text-cream-foreground/70">Score</span>
              <CircularScore score={78} size={80} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-cream-foreground border-t border-cream-foreground/20 pt-2">
            <div>
              <div className="font-semibold">Tenure</div>
              <div className="text-cream-foreground/70">3 years</div>
            </div>
            <div>
              <div className="font-semibold">Branch</div>
              <div className="text-cream-foreground/70">Downtown</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-cream-foreground mt-2">
            <div>
              <div className="font-bold text-base">$4,850</div>
              <div className="text-cream-foreground/70">Avg. monthly deposits</div>
            </div>
            <div>
              <div className="font-semibold">Above Avg</div>
              <div className="text-cream-foreground/70">vs. segment</div>
            </div>
          </div>
        </div>
        
        {/* Transaction Feed - Dark themed */}
        <div className="flex-1 p-4 bg-[#1a1814]">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-white">Transaction Feed</h4>
            <button className="flex items-center gap-1 px-2 py-1 rounded bg-[#2a2520] text-xs text-white/80 border border-[#3a3530]">
              Last 90 days
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          
          <table className="w-full text-xs">
            <thead>
              <tr className="text-white/60 border-b border-[#2a2520]">
                <th className="text-left py-1 font-medium">Date</th>
                <th className="text-left py-1 font-medium">Merchant</th>
                <th className="text-left py-1 font-medium">Amount</th>
                <th className="text-left py-1 font-medium">Classification</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, i) => (
                <tr key={i} className="border-b border-[#2a2520]/50">
                  <td className="py-1.5 text-white">{tx.date}</td>
                  <td className="py-1.5 text-white">{tx.merchant}</td>
                  <td className="py-1.5 text-white">{tx.amount}</td>
                  <td className="py-1.5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                      tx.classification.includes("Deposit") || tx.classification.includes("Revenue")
                        ? "bg-primary text-white" 
                        : "border border-[#3a3530] text-white/80"
                    }`}>
                      {tx.classification}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Suggested Talking Point */}
          <div className="mt-3 p-3 rounded-lg bg-primary text-white">
            <h5 className="font-semibold text-sm mb-1">Suggested Talking Point</h5>
            <p className="text-xs opacity-90">
              Sarah shows strong e-commerce activity through Shopify and Stripe. Ask about her online store and if she needs merchant services or a business line of credit.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Outreach Script Generator Preview - Cream themed card
function OutreachScriptGenerator() {
  return (
    <div className="rounded-2xl overflow-hidden bg-[#e8e0d5] shadow-2xl max-w-sm p-5 border border-[#d5cdc2]">
      <h3 className="text-lg font-semibold text-[#2a2520] mb-4">Outreach Script Generator</h3>
      
      {/* Member Header */}
      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 border border-[#d5cdc2] mb-4">
        <div className="w-10 h-10 rounded-full bg-[#c5bdb2]" />
        <div>
          <div className="font-semibold text-[#2a2520]">Sarah Mitchell</div>
          <div className="text-xs text-[#5a5550]">E-commerce Owner</div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <CircularScore score={78} size={40} />
          <div className="text-right">
            <div className="text-xs text-[#5a5550]">Detected</div>
            <div className="text-xs font-medium text-[#2a2520]">Retail Business</div>
          </div>
          <div className="w-6 h-6 bg-primary/20 rounded flex items-center justify-center">
            <BarChart3 className="w-3 h-3 text-primary" />
          </div>
        </div>
      </div>
      
      {/* Generated Script */}
      <div className="p-4 rounded-xl bg-white/50 border border-[#d5cdc2] mb-4">
        <h4 className="font-semibold text-[#2a2520] mb-2">Generated script</h4>
        <p className="text-sm text-[#3a3530] leading-relaxed">
          {'"'}Hi <span className="text-primary font-medium">Sarah</span>, I noticed your account has been growing steadily. It looks like your <span className="text-primary font-medium">online retail business</span> is doing well!{'"'}
        </p>
        <p className="text-sm text-[#3a3530] leading-relaxed mt-2">
          {'"'}Have you considered a <span className="text-primary font-medium">business line of credit</span> to help manage inventory? We also offer <span className="underline">merchant services</span> with lower fees than most processors.{'"'}
        </p>
      </div>
      
      {/* Variation Buttons */}
      <div className="mb-4">
        <h4 className="font-semibold text-[#2a2520] mb-2">Variation</h4>
        <div className="flex gap-2">
          {["More Formal", "More Casual", "Shorter"].map((variant) => (
            <button
              key={variant}
              className="px-3 py-1.5 rounded-full text-sm border border-[#c5bdb2] text-[#3a3530] hover:bg-white/50 transition-colors"
            >
              {variant}
            </button>
          ))}
        </div>
      </div>
      
      {/* Action Buttons */}
      <button className="w-full py-2.5 rounded-full bg-primary text-white font-medium mb-2 flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
        <Copy className="w-4 h-4" />
        Copy Script
      </button>
      <button className="w-full py-2.5 rounded-full border border-[#c5bdb2] text-[#3a3530] font-medium flex items-center justify-center gap-2 hover:bg-white/50 transition-colors">
        <Phone className="w-4 h-4" />
        Log Call
      </button>
      
      <p className="text-center text-xs text-[#7a7570] mt-4 italic">
        Generated by MemberSignal AI — based on 90 days of transaction signals.
      </p>
    </div>
  )
}

export default function MemberSignalLanding() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#e0d8cd]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <MemberSignalLogo className="w-8 h-8 text-primary" />
            <span className="text-xl font-semibold text-primary">MemberSignal</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-[#5a5550] hover:text-[#2a2520] transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-sm text-[#5a5550] hover:text-[#2a2520] transition-colors">How It Works</Link>
            <Link href="#pricing" className="text-sm text-[#5a5550] hover:text-[#2a2520] transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="text-[#2a2520]">Sign In</Button>
            <Button className="bg-primary text-white hover:bg-primary/90">
              Get Started
            </Button>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-[#f5f0e8] to-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-primary font-medium">Built for Credit Unions</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#2a2520] leading-tight text-balance">
              Your Members Are Running Businesses. <span className="text-primary">Do You Know Which Ones?</span>
            </h1>
            <p className="text-lg text-[#5a5550] mb-8 leading-relaxed text-pretty">
              59% of small business owners don&apos;t have a separate business account — they&apos;re hiding in your retail checking. 
              MemberSignal detects business signals in transaction data so you can find them first.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-lg px-8 py-6">
                Schedule Demo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-[#c5bdb2] text-[#2a2520] hover:bg-[#e8e0d5] text-lg px-8 py-6">
                See How It Works
              </Button>
            </div>
          </div>
          
          {/* Hero Dashboard Preview */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none z-10 h-full" />
            <LeadListDashboard />
          </div>
        </div>
      </section>
      
      {/* Problem Section */}
      <section className="py-16 px-6 bg-[#1a1814] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">The Hidden Business Problem</h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Industry research confirms: business owners are hiding in your retail checking accounts.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-4xl font-bold text-primary mb-2">80%</div>
              <div className="text-white/90 font-medium mb-1">of credit union leaders</div>
              <p className="text-sm text-white/60">plan to expand SMB services in 2025-2026, up from 65% in 2023.</p>
              <p className="text-xs text-white/40 mt-2">Source: Jack Henry 2025 Strategy Benchmark</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-4xl font-bold text-primary mb-2">59%</div>
              <div className="text-white/90 font-medium mb-1">of small business owners</div>
              <p className="text-sm text-white/60">mix business and personal finances — no separate business account.</p>
              <p className="text-xs text-white/40 mt-2">Source: CFPB Making Ends Meet Survey, 2024</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-4xl font-bold text-primary mb-2">5.6M</div>
              <div className="text-white/90 font-medium mb-1">new businesses formed</div>
              <p className="text-sm text-white/60">in 2025 alone — many started by your existing members.</p>
              <p className="text-xs text-white/40 mt-2">Source: U.S. Census Bureau BFS, 2026</p>
            </div>
          </div>
          
          <div className="mt-10 p-6 rounded-2xl bg-primary/20 border border-primary/30 max-w-3xl mx-auto">
            <p className="text-center text-white/90 italic">
              {'"'}Your data and analytics capabilities are crucial to uncovering camouflaged SMB owners hidden in retail checking accounts.{'"'}
            </p>
            <p className="text-center text-sm text-white/50 mt-2">— Jack Henry 2025 Strategy Benchmark</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2a2520]">How MemberSignal Works</h2>
            <p className="text-lg text-[#5a5550] max-w-2xl mx-auto">
              We analyze the transaction signals already in your core data to identify hidden business owners.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart3 className="w-6 h-6" />,
                title: "Transaction Signal Detection",
                description: "We detect Stripe, Square, PayPal, Shopify deposits, business software subscriptions, and supplier payments — all proven indicators of business activity."
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Business Signal Scoring",
                description: "Each member gets a score based on transaction patterns. Prioritize outreach to the highest-confidence leads first."
              },
              {
                icon: <Send className="w-6 h-6" />,
                title: "AI Outreach Scripts",
                description: "One-click personalized scripts referencing detected business type, transaction patterns, and relevant CU products."
              }
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#f5f0e8] border border-[#e0d8cd] hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#2a2520]">{feature.title}</h3>
                <p className="text-[#5a5550]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Product Screenshots Section */}
      <section id="how-it-works" className="py-20 px-6 bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2a2520]">See MemberSignal in Action</h2>
            <p className="text-lg text-[#5a5550] max-w-2xl mx-auto">
              From member discovery to personalized outreach — see how our platform works.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Member Detail View */}
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-2 text-[#2a2520]">Member Detail View</h3>
                <p className="text-[#5a5550]">
                  Dive deep into individual member profiles with transaction feeds, business classifications, 
                  and AI-generated talking points for your next conversation.
                </p>
              </div>
              <MemberDetailView />
            </div>
            
            {/* Outreach Script Generator */}
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-2 text-[#2a2520]">Outreach Script Generator</h3>
                <p className="text-[#5a5550]">
                  Generate personalized outreach scripts with one click. Adjust tone, copy to clipboard, 
                  and log calls — all from a single interface.
                </p>
              </div>
              <OutreachScriptGenerator />
            </div>
          </div>
        </div>
      </section>
      
      {/* Compliance Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <span className="text-xs text-primary font-medium">BSA/AML Compliance</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#2a2520]">
                Turn a Compliance Gap Into a Business Opportunity
              </h2>
              <p className="text-[#5a5550] mb-4">
                The FFIEC BSA/AML examination manual requires credit unions to identify accounts being used for business purposes and apply enhanced due diligence.
              </p>
              <p className="text-[#5a5550]">
                MemberSignal helps you meet this regulatory obligation proactively — while also surfacing revenue opportunities your compliance team will thank you for finding.
              </p>
            </div>
            <div className="lg:w-80 p-6 rounded-2xl bg-[#f5f0e8] border border-[#e0d8cd]">
              <p className="text-[#3a3530] italic text-sm leading-relaxed">
                {'"'}Banks must direct resources to accounts that pose the greatest risk... there are federal laws in place to prevent money laundering when personal accounts are used for business transactions.{'"'}
              </p>
              <p className="text-xs text-[#7a7570] mt-3">— FFIEC BSA/AML Examination Manual</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Now Section */}
      <section className="py-20 px-6 bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">The Competitive Threat</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Fintechs are already targeting your business members with loans — using the same transaction data you have.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { value: "42%", label: "of small businesses use a fintech alongside their primary bank" },
              { value: "$6.35B", label: "in embedded loans disbursed by fintechs in 2024" },
              { value: "57%", label: "of small businesses bank with large nationals — not CUs" }
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/10">
                <div className="text-4xl md:text-5xl font-bold text-white mb-3">{stat.value}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-white/60 text-sm mt-8 max-w-2xl mx-auto">
            A member routing $3,000/month through Stripe is already being targeted by Stripe Capital for a loan. 
            If you don&apos;t know they&apos;re running a business, you can&apos;t compete.
          </p>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2a2520]">
            Stop Losing Business Members to Fintechs
          </h2>
          <p className="text-lg text-[#5a5550] mb-8">
            See which of your members are running businesses — and start the conversation before someone else does.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-lg px-8 py-6">
              Schedule a Demo
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-[#c5bdb2] text-[#2a2520] hover:bg-[#e8e0d5] text-lg px-8 py-6">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[#e0d8cd] bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <MemberSignalLogo className="w-6 h-6 text-primary" />
              <span className="font-semibold text-primary">MemberSignal</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-[#5a5550]">
              <Link href="#" className="hover:text-[#2a2520] transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-[#2a2520] transition-colors">Terms</Link>
              <Link href="#" className="hover:text-[#2a2520] transition-colors">Contact</Link>
            </div>
            <div className="text-sm text-[#5a5550]">
              © 2026 MemberSignal. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
