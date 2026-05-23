"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

interface Contributor {
  requestId: string
  mobile: string
  name: string
  groupCode: string
  groupMode: string
  paymentInterval: string
  duration: string
  amount: string
  cashout: string
  packNo?: string
}

export default function AssignPackNumberPage() {
  const [contributors, setContributors] = useState<Contributor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedGroupMode, setSelectedGroupMode] = useState("")
  const [selectedGroupCode, setSelectedGroupCode] = useState("")

  const safeJson = async (res: Response) => {
    const text = await res.text()
    try {
      return text ? JSON.parse(text) : {}
    } catch {
      console.error("Invalid JSON response:", text)
      return {}
    }
  }

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const data = await fetch("/api/contributors").then(safeJson)
        const formatted: Contributor[] = (data.details || []).map((item: any) => ({
          requestId: item.requestID ?? `${item.mobile}-${Date.now()}`,
          mobile: item.mobile ?? "",
          name: item.name ?? "Unknown",
          groupCode: item.groupCode ?? "UNKNOWN",
          groupMode: item.groupMode ?? "N/A",
          paymentInterval: item.paymentInterval ?? "N/A",
          duration: item.duration ?? "N/A",
          amount: item.amount ?? "N/A",
          cashout: item.cashout ?? "N/A",
          packNo: item.packNo ?? "",
        }))
        setContributors(formatted)
      } catch (err: any) {
        setError(err?.message ?? "Failed to fetch contributors")
      } finally {
        setLoading(false)
      }
    }
    fetchContributors()
  }, [])

  const filteredContributors = contributors.filter(item => {
    return (
      (selectedGroupMode ? item.groupMode === selectedGroupMode : true) &&
      (selectedGroupCode ? item.groupCode === selectedGroupCode : true)
    )
  })

  const assignPackNo = (requestId: string, packNo: string) => {
    setContributors(prev =>
      prev.map(c =>
        c.requestId === requestId ? { ...c, packNo } : c
      )
    )
  }

  const handleSave = async () => {
    try {
      const payload = filteredContributors.map(c => ({
        requestId: c.requestId,
        mobile: c.mobile,
        groupCode: c.groupCode,
        groupMode: c.groupMode,
        packNo: c.packNo,
        assignedBy: "admin",
        assignedOn: new Date().toISOString(),
      }))

      const response = await fetch("/api/assign-pack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const text = await response.text()
        throw new Error(text || "Failed to save pack numbers")
      }

      alert("Pack numbers saved successfully!")
    } catch (err: any) {
      alert("Error saving pack numbers: " + (err?.message || "network error"))
    }
  }

  if (loading) return <p className="p-6">Loading contributors...</p>
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-xl font-bold mb-4">Assign Pack Numbers</h1>

            {/* Filters */}
            <div className="mb-4 flex space-x-4">
              <select
                value={selectedGroupMode}
                onChange={e => setSelectedGroupMode(e.target.value)}
                className="border px-2 py-1"
              >
                <option value="">All Modes</option>
                {[...new Set(contributors.map(c => c.groupMode))].map(mode => (
                  <option key={mode} value={mode}>{mode}</option>
                ))}
              </select>

              <select
                value={selectedGroupCode}
                onChange={e => setSelectedGroupCode(e.target.value)}
                className="border px-2 py-1"
              >
                <option value="">All Codes</option>
                {[...new Set(contributors.map(c => c.groupCode))].map(code => (
                  <option key={code} value={code}>{code}</option>
                ))}
              </select>
            </div>

            {/* Table */}
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Pack No.</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Mobile</th>
                  <th className="px-4 py-2 border">Group Mode</th>
                  <th className="px-4 py-2 border">Group Code</th>
                  <th className="px-4 py-2 border">Amount</th>
                  <th className="px-4 py-2 border">Cashout</th>
                </tr>
              </thead>
              <tbody>
                {filteredContributors.map(c => (
                  <tr key={c.requestId}>
                    <td className="px-4 py-2 border">
                      <input
                        type="number"
                        value={c.packNo || ""}
                        onChange={e => assignPackNo(c.requestId, e.target.value)}
                        className="border px-2 py-1 w-20"
                      />
                    </td>
                    <td className="px-4 py-2 border">{c.name}</td>
                    <td className="px-4 py-2 border">{c.mobile}</td>
                    <td className="px-4 py-2 border">{c.groupMode}</td>
                    <td className="px-4 py-2 border">{c.groupCode}</td>
                    <td className="px-4 py-2 border">{c.amount}</td>
                    <td className="px-4 py-2 border">{c.cashout}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              onClick={handleSave}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save Pack Numbers
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}
