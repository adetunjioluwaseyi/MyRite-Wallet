"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Search, Plus } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  status: string
}

interface Group {
  id: string
  name: string
  type: string
  members: number
  selected?: boolean
}

export default function AddToGroupPage() {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [selectedGroups, setSelectedGroups] = useState<string[]>([])
  const [searchUser, setSearchUser] = useState("")
  const [searchGroup, setSearchGroup] = useState("")

  const users: User[] = [
    { id: "1", name: "Taiwo Adekola", email: "taiwo@example.com", status: "Active" },
    { id: "2", name: "Kehinde Adekola", email: "kehinde@example.com", status: "Active" },
    { id: "3", name: "James Oladipo", email: "james@example.com", status: "Active" },
    { id: "4", name: "Toyo Adesola", email: "toyo@example.com", status: "Suspended" },
    { id: "5", name: "Damilola Olaboyo", email: "damilola@example.com", status: "Active" },
  ]

  const groups: Group[] = [
    { id: "1", name: "Daily Savings", type: "Wealth Rotation", members: 45 },
    { id: "2", name: "Weekly Savings", type: "Wealth Rotation", members: 32 },
    { id: "3", name: "Flex Me", type: "SaveCave", members: 28 },
    { id: "4", name: "Target Achievers", type: "SaveCave", members: 56 },
    { id: "5", name: "Instant Access", type: "SaveCave", members: 41 },
  ]

  const filteredUsers = users.filter((u) => u.name.toLowerCase().includes(searchUser.toLowerCase()))
  const filteredGroups = groups.filter((g) => g.name.toLowerCase().includes(searchGroup.toLowerCase()))

  const toggleUser = (id: string) => {
    setSelectedUsers((prev) => (prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id]))
  }

  const toggleGroup = (id: string) => {
    setSelectedGroups((prev) => (prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]))
  }

  const handleAddToGroup = () => {
    if (selectedUsers.length > 0 && selectedGroups.length > 0) {
      console.log("[v0] Adding users to groups:", { users: selectedUsers, groups: selectedGroups })
      setSelectedUsers([])
      setSelectedGroups([])
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-8">Add Users to Group</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Users Selection */}
              <div className="bg-card rounded-lg border border-border p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Select Users</h2>

                <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg mb-4 border border-border">
                  <Search size={18} className="text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchUser}
                    onChange={(e) => setSearchUser(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm"
                  />
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg cursor-pointer"
                      onClick={() => toggleUser(user.id)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleUser(user.id)}
                        className="w-4 h-4 accent-primary"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${user.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                      >
                        {user.status}
                      </span>
                    </div>
                  ))}
                </div>

                {selectedUsers.length > 0 && (
                  <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm font-medium text-primary">{selectedUsers.length} user(s) selected</p>
                  </div>
                )}
              </div>

              {/* Groups Selection */}
              <div className="bg-card rounded-lg border border-border p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Select Groups</h2>

                <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg mb-4 border border-border">
                  <Search size={18} className="text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search groups..."
                    value={searchGroup}
                    onChange={(e) => setSearchGroup(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm"
                  />
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredGroups.map((group) => (
                    <div
                      key={group.id}
                      className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg cursor-pointer"
                      onClick={() => toggleGroup(group.id)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedGroups.includes(group.id)}
                        onChange={() => toggleGroup(group.id)}
                        className="w-4 h-4 accent-primary"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm text-foreground">{group.name}</p>
                        <p className="text-xs text-muted-foreground">{group.type}</p>
                      </div>
                      <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                        {group.members} members
                      </span>
                    </div>
                  ))}
                </div>

                {selectedGroups.length > 0 && (
                  <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm font-medium text-primary">{selectedGroups.length} group(s) selected</p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8 justify-end">
              <button className="px-6 py-2 border border-border rounded-lg text-foreground font-medium hover:bg-muted">
                Cancel
              </button>
              <button
                onClick={handleAddToGroup}
                disabled={selectedUsers.length === 0 || selectedGroups.length === 0}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Plus size={18} />
                Add to Group
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
