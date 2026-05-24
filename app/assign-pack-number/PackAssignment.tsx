"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";

interface Contributor {
  requestId: string;
  mobile: string;
  name: string;
  groupId: string;
  groupName: string;
  position: string;
  packNo?: string;
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

export default function AssignPackNumberPage() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedGroupName, setSelectedGroupName] = useState("");

  // Step 1: Fetch groups
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

  // Step 2: Fetch contributors when a group name is selected
  useEffect(() => {
    if (!selectedGroupName) {
      setContributors([]);
      return;
    }

    const fetchContributors = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/contributors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ groupName: selectedGroupName }),
        });

        const data = await safeJson(res);
        const items = Array.isArray(data) ? data : data.details || [];

        const formatted: Contributor[] = items.map((item: any) => ({
          requestId: item.groupId ?? `${item.mobile}-${Date.now()}`,
          mobile: item.mobile ?? "",
          name: item.name ?? "Unknown",
          groupId: item.groupId ?? "",
          groupName: item.groupName ?? selectedGroupName,
          position: item.position ?? "",
          packNo: item.packNo ?? "",
        }));

        setContributors(formatted);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to fetch contributors";
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    fetchContributors();
  }, [selectedGroupName]);

  const assignPackNo = (requestId: string, packNo: string) => {
    setContributors(prev =>
      prev.map(c => (c.requestId === requestId ? { ...c, packNo } : c))
    );
  };

  const handleSave = async () => {
    try {
      // 1. Check uniqueness
      const packNos = contributors.map(c => c.packNo).filter(Boolean);
      const duplicates = packNos.filter((p, i) => packNos.indexOf(p) !== i);
      if (duplicates.length > 0) {
        alert(`Duplicate pack numbers found: ${duplicates.join(", ")}`);
        return;
      }

      // 2. Assign each contributor
      for (const c of contributors) {
        if (!c.packNo) continue; // skip if no pack number assigned

        const response = await fetch("/api/packnumber", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            groupId: c.groupId,
            position: c.position,
            groupName: c.groupName,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to assign pack number for ${c.name}`);
        }
      }

      alert("Pack numbers assigned successfully!");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error assigning pack numbers";
      alert(message);
    }
  };

  if (loading) return <p className="p-6">Loading contributors...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  const groupNames = Array.from(new Set(groups.map(g => g.groupName))).filter(
    Boolean
  );

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-xl font-bold mb-4">Assign Pack Numbers</h1>

            {/* GroupName Dropdown */}
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">Group Name</label>
              <select
                value={selectedGroupName}
                onChange={e => setSelectedGroupName(e.target.value)}
                className="border px-2 py-1 rounded min-w-[200px]"
              >
                <option value="">Select Group</option>
                {groupNames.map(name => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            {/* Contributors Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border">Pack No.</th>
                    <th className="px-4 py-2 border">Name</th>
                    <th className="px-4 py-2 border">Mobile</th>
                    <th className="px-4 py-2 border">Group ID</th>
                    <th className="px-4 py-2 border">Group Name</th>
                    <th className="px-4 py-2 border">Position</th>
                    <th className="px-4 py-2 border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contributors.length > 0 ? (
                    contributors.map(c => (
                      <tr key={c.requestId}>
                        <td className="px-4 py-2 border">{c.packNo ?? "-"}</td>
                        <td className="px-4 py-2 border">{c.name}</td>
                        <td className="px-4 py-2 border">{c.mobile}</td>
                        <td className="px-4 py-2 border">{c.groupId}</td>
                        <td className="px-4 py-2 border">{c.groupName}</td>
                        <td className="px-4 py-2 border">{c.position}</td>
                        <td className="px-4 py-2 border">
                          <button
                            onClick={() => {
                              const newPackNo = prompt(
                                `Assign Pack No for ${c.name}:`,
                                c.packNo ?? ""
                              );
                              if (newPackNo !== null) {
                                assignPackNo(c.requestId, newPackNo);
                              }
                            }}
                            className="px-2 py-1 bg-blue-500 text-white rounded"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-2 border text-center text-gray-500"
                      >
                        No records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-4">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Save Pack Numbers
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
