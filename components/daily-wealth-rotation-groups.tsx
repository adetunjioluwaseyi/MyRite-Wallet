"use client";

import { useState, useEffect } from "react";

interface UnifiedRow {
  groupName: string;
  groupCode: string;
  name: string;
  mobile: string;
  // balance: string;
  collectionDate: string;
  // duration: string;
  groupId: string;
  position: string;
}

interface Group {
  groupName: string;
  groupCode: string;
}

const safeJson = async (res: Response) => {
  const text = await res.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Server did not return valid JSON");
  }
};

export default function DailyWealthRotationGroups() {
  const [rows, setRows] = useState<UnifiedRow[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroupName, setSelectedGroupName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Step 1: Fetch groups for dropdown
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await fetch("/api/groups");
        const data = await safeJson(res);

        const formatted: Group[] = (data.details || []).map((item: any) => ({
          groupName: item.grouptag ?? "",
          groupCode: item.groupCode ?? "",
        }));

        setGroups(formatted);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to fetch groups";
        setError(message);
      }
    };
    fetchGroups();
  }, []);

  // Step 2: Unified fetch depending on selectedGroupName
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        let response;
        if (!selectedGroupName) {
          // All groups → GET
          response = await fetch("/api/pending/daily", { method: "GET" });
        } else {
          // Specific group → POST WITH-SLOT
          response = await fetch(
              "/api/slot",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ groupName: selectedGroupName }),
            }
          );
        }

        if (!response.ok) throw new Error("Failed to fetch requests");
        const json = await response.json();
        const items = Array.isArray(json.details) ? json.details : [];

        const formatted: UnifiedRow[] = items.map((item: any) => ({
          groupName: item.groupName ?? selectedGroupName ?? "N/A",
          groupCode: item.groupCode ?? "N/A",
          name: item.name ?? "N/A",
          mobile: item.mobile ?? "N/A",
          // balance: item.balance ?? "N/A",
          collectionDate: item.collectionDate ?? "N/A",
          // duration: item.duration ?? "N/A",
          groupId: item.groupId ?? "N/A",
          position: item.position ?? "N/A",
        }));

        setRows(formatted);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [selectedGroupName]); // runs both when selecting and clearing

  if (loading) return <p className="p-6">Loading requests...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-xl font-bold text-foreground mb-6">
        Daily Wealth Rotation Groups
      </h2>

      {/* GroupName Dropdown */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Group Name</label>
        <select
          value={selectedGroupName}
          onChange={e => setSelectedGroupName(e.target.value)}
          className="border px-2 py-1 rounded min-w-[200px]"
        >
          <option value="">All Groups</option>
          {groups.map(g => (
            <option key={g.groupCode} value={g.groupName}>
              {g.groupName}
            </option>
          ))}
        </select>
      </div>

      {/* Unified Table */}
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4">NAME</th>
            <th className="text-left py-3 px-4">MOBILE</th>
            <th className="text-left py-3 px-4">COLLECTION Date</th>
            {/* <th className="text-left py-3 px-4">DURATION</th> */}
            <th className="text-left py-3 px-4">GROUPCODE</th>
            <th className="text-left py-3 px-4">GROUPNAME</th>
            <th className="text-left py-3 px-4">GROUPID</th>
            <th className="text-left py-3 px-4">POSITION</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((req, idx) => (
            <tr key={idx}>
              <td className="px-4 py-2 border">{req.name}</td>
              <td className="px-4 py-2 border">{req.mobile}</td>
              <td className="px-4 py-2 border">{req.collectionDate}</td>
              {/* <td className="px-4 py-2 border">{req.duration}</td> */}
              <td className="px-4 py-2 border">{req.groupCode}</td>
              <td className="px-4 py-2 border">{req.groupName}</td>
              <td className="px-4 py-2 border">{req.groupId}</td>
              <td className="px-4 py-2 border">{req.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
