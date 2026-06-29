"use client"

import { useState, useEffect } from "react"
import { TargetAchieversMetrics } from "./target-achievers-metrics"

interface JoinRequest {
  targetName: string
  id: string
  name: string
  mobile: string
  salary: number   // ✅ make salary numeric
  groupCode: string
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
        const items = Array.isArray(json.details) ? json.details : []

        // const formatted: JoinRequest[] = items.map((item: any) => ({
        //   id: item.mobile ?? "",
        //   name: item.name ?? "Unknown",
        //   mobile: item.mobile ?? "N/A",
        //   salary: Number(item.salary) || 0,   // ✅ convert to number
        //   groupCode: item.groupCode ?? "N/A",
        //   targetName: item.targetName ?? "N/A",
        // }))

        const formatted: JoinRequest[] = items.map((item: any) => {
  // Log the raw salary value from the API
  console.log("Raw salary from API:", item.salary, "Type:", typeof item.salary)

  return {
    id: item.mobile ?? "",
    name: item.name ?? "Unknown",
    mobile: item.mobile ?? "N/A",
    // Convert safely: only parse if it's a valid number string
    salary: item.salary && !isNaN(Number(item.salary)) ? Number(item.salary) : 0,
    groupCode: item.groupCode ?? "N/A",
    targetName: item.targetName ?? "N/A",
  }
})


        setRequests(formatted)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
  }, [])

  const totalBalance = requests.reduce((sum, req) => sum + req.salary, 0)

  if (loading) return <p className="p-6">Loading requests...</p>
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-xl font-bold text-foreground mb-6">Target Achievers Groups</h2>

      {/* Metrics card */}
      {/* <TargetAchieversMetrics totalBalance={totalBalance} /> */}

      {/* Table */}
      <table className="w-full mt-6">
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
              <td className="px-4 py-2 border">{req.salary.toLocaleString()}</td>
              <td className="px-4 py-2 border">{req.groupCode}</td>
              <td className="px-4 py-2 border">{req.targetName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
