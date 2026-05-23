"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { ProfileCard } from "@/components/profile-card"
import { ActionButtons } from "@/components/action-buttons"
import { ChannelsTable } from "@/components/channels-table"
import { ConfirmationModal } from "@/components/confirmation-modal"

interface User {
  firstName: string
  lastName: string
  email: string
  mobile: string
  dateOfBirth: string
  maritalStatus: string
  gender: string
  createdAt: string
}

export default function ViewWalletsPage() {
  const [userStatus, setUserStatus] = useState("Active")
  const [showModal, setShowModal] = useState(false)
  const [modalAction, setModalAction] = useState<"suspend" | "penalize" | null>(null)

  // Search states
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleActionClick = (action: "suspend" | "penalize") => {
    setModalAction(action)
    setShowModal(true)
  }

  const handleConfirm = () => {
    if (modalAction === "suspend") {
      setUserStatus("Suspended")
    } else if (modalAction === "penalize") {
      setUserStatus("Penalized")
    }
    setShowModal(false)
    setModalAction(null)
  }

  const handleCancel = () => {
    setShowModal(false)
    setModalAction(null)
  }
  

  // ✅ Dynamic search handler connected to API
  const handleSearch = async () => {
  setLoading(true)
  setError(null)
  try {
    const response = await fetch(`/api/customers?search=${encodeURIComponent(searchQuery)}`)
    if (!response.ok) throw new Error("Failed to fetch user")

    const data = await response.json()
    console.log("API response:", data)

    // Handle different possible shapes of the response
    let user: User | null = null

    if (Array.isArray(data)) {
      user = data[0] // if API returns an array
    } else if (data.details) {
      user = data.details // if API wraps user in "details"
    } else if (data.customer) {
      user = data.customer // if API wraps user in "customer"
    } else {
      user = data // plain object
    }

    if (user) {
      setSelectedUser(user)
      setUserStatus("Active")
    } else {
      throw new Error("User data incomplete")
    }
  } catch (err: any) {
    setError(err.message)
    setSelectedUser(null)
    setUserStatus("Unknown")
  } finally {
    setLoading(false)
  }
}


  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-8">
          <div className="space-y-8">
            
            {/* Search Bar */}
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users by name, email, or mobile..."
                className="flex-1 px-4 py-2 border rounded-lg"
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-primary text-white rounded-lg"
              >
                Search
              </button>
            </div>

            {/* Feedback */}
            {loading && <p>Searching...</p>}
            {error && <p className="text-red-600">Error: {error}</p>}

            {/* Profile + Actions */}
            {selectedUser && (
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                  <ProfileCard userStatus={userStatus} user={selectedUser} />
                </div>
                <div>
                  <ActionButtons onActionClick={handleActionClick} />
                </div>
              </div>
            )}

            {/* Channels Table */}
            {selectedUser && (
              <div>
                <ChannelsTable user={selectedUser} />
              </div>
            )}
          </div>
        </main>
      </div>

      {showModal && (
        <ConfirmationModal
          action={modalAction}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  )
}
