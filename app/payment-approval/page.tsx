"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { ChevronDown, Download, Search, Filter } from "lucide-react"

interface PaymentRecord {
  id: string
  date: string
  name: string
  walletType: string
  amount: number
  status: "Pending" | "Sent" | "Failed"
}

export default function PaymentApprovalPage() {
  const [payments, setPayments] = useState<PaymentRecord[]>([
    {
      id: "1",
      date: "5/11/2025",
      name: "Taiwo Adekola",
      walletType: "Daily savings",
      amount: 50000,
      status: "Pending",
    },
    {
      id: "2",
      date: "5/11/2025",
      name: "Kehinde Adekola",
      walletType: "Daily savings",
      amount: 100000,
      status: "Sent",
    },
    { id: "3", date: "5/11/2025", name: "James oladipo", walletType: "Daily savings", amount: 500000, status: "Sent" },
    { id: "4", date: "5/11/2025", name: "Toyo Adesola", walletType: "Daily savings", amount: 20000, status: "Failed" },
    {
      id: "5",
      date: "5/11/2025",
      name: "Damilola Olaboyo",
      walletType: "Daily savings",
      amount: 50000,
      status: "Sent",
    },
    {
      id: "6",
      date: "5/11/2025",
      name: "Taiwo Adekola",
      walletType: "Daily savings",
      amount: 50000,
      status: "Pending",
    },
    { id: "7", date: "5/11/2025", name: "Taiwo Adekola", walletType: "Daily savings", amount: 50000, status: "Failed" },
    {
      id: "8",
      date: "5/11/2025",
      name: "Taiwo Adekola",
      walletType: "Daily savings",
      amount: 50000,
      status: "Pending",
    },
  ])

  const [selectedWallet, setSelectedWallet] = useState("All Wallets")
  const [searchTerm, setSearchTerm] = useState("")

  const approvePayment = (id: string) => {
    setPayments(payments.map((payment) => (payment.id === id ? { ...payment, status: "Sent" as const } : payment)))
  }

  const approveAllPayments = () => {
    setPayments(
      payments.map((payment) => (payment.status === "Pending" ? { ...payment, status: "Sent" as const } : payment)),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Sent":
        return "bg-green-100 text-green-800"
      case "Failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-foreground">PAYMENT APPROVAL</h1>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Download size={18} />
                  <span className="text-sm font-medium">Export</span>
                </button>
              </div>
            </div>

            {/* Filters Section */}
            <div className="flex gap-4 mb-6">
              {/* Wallet Group Dropdown */}
              <div className="relative">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                  <span>{selectedWallet}</span>
                  <ChevronDown size={16} />
                </button>
              </div>

              {/* Date Filter */}
              <input
                type="date"
                defaultValue="2025-11-05"
                className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
              />

              {/* Search Bar */}
              <div className="flex-1 flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg">
                <Search size={18} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search here..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm"
                />
              </div>

              {/* Filter Button */}
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter size={18} />
                <span className="text-sm font-medium">Filter</span>
              </button>
            </div>

            {/* Table Section */}
            <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-300">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">DATE</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">NAME</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">WALLET TYPE</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">AMOUNT</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ACTION</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-3 text-sm text-gray-600">{payment.date}</td>
                      <td className="px-6 py-3 text-sm text-gray-900">{payment.name}</td>
                      <td className="px-6 py-3 text-sm text-gray-600">{payment.walletType}</td>
                      <td className="px-6 py-3 text-sm font-semibold text-gray-900">
                        {payment.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-3 text-sm">
                        {payment.status === "Pending" ? (
                          <button
                            onClick={() => approvePayment(payment.id)}
                            className="px-4 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 font-medium"
                          >
                            Approve
                          </button>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-3 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(payment.status)}`}
                        >
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Approve All Button */}
            <div className="flex justify-end mt-6">
              <button
                onClick={approveAllPayments}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold"
              >
                Approve All
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
