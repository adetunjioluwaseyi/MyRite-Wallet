"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { ProfileCard } from "@/components/profile-card"
import { ActionButtons } from "@/components/action-buttons"
import { ChannelsTable } from "@/components/channels-table"
import { ConfirmationModal } from "@/components/confirmation-modal"

export default function ViewWalletsPage() {
  const [userStatus, setUserStatus] = useState("Active")
  const [showModal, setShowModal] = useState(false)
  const [modalAction, setModalAction] = useState<"suspend" | "penalize" | null>(null)

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

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-8">
          <div className="space-y-8">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2">
                <ProfileCard userStatus={userStatus} />
              </div>
              <div>
                <ActionButtons onActionClick={handleActionClick} />
              </div>
            </div>

            <div>
              <ChannelsTable />
            </div>
          </div>
        </main>
      </div>

      {showModal && <ConfirmationModal action={modalAction} onConfirm={handleConfirm} onCancel={handleCancel} />}
    </div>
  )
}
