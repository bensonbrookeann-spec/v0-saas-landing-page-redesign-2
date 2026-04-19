"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)
  const [autoGenerateScripts, setAutoGenerateScripts] = useState(true)
  const [darkMode, setDarkMode] = useState(true)

  return (
    <div className="p-6 max-w-3xl">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-white mb-6">Settings</h1>

      {/* Profile Settings */}
      <div className="bg-[#2a2520] rounded-xl p-6 border border-[#3a3530] mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">Profile</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-white/60">First Name</Label>
              <Input
                id="firstName"
                defaultValue="John"
                className="bg-[#1a1814] border-[#3a3530] text-white mt-1"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-white/60">Last Name</Label>
              <Input
                id="lastName"
                defaultValue="Smith"
                className="bg-[#1a1814] border-[#3a3530] text-white mt-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="email" className="text-white/60">Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue="john.smith@creditunion.com"
              className="bg-[#1a1814] border-[#3a3530] text-white mt-1"
            />
          </div>
          <div>
            <Label htmlFor="branch" className="text-white/60">Branch</Label>
            <Select defaultValue="downtown">
              <SelectTrigger className="bg-[#1a1814] border-[#3a3530] text-white mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#2a2520] border-[#3a3530]">
                <SelectItem value="downtown">Downtown</SelectItem>
                <SelectItem value="westside">Westside</SelectItem>
                <SelectItem value="northgate">Northgate</SelectItem>
                <SelectItem value="all">All Branches</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-[#2a2520] rounded-xl p-6 border border-[#3a3530] mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Email Notifications</p>
              <p className="text-sm text-white/60">Receive email alerts for new high-score members</p>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Push Notifications</p>
              <p className="text-sm text-white/60">Get browser notifications for urgent updates</p>
            </div>
            <Switch
              checked={pushNotifications}
              onCheckedChange={setPushNotifications}
            />
          </div>
        </div>
      </div>

      {/* AI Settings */}
      <div className="bg-[#2a2520] rounded-xl p-6 border border-[#3a3530] mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">AI Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Auto-generate Scripts</p>
              <p className="text-sm text-white/60">Automatically prepare outreach scripts for top members</p>
            </div>
            <Switch
              checked={autoGenerateScripts}
              onCheckedChange={setAutoGenerateScripts}
            />
          </div>
          <div>
            <Label htmlFor="tone" className="text-white/60">Default Script Tone</Label>
            <Select defaultValue="professional">
              <SelectTrigger className="bg-[#1a1814] border-[#3a3530] text-white mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#2a2520] border-[#3a3530]">
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="scoreThreshold" className="text-white/60">Minimum Score Threshold</Label>
            <Input
              id="scoreThreshold"
              type="number"
              defaultValue="50"
              min="0"
              max="100"
              className="bg-[#1a1814] border-[#3a3530] text-white mt-1"
            />
            <p className="text-xs text-white/40 mt-1">Members below this score won&apos;t appear in suggestions</p>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-[#2a2520] rounded-xl p-6 border border-[#3a3530] mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">Appearance</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white">Dark Mode</p>
            <p className="text-sm text-white/60">Use dark theme for the dashboard</p>
          </div>
          <Switch
            checked={darkMode}
            onCheckedChange={setDarkMode}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-primary text-white hover:bg-primary/90">
          Save Changes
        </Button>
      </div>
    </div>
  )
}
