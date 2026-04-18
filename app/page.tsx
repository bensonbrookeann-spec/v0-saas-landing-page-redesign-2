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

// Lead List Dashboard Preview
function LeadListDashboard() {
  const members = [
    { rank: 1, name: "MemberSignal", score: 92, drivers: ["PayPal"], tenure: "2 year", branch: "Branch", summary: "Member demonstrates strong business commercial financial affi..." },
    { rank: 2, name: "Man Cutkatch", score: 85, drivers: ["Shopify", "Square"], tenure: "1 year", branch: "Branch", summary: "Business processed integer for business soarinsms and common..." },
    { rank: 3, name: "Keni Hoeon", score: 78, drivers: ["Shopify"], tenure: "1 year", branch: "Branch", summary: "AI Summary is an action ooe add customerixis and vere business to..." },
    { rank: 4, name: "Sane Velmand", score: 72, drivers: ["PayPal"], tenure: "4 years", branch: "Mamontarg", summary: "Member llasco.oncen iommerce and to end rcasnticved business..." },
  ]

  return (
    <div className="rounded-2xl overflow-hidden border border-border bg-card shadow-2xl">
      {/* Header */}
      <div className="bg-sidebar px-4 py-3 flex items-center justify-between border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <MemberSignalLogo className="w-8 h-8 text-primary" />
          <span className="text-primary font-semibold text-lg">MemberSignal</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 grid grid-cols-3 gap-0.5 opacity-60">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-current rounded-full" />
            ))}
          </div>
          <Bell className="w-5 h-5 text-muted-foreground" />
          <div className="w-8 h-8 rounded-full bg-cream" />
        </div>
      </div>
      
      {/* Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-20 bg-sidebar py-6 flex flex-col items-center gap-6 border-r border-sidebar-border">
          <div className="flex flex-col items-center gap-1 text-primary">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
            <span className="text-xs">Dashboard</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-muted-foreground">
            <Users className="w-5 h-5" />
            <span className="text-xs">Members</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-muted-foreground">
            <Send className="w-5 h-5" />
            <span className="text-xs">Outreach</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-muted-foreground">
            <Settings className="w-5 h-5" />
            <span className="text-xs">Settings</span>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-4">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Lead List Dashboard</h2>
          
          {/* Filters */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm text-muted-foreground">Filters</span>
            {["Branch", "Balance", "Tenure", "Score Range"].map((filter) => (
              <button
                key={filter}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-secondary text-sm text-secondary-foreground border border-border"
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
                <tr className="border-b border-border text-muted-foreground">
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
                  <tr key={member.rank} className="border-b border-border/50">
                    <td className="py-2 px-2 text-foreground">{member.rank}</td>
                    <td className="py-2 px-2 text-foreground">{member.name}</td>
                    <td className="py-2 px-2">
                      <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
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
                            className="px-2 py-0.5 rounded-full text-xs border border-border bg-secondary text-secondary-foreground"
                          >
                            {driver}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-2 px-2 text-foreground">{member.tenure}</td>
                    <td className="py-2 px-2">
                      <span className="px-2 py-0.5 rounded-full text-xs bg-secondary text-secondary-foreground border border-border">
                        {member.branch}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-muted-foreground text-xs max-w-32 truncate">
                      {member.summary}
                    </td>
                    <td className="py-2 px-2">
                      <button className="px-3 py-1 rounded-md text-xs bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
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

// Member Detail View Preview
function MemberDetailView() {
  const transactions = [
    { date: "Jan 12/21", merchant: "Credit Processor", amount: "$130.00", classification: "Payment Processor Deposit" },
    { date: "Jan 12/21", merchant: "Business Name", amount: "$150.00", classification: "Business Software Subscription" },
    { date: "Jan 12/21", merchant: "Shopify Name", amount: "$30.00", classification: "Payment Processor Deposit" },
    { date: "Jan 12/21", merchant: "Merritant Name", amount: "$120.00", classification: "Likely Supplier Payment" },
    { date: "Jan 12/21", merchant: "PayPal", amount: "$30.00", classification: "Likely Supplier Payment" },
  ]

  return (
    <div className="rounded-2xl overflow-hidden border border-border bg-card shadow-2xl max-w-2xl">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-16 bg-sidebar py-4 flex flex-col items-center gap-4 border-r border-sidebar-border">
          <MemberSignalLogo className="w-6 h-6 text-primary" />
          <div className="flex flex-col items-center gap-1 text-primary">
            <div className="w-6 h-6 bg-primary/20 rounded flex items-center justify-center">
              <BarChart3 className="w-3 h-3" />
            </div>
            <span className="text-[10px]">Dashboard</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span className="text-[10px]">Members</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-muted-foreground">
            <Send className="w-4 h-4" />
            <span className="text-[10px]">Outreach</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-muted-foreground">
            <Settings className="w-4 h-4" />
            <span className="text-[10px]">Settings</span>
          </div>
        </div>
        
        {/* Member Card */}
        <div className="w-44 p-4 bg-cream">
          <h3 className="text-lg font-semibold text-cream-foreground">Member<br/>Johnmson</h3>
          <div className="flex justify-center my-3">
            <div className="relative">
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-xs text-cream-foreground/70">Score</span>
              <CircularScore score={30} size={80} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-cream-foreground border-t border-cream-foreground/20 pt-2">
            <div>
              <div className="font-semibold">Tenure</div>
              <div className="text-cream-foreground/70">Tenure</div>
            </div>
            <div>
              <div className="font-semibold">Branch</div>
              <div className="text-cream-foreground/70">Branch</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-cream-foreground mt-2">
            <div>
              <div className="font-bold text-base">2,61$</div>
              <div className="text-cream-foreground/70">Avg. monthly deposits</div>
            </div>
            <div>
              <div className="font-semibold">Average</div>
              <div className="text-cream-foreground/70">Monthly deposits</div>
            </div>
          </div>
        </div>
        
        {/* Transaction Feed */}
        <div className="flex-1 p-4 bg-card">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-foreground">Transaction Feed</h4>
            <button className="flex items-center gap-1 px-2 py-1 rounded bg-secondary text-xs text-secondary-foreground border border-border">
              Last 90 days
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          
          <table className="w-full text-xs">
            <thead>
              <tr className="text-muted-foreground border-b border-border">
                <th className="text-left py-1 font-medium">Date</th>
                <th className="text-left py-1 font-medium">Merchant</th>
                <th className="text-left py-1 font-medium">Amount</th>
                <th className="text-left py-1 font-medium">Classification</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, i) => (
                <tr key={i} className="border-b border-border/30">
                  <td className="py-1.5 text-foreground">{tx.date}</td>
                  <td className="py-1.5 text-foreground">{tx.merchant}</td>
                  <td className="py-1.5 text-foreground">{tx.amount}</td>
                  <td className="py-1.5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                      tx.classification.includes("Processor") 
                        ? "bg-primary text-primary-foreground" 
                        : "border border-border text-foreground"
                    }`}>
                      {tx.classification}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Suggested Talking Point */}
          <div className="mt-3 p-3 rounded-lg bg-primary text-primary-foreground">
            <h5 className="font-semibold text-sm mb-1">Suggested Talking Point</h5>
            <p className="text-xs opacity-90">
              AI-generated sentence specific the name of your business business type is a detected signal.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Outreach Script Generator Preview
function OutreachScriptGenerator() {
  return (
    <div className="rounded-2xl overflow-hidden border border-border bg-cream shadow-2xl max-w-sm p-5">
      <h3 className="text-lg font-semibold text-cream-foreground mb-4">Outreach Script Generator</h3>
      
      {/* Member Header */}
      <div className="flex items-center gap-3 p-3 rounded-xl bg-card/5 border border-cream-foreground/10 mb-4">
        <div className="w-10 h-10 rounded-full bg-cream-foreground/20" />
        <div>
          <div className="font-semibold text-cream-foreground">Member Jonnson</div>
          <div className="text-xs text-cream-foreground/60">Context Recap</div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <CircularScore score={50} size={40} />
          <div className="text-right">
            <div className="text-xs text-cream-foreground/60">Detected</div>
            <div className="text-xs font-medium text-cream-foreground">Business type</div>
          </div>
          <div className="w-6 h-6 bg-primary/20 rounded flex items-center justify-center">
            <BarChart3 className="w-3 h-3 text-primary" />
          </div>
        </div>
      </div>
      
      {/* Generated Script */}
      <div className="p-4 rounded-xl bg-card/5 border border-cream-foreground/10 mb-4">
        <h4 className="font-semibold text-cream-foreground mb-2">Generated script</h4>
        <p className="text-sm text-cream-foreground/80 leading-relaxed">
          I lam personalized name <span className="text-primary font-medium">Member Sanar</span>, business, persoonalized sentences at <span className="text-primary font-medium">credit name</span> of your business type.
        </p>
        <p className="text-sm text-cream-foreground/80 leading-relaxed mt-2">
          We also have to be <span className="text-primary font-medium">business type</span> sentences and emenge your sentences at the <span className="underline">voll details</span> of your business type.
        </p>
      </div>
      
      {/* Variation Buttons */}
      <div className="mb-4">
        <h4 className="font-semibold text-cream-foreground mb-2">Variation</h4>
        <div className="flex gap-2">
          {["More Formal", "More Casual", "Shorter"].map((variant) => (
            <button
              key={variant}
              className="px-3 py-1.5 rounded-full text-sm border border-cream-foreground/30 text-cream-foreground hover:bg-cream-foreground/10 transition-colors"
            >
              {variant}
            </button>
          ))}
        </div>
      </div>
      
      {/* Action Buttons */}
      <button className="w-full py-2.5 rounded-full bg-primary text-primary-foreground font-medium mb-2 flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
        <Copy className="w-4 h-4" />
        Copy Script
      </button>
      <button className="w-full py-2.5 rounded-full border border-cream-foreground/30 text-cream-foreground font-medium flex items-center justify-center gap-2 hover:bg-cream-foreground/10 transition-colors">
        <Phone className="w-4 h-4" />
        Log Call
      </button>
      
      <p className="text-center text-xs text-cream-foreground/50 mt-4">
        Generated by MemberSignal AI — based on 90 days of transaction signals.
      </p>
    </div>
  )
}

export default function MemberSignalLanding() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <MemberSignalLogo className="w-8 h-8 text-primary" />
            <span className="text-xl font-semibold text-primary">MemberSignal</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="text-foreground">Sign In</Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Get Started
            </Button>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-primary font-medium">AI-Powered Member Intelligence</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground leading-tight text-balance">
              Turn Transaction Data Into <span className="text-primary">Business Opportunities</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed text-pretty">
              MemberSignal helps credit unions identify business members hiding in plain sight. 
              Our AI analyzes transaction patterns to surface commercial opportunities and generate 
              personalized outreach scripts.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6">
                Schedule Demo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary text-lg px-8 py-6">
                Watch Video
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
      
      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Powerful Features for Credit Unions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to identify, understand, and engage business members effectively.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart3 className="w-6 h-6" />,
                title: "Business Signal Scoring",
                description: "AI-powered scoring that analyzes transaction patterns to identify members with business activity."
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Member Intelligence",
                description: "Deep insights into member behavior, business type detection, and growth potential analysis."
              },
              {
                icon: <Send className="w-6 h-6" />,
                title: "Smart Outreach Scripts",
                description: "Auto-generated, personalized conversation scripts based on detected business signals."
              }
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl bg-secondary border border-border hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Product Screenshots Section */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">See MemberSignal in Action</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From member discovery to personalized outreach — see how our platform works.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Member Detail View */}
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-2 text-foreground">Member Detail View</h3>
                <p className="text-muted-foreground">
                  Dive deep into individual member profiles with transaction feeds, business classifications, 
                  and AI-generated talking points for your next conversation.
                </p>
              </div>
              <MemberDetailView />
            </div>
            
            {/* Outreach Script Generator */}
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-2 text-foreground">Outreach Script Generator</h3>
                <p className="text-muted-foreground">
                  Generate personalized outreach scripts with one click. Adjust tone, copy to clipboard, 
                  and log calls — all from a single interface.
                </p>
              </div>
              <OutreachScriptGenerator />
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20 px-6 bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: "40%", label: "Increase in Business Loans" },
              { value: "3.2x", label: "ROI on Commercial Outreach" },
              { value: "85%", label: "Accuracy in Detection" },
              { value: "15min", label: "Avg. Time to First Insight" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">{stat.value}</div>
                <div className="text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Ready to Discover Hidden Business Members?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join forward-thinking credit unions using MemberSignal to grow their commercial portfolios.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6">
              Schedule a Demo
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary text-lg px-8 py-6">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <MemberSignalLogo className="w-6 h-6 text-primary" />
              <span className="font-semibold text-primary">MemberSignal</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Contact</Link>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2026 MemberSignal. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
