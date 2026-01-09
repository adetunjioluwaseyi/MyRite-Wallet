// "use client"

// import { useState, useEffect } from "react"
// import { Header } from "@/components/header"
// import { Sidebar } from "@/components/sidebar"

// interface JoinRequest {
  

//   name: string
//   mobile: string
//   balance: string
//   groupCode: string
//   // status: "pending" | "approved" | "declined"
// }


// export function InstantAccessGroups() {
//   const [requests, setRequests] = useState<JoinRequest[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const response = await fetch("/api/pending/instant")
//         if (!response.ok) throw new Error("Failed to fetch requests")

//         const json = await response.json()
//         console.log("API response:", json)

//         const items = Array.isArray(json.details) ? json.details : []

//         const formatted: JoinRequest[] = items.map((item: any) => ({
//           // id: item.mobile ?? "",
//           name: item.name ?? "Unknown",
//           mobile: item.mobile ?? "N/A",
//           balance: item.balance ?? "N/A",
//           groupCode: item.groupCode ?? "N/A",
          
//         }))

//         setRequests(formatted)
//       } catch (err: any) {
//         setError(err.message)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchRequests()
//   }, [])

//   // ✅ Approve action with backend call
//   const handleApprove = async (id: string) => {
//     try {
//       const response = await fetch("http://94.72.111.23:2000/myritewallet/v1/TARGET/VIEW", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ mobile: id }),
//       })
//       if (!response.ok) throw new Error("Failed to approve request")

//       // Update UI
//       setRequests((prev) =>
//         prev.map((req) => (req.mobile === id ? { ...req, status: "approved" } : req))
//       )
//     } catch (err) {
//       console.error("Approve failed:", err)
//       alert("Failed to approve request")
//     }
//   }

//   // ✅ Decline action with backend call
//   const handleDecline = async (id: string) => {
//     try {
//       const response = await fetch("http://94.72.111.23:2000/myritewallet/v1/INSTANT/VIEW", {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ mobile: id }),
//       })
//       if (!response.ok) throw new Error("Failed to decline request")

//       // Update UI
//       setRequests((prev) =>
//         prev.map((req) => (req.mobile === id ? { ...req, status: "declined" } : req))
//       )
//     } catch (err) {
//       console.error("Decline failed:", err)
//       alert("Failed to decline request")
//     }
//   }

//   if (loading) return <p className="p-6">Loading requests...</p>
//   if (error) return <p className="p-6 text-red-600">Error: {error}</p>
//   return (
//     <div className="bg-card rounded-lg border border-border p-6">
//       <h2 className="text-xl font-bold text-foreground mb-6">Instant Access Groups</h2>
      
//       <div>Table for Instant Access</div>
//       <table className="w-full">
//           <thead>
//             <tr className="border-b border-border">
//               <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">NAME</th>
//               <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">MOBILE</th>
//               <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">BALANCE</th>
//               <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">GROUPCODE</th>
              
//             </tr>
//           </thead>
//           <tbody>
//                 {requests.map((req) => (
//                   <tr key={req.mobile}>
//                     <td className="px-4 py-2 border">{req.name}</td>
//                     <td className="px-4 py-2 border">{req.mobile}</td>
//                     <td className="px-4 py-2 border">{req.balance}</td>
//                     <td className="px-4 py-2 border">{req.groupCode}</td>
          
//                     <td className="px-4 py-2 border">
                      
                     
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
          
//         </table>
//     </div>
//   )
// } 


"use client"

import { useState, useEffect } from "react"
import { InstantAccessMetrics } from "./instant-access-metrics"

interface JoinRequest {
  name: string
  mobile: string
  balance: number   // ✅ numeric
  groupCode: string
}

export function InstantAccessGroups() {
  const [requests, setRequests] = useState<JoinRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/pending/instant")
        if (!response.ok) throw new Error("Failed to fetch requests")

        const json = await response.json()
        console.log("API response:", json)

        const items = Array.isArray(json.details) ? json.details : []

        const formatted: JoinRequest[] = items.map((item: any) => {
          console.log("Raw balance from API:", item.balance, "Type:", typeof item.balance)
          return {
            name: item.name ?? "Unknown",
            mobile: item.mobile ?? "N/A",
            // ✅ safe conversion: only parse if valid number
            balance: item.balance && !isNaN(Number(item.balance)) ? Number(item.balance) : 0,
            groupCode: item.groupCode ?? "N/A",
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

  // ✅ compute total inflow
  const totalBalance = requests.reduce((sum, req) => sum + req.balance, 0)

  if (loading) return <p className="p-6">Loading requests...</p>
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-xl font-bold text-foreground mb-6">Instant Access Groups</h2>

      {/* Metrics card */}
      <InstantAccessMetrics requests={requests} />

      {/* <InstantAccessMetrics totalBalance={totalBalance} /> */}

      {/* Table */}
      <table className="w-full mt-6">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">NAME</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">MOBILE</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">BALANCE</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">GROUPCODE</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.mobile}>
              <td className="px-4 py-2 border">{req.name}</td>
              <td className="px-4 py-2 border">{req.mobile}</td>
              <td className="px-4 py-2 border">{req.balance.toLocaleString()}</td>
              <td className="px-4 py-2 border">{req.groupCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


