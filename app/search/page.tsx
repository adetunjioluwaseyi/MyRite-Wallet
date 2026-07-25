"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"

 type Record = Record<string, unknown>

interface ApiConfig {
  name: string
  endpoint: string
  dataPath?: string
}

const APIs: ApiConfig[] = [
  { name: "Groups", endpoint: "/api/groups", dataPath: "data" },
  { name: "Users", endpoint: "/api/users", dataPath: "data" },
  { name: "Wealth Rotation", endpoint: "/api/wealth-rotation", dataPath: "data" },
  { name: "Transactions", endpoint: "/api/transactions", dataPath: "data" },
]

async function fetchApiData(config: ApiConfig): Promise<Record[]> {
  try {
    const response = await fetch(config.endpoint)
    if (!response.ok) return []

    const json = await response.json()
    const data = config.dataPath ? json[config.dataPath] : json

    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = (searchParams.get("q") ?? "").trim().toLowerCase()

  const [allRecords, setAllRecords] = useState<Record[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true)
      const results: Record[] = []

      for (const api of APIs) {
        const data = await fetchApiData(api)
        results.push(...data)
      }

      setAllRecords(results)
      setLoading(false)
    }

    loadAllData()
  }, [])

  const filteredRecords = useMemo(() => {
    if (!query || allRecords.length === 0) return allRecords

    return allRecords.filter((record) => {
      const searchableText = Object.values(record)
        .map((value) => String(value ?? ""))
        .join(" ")
        .toLowerCase()

      return searchableText.includes(query)
    })
  }, [query, allRecords])

  const columns = useMemo(() => {
    const firstRecord = filteredRecords[0] || allRecords[0]
    if (!firstRecord) return []

    return Object.keys(firstRecord)
  }, [filteredRecords, allRecords])

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Searching...</h1>
        <p className="text-muted-foreground">Loading data from all sources</p>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Search results</h1>
        <p className="text-muted-foreground">
          {query
            ? `Found ${filteredRecords.length} record(s) matching "${query}"`
            : `Showing all ${allRecords.length} records`}
        </p>
      </div>

      {filteredRecords.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                {columns.map((column) => (
                  <th key={column} className="px-4 py-3 text-left font-medium capitalize">
                    {column.replace(/([A-Z])/g, " $1")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record, index) => (
                <tr key={index} className="border-t border-border hover:bg-muted/50">
                  {columns.map((column) => (
                    <td key={column} className="px-4 py-3 text-sm">
                      {String(record[column] ?? "")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">
          No records matched your search {query && `for "${query}"`}.
        </div>
      )}
    </div>
  )
}