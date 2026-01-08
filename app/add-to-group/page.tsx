"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

interface JoinRequest {
  requestId: string
  mobile: string
  name: string
  salary: string
  groupCode: string
  groupMode: string
  paymentInterval: string
  duration: string
  amount: string
  cashout: string
  status: "pending" | "approved" | "declined"
  createdAt?: string
}

function rowClass(groupMode: string, status: string): string {
  const mode = (groupMode || "").toLowerCase()
  if (status === "approved") return "bg-green-100"
  if (status === "declined") return "bg-red-100"
  if (mode === "wealth") return "bg-purple-50"
  if (mode === "flexible") return "bg-blue-50"
  if (mode === "instant") return "bg-green-50"
  if (mode === "target") return "bg-yellow-50"
  if (mode === "daily") return "bg-pink-50"
  if (mode === "weekly") return "bg-indigo-50"
  if (mode === "monthly") return "bg-orange-50"
  return ""
}

export default function AddToGroupPage() {
  const [requests, setRequests] = useState<JoinRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const safeJson = async (res: Response) => {
    const text = await res.text()
    try {
      return text ? JSON.parse(text) : {}
    } catch {
      return {}
    }
  }

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const [wealth] = await Promise.all([
          fetch("/api/pending/wealth").then(safeJson),
        //   fetch("/api/pending/target").then(safeJson),
        //   fetch("/api/pending/instant").then(safeJson),
        //   fetch("/api/pending/flexible").then(safeJson),
        ])

        const allItems = [
          ...(wealth.details || []),
        //   ...(target.details || []),
        //   ...(instant.details || []),
        //   ...(flexible.details || []),
        ]

        const formatted: JoinRequest[] = allItems.map((item: any) => ({
          requestId: item.requestID ?? `${item.mobile}-${Date.now()}`,
          mobile: item.mobile ?? "",
          name: item.name ?? "Unknown",
          salary: item.salary ?? "N/A",
          groupCode: item.groupCode ?? "UNKNOWN",
          groupMode: item.groupMode ?? "N/A",
          paymentInterval: item.paymentInterval ?? "N/A",
          duration: item.duration ?? "N/A",
          amount: item.amount ?? "N/A",
          cashout: item.cashout ?? "N/A",
          status: "pending",
          createdAt: item.createdAt ?? "",
        }))

        setRequests(formatted)
      } catch (err: any) {
        setError(err?.message ?? "Failed to fetch requests")
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
  }, [])

  // Approve via proxy (send all fields)
  const handleApprove = async (req: JoinRequest) => {
  try {
    const payload = {
      mobile: req.mobile,
      groupCode: req.groupCode,
      requestId: req.requestId,   // use lowercase "Id"
      status: "approved",
      approvedBy: "admin",
      approvedOn: new Date().toISOString(),
    }

    console.log("Approve payload:", payload)

    const response = await fetch("/api/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const text = await response.text()
      console.error("Approve failed response:", response.status, text)
      throw new Error(text || "Failed to approve request")
    }

    setRequests(prev =>
      prev.map(r => r.requestId === req.requestId ? { ...r, status: "approved" } : r)
    )

    // Redirect logic
    switch ((req.groupMode || "").toLowerCase()) {
      case "wealth":
        router.push("/wealth-rotation/overview")
        break
      case "daily":
        router.push("/wealth-rotation/daily")
        break
      case "weekly":
        router.push("/wealth-rotation/weekly")
        break
      case "monthly":
        router.push("/wealth-rotation/monthly")
        break
      default:
        console.warn("Unknown groupMode, no redirect performed")
        break
    }
  } catch (err: any) {
    console.error("Approve failed:", err)
    alert("Failed to approve request: " + (err?.message || "network error"))
  }
}


  // Decline via proxy (send all fields)
  const handleDecline = async (req: JoinRequest) => {
  try {
    const payload = {
      mobile: req.mobile,
      groupCode: req.groupCode,
      requestId: req.requestId,
      status: "declined",
      approvedBy: "admin", // or declinedBy if backend expects that
      approvedOn: new Date().toISOString(),
    }

    console.log("Decline payload:", payload)

    const response = await fetch("/api/decline", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const text = await response.text()
      console.error("Decline failed response:", response.status, text)
      throw new Error(text || "Failed to decline request")
    }

    setRequests(prev =>
      prev.map(r => r.requestId === req.requestId ? { ...r, status: "declined" } : r)
    )
  } catch (err: any) {
    console.error("Decline failed:", err)
    alert("Failed to decline request: " + (err?.message || "network error"))
  }
}


  if (loading) return <p className="p-6">Loading requests...</p>
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-xl font-bold mb-4">Pending Requests</h1>
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Request ID</th>
                  <th className="px-4 py-2 border">Mobile</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Salary</th>
                  <th className="px-4 py-2 border">Group Code</th>
                  <th className="px-4 py-2 border">Group Mode</th>
                  <th className="px-4 py-2 border">Payment Interval</th>
                  <th className="px-4 py-2 border">Duration</th>
                  <th className="px-4 py-2 border">Amount</th>
                  <th className="px-4 py-2 border">Cashout</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
  {requests.map((req, index) => (
    <tr
      key={`${req.mobile}-${req.groupCode}-${index}`}
      className={rowClass(req.groupMode, req.status)}
    >
      <td className="px-4 py-2 border">{req.requestId}</td>
      <td className="px-4 py-2 border">{req.mobile}</td>
      <td className="px-4 py-2 border">{req.name}</td>
      <td className="px-4 py-2 border">{req.salary}</td>
      <td className="px-4 py-2 border">{req.groupCode}</td>
      <td className="px-4 py-2 border">{req.groupMode}</td>
      <td className="px-4 py-2 border">{req.paymentInterval}</td>
      <td className="px-4 py-2 border">{req.duration}</td>
      <td className="px-4 py-2 border">{req.amount}</td>
      <td className="px-4 py-2 border">{req.cashout}</td>
      <td className="px-4 py-2 border">{req.status}</td>
      <td className="px-4 py-2 border space-x-2">
        {req.status === "pending" && (
          <>
            <button
              onClick={() => handleApprove(req)}
              className="px-3 py-1 bg-green-500 text-white rounded"
            >
              Approve
            </button>
            <button
              onClick={() => handleDecline(req)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Decline
            </button>
          </>
        )}
        {req.status === "approved" && (
          <span className="text-green-600 font-semibold">✔ Approved</span>
        )}
        {req.status === "declined" && (
          <span className="text-red-600 font-semibold">✘ Declined</span>
        )}
      </td>
    </tr>
  ))}
    </tbody>
    </table>
    </div>
    </main>
    </div>
    </div>
    )
}
