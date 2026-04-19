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
    <div className="p-8 max-w-3xl">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-[#3d3530] mb-6">Settings</h1>

      {/* Profile Settings */}
      <div className="bg-[#faf7f4] rounded-2xl p-6 border border-[#e8e0d5]/50 shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-[#3d3530] mb-4">Profile</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-[#6b5f54]">First Name</Label>
              <Input
                id="firstName"
                defaultValue="John"
                className="bg-[#f5f0ea] border-[#ddd5cc] text-[#3d3530] mt-1.5 rounded-lg"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-[#6b5f54]">Last Name</Label>
              <Input
                id="lastName"
                defaultValue="Smith"
                className="bg-[#f5f0ea] border-[#ddd5cc] text-[#3d3530] mt-1.5 rounded-lg"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="email" className="text-[#6b5f54]">Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue="john.smith@creditunion.com"
              className="bg-[#f5f0ea] border-[#ddd5cc] text-[#3d3530] mt-1.5 rounded-lg"
            />
          </div>
          <div>
            <Label htmlFor="branch" className="text-[#6b5f54]">Branch</Label>
            <Select defaultValue="downtown">
              <SelectTrigger className="bg-[#f5f0ea] border-[#ddd5cc] text-[#3d3530] mt-1.5 rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#faf7f4] border-[#ddd5cc] shadow-lg">
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
      <div className="bg-[#faf7f4] rounded-2xl p-6 border border-[#e8e0d5]/50 shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-[#3d3530] mb-4">Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#3d3530] font-medium">Email Notifications</p>
              <p className="text-sm text-[#6b5f54]">Receive email alerts for new high-score members</p>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#3d3530] font-medium">Push Notifications</p>
              <p className="text-sm text-[#6b5f54]">Get browser notifications for urgent updates</p>
            </div>
            <Switch
              checked={pushNotifications}
              onCheckedChange={setPushNotifications}
            />
          </div>
        </div>
      </div>

      {/* AI Settings */}
      <div className="bg-[#faf7f4] rounded-2xl p-6 border border-[#e8e0d5]/50 shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-[#3d3530] mb-4">AI Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#3d3530] font-medium">Auto-generate Scripts</p>
              <p className="text-sm text-[#6b5f54]">Automatically prepare outreach scripts for top members</p>
            </div>
            <Switch
              checked={autoGenerateScripts}
              onCheckedChange={setAutoGenerateScripts}
            />
          </div>
          <div>
            <Label htmlFor="tone" className="text-[#6b5f54]">Default Script Tone</Label>
            <Select defaultValue="professional">
              <SelectTrigger className="bg-[#f5f0ea] border-[#ddd5cc] text-[#3d3530] mt-1.5 rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#faf7f4] border-[#ddd5cc] shadow-lg">
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="scoreThreshold" className="text-[#6b5f54]">Minimum Score Threshold</Label>
            <Input
              id="scoreThreshold"
              type="number"
              defaultValue="50"
              min="0"
              max="100"
              className="bg-[#f5f0ea] border-[#ddd5cc] text-[#3d3530] mt-1.5 rounded-lg"
            />
            <p className="text-xs text-[#a09588] mt-1.5">Members below this score won&apos;t appear in suggestions</p>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-[#faf7f4] rounded-2xl p-6 border border-[#e8e0d5]/50 shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-[#3d3530] mb-4">Appearance</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#3d3530] font-medium">Dark Mode</p>
            <p className="text-sm text-[#6b5f54]">Use dark theme for the dashboard</p>
          </div>
          <Switch
            checked={darkMode}
            onCheckedChange={setDarkMode}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-primary text-white hover:bg-primary/90 shadow-sm">
          Save Changes
        </Button>
      </div>
    </div>
  )
}
