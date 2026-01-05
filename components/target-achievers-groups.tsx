"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

interface JoinRequest {
  targetName: string
  id: string
  name: string
  mobile: string
  salary: string
  groupCode: string
  // status: "pending" | "approved" | "declined"
}


export function TargetAchieversGroups() {
  const [requests, setRequests] = useState<JoinRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/pending/target")
        if (!response.ok) throw new Error("Failed to fetch requests")

        const json = await response.json()
        console.log("API response:", json)

        const items = Array.isArray(json.details) ? json.details : []

        const formatted: JoinRequest[] = items.map((item: any) => ({
          id: item.mobile ?? "",
          name: item.name ?? "Unknown",
          mobile: item.mobile ?? "N/A",
          salary: item.salary ?? "N/A",
          groupCode: item.groupCode ?? "N/A",
          targetName: item.targetName ?? "N/A",
        }))

        setRequests(formatted)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
  }, [])

  // ✅ Approve action with backend call
  const handleApprove = async (id: string) => {
    try {
      const response = await fetch("http://94.72.111.23:2000/myritewallet/v1/TARGET/VIEW", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: id }),
      })
      if (!response.ok) throw new Error("Failed to approve request")

      // Update UI
      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status: "approved" } : req))
      )
    } catch (err) {
      console.error("Approve failed:", err)
      alert("Failed to approve request")
    }
  }

  // ✅ Decline action with backend call
  const handleDecline = async (id: string) => {
    try {
      const response = await fetch("http://94.72.111.23:2000/myritewallet/v1/TARGET/VIEW", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: id }),
      })
      if (!response.ok) throw new Error("Failed to decline request")

      // Update UI
      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status: "declined" } : req))
      )
    } catch (err) {
      console.error("Decline failed:", err)
      alert("Failed to decline request")
    }
  }

  if (loading) return <p className="p-6">Loading requests...</p>
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-xl font-bold text-foreground mb-6">Target Achievers Groups</h2>
      
      <div>Table for Target Achievers</div>
      <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">NAME</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">MOBILE</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">SALARY</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">GROUPCODE</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">TARGETNAME</th>
            </tr>
          </thead>
          <tbody>
                {requests.map((req) => (
                  <tr key={req.id}>
                    <td className="px-4 py-2 border">{req.name}</td>
                    <td className="px-4 py-2 border">{req.mobile}</td>
                    <td className="px-4 py-2 border">{req.salary}</td>
                    <td className="px-4 py-2 border">{req.groupCode}</td>
                    <td className="px-4 py-2 border">{req.targetName}</td>
                    <td className="px-4 py-2 border">
                      
                     
                    </td>
                  </tr>
                ))}
              </tbody>
          
        </table>
    </div>
  )
} 


