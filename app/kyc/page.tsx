"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

interface JoinRequest {
  nokFirstName: string
  nokLastName: string
  mobile: string
  nokEmail: string
  idNumber: string
  nokAddress: string
  employmentStatus: string
  address: string
  city: string
  state: string
  country: string
  kycStatus: string
}

export default function Kyc() {
  const [requests, setRequests] = useState<JoinRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/kyc")
        if (!response.ok) throw new Error("Failed to fetch requests")

        const json = await response.json()
        const items = Array.isArray(json.details) ? json.details : []

        const formatted: JoinRequest[] = items.map((item: any) => ({
          nokFirstName: item.nokFirstName ?? "",
          nokLastName: item.nokLastName ?? "",
          mobile: item.mobile ?? "",
          nokEmail: item.nokEmail ?? "",
          idNumber: item.idNumber ?? "",
          nokAddress: item.nokAddress ?? "",
          employmentStatus: item.employmentStatus ?? "",
          address: item.address ?? "",
          city: item.city ?? "",
          state: item.state ?? "",
          country: item.country ?? "",
          kycStatus: item.kycStatus ?? "",
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

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(
        `http://94.72.111.23:2000/myritewallet/v1/KYC/APPROVE`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mobile: id,
            status: "approved",
            approvedBy: "admin",
          }),
        }
      )

      if (!response.ok) throw new Error("Failed to approve request")

      setRequests((prev) =>
        prev.map((req) =>
          req.mobile === id ? { ...req, kycStatus: "approved" } : req
        )
      )
    } catch (err) {
      console.error("Approve failed:", err)
      alert("Failed to approve request")
    }
  }

  const handleDecline = async (id: string) => {
    try {
      const response = await fetch(
        `http://94.72.111.23:2000/myritewallet/v1/KYC/DECLINE`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile: id }),
        }
      )

      if (!response.ok) throw new Error("Failed to decline request")

      setRequests((prev) =>
        prev.map((req) =>
          req.mobile === id ? { ...req, kycStatus: "declined" } : req
        )
      )
    } catch (err) {
      console.error("Decline failed:", err)
      alert("Failed to decline request")
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
            <h1 className="text-xl font-bold mb-4">KYC LISTS</h1>
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">FirstName</th>
                  <th className="px-4 py-2 border">LastName</th>
                  <th className="px-4 py-2 border">Mobile</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Id Number</th>
                  <th className="px-4 py-2 border">Address</th>
                  <th className="px-4 py-2 border">Employment Status</th>
                  <th className="px-4 py-2 border">Address_abv</th>
                  <th className="px-4 py-2 border">City</th>
                  <th className="px-4 py-2 border">State</th>
                  <th className="px-4 py-2 border">Country</th>
                  <th className="px-4 py-2 border">KYC Status</th>
                  
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.mobile}>
                    <td className="px-4 py-2 border">{req.nokFirstName}</td>
                    <td className="px-4 py-2 border">{req.nokLastName}</td>
                    <td className="px-4 py-2 border">{req.mobile}</td>
                    <td className="px-4 py-2 border">{req.nokEmail}</td>
                    <td className="px-4 py-2 border">{req.idNumber}</td>
                    <td className="px-4 py-2 border">{req.address}</td>
                    <td className="px-4 py-2 border">{req.employmentStatus}</td>
                    <td className="px-4 py-2 border">{req.nokAddress}</td>
                    <td className="px-4 py-2 border">{req.city}</td>
                    <td className="px-4 py-2 border">{req.state}</td>
                    <td className="px-4 py-2 border">{req.country}</td>
                    <td className="px-4 py-2 border">{req.kycStatus}</td>
                    <td className="px-4 py-2 border space-x-2">
                      {req.kycStatus === "pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(req.mobile)}
                            className="px-3 py-1 bg-green-500 text-white rounded"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleDecline(req.mobile)}
                            className="px-3 py-1 bg-red-500 text-white rounded"
                          >
                            Decline
                          </button>
                        </>
                      )}
                      {req.kycStatus === "approved" && (
                        <span className="text-green-600 font-semibold">
                          ✔ Approved
                        </span>
                      )}
                      {req.kycStatus === "declined" && (
                        <span className="text-red-600 font-semibold">
                          ✘ Declined
                        </span>
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
