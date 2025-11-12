import { useEffect, useState } from "react";
import { Database } from "../types/supabase";
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [giftFilter, setGiftFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortField, setSortField] = useState("created_at");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, email, is_gift, created_at")
        .order(sortField, { ascending: sortDirection === "asc" });
      if (error) console.error("Error fetching profiles:", error);
      else {
        setProfiles(data || []);
        setFiltered(data || []);
      }
    };
    fetchProfiles();
  }, [sortField, sortDirection]);

  useEffect(() => {
    const q = search.toLowerCase();
    const filteredList = profiles.filter((p) => {
      const matchesSearch =
        p.full_name?.toLowerCase().includes(q) ||
        p.email?.toLowerCase().includes(q);
      const matchesGift =
        giftFilter === "" || String(p.is_gift) === giftFilter;
      const createdAt = new Date(p.created_at).toISOString().slice(0, 10);
      const matchesStart = startDate ? createdAt >= startDate : true;
      const matchesEnd = endDate ? createdAt <= endDate : true;
      return matchesSearch && matchesGift && matchesStart && matchesEnd;
    });
    setFiltered(filteredList);
  }, [search, profiles, giftFilter, startDate, endDate]);

  const exportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["ID,Name,Email,Gift,Created"].join(",") +
      "\n" +
      filtered
        .map((p) =>
          [p.id, p.full_name, p.email, p.is_gift, p.created_at].join(",")
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "profiles_export.csv");
    document.body.appendChild(link);
    link.click();
  };

  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const renderSortArrow = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? " 🔼" : " 🔽";
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Search name or email"
          className="border p-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={giftFilter}
          onChange={(e) => setGiftFilter(e.target.value)}
        >
          <option value="">Gift?</option>
          <option value="true">🎁 Yes</option>
          <option value="false">No</option>
        </select>
        <input
          type="date"
          className="border p-2 rounded"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button
          onClick={exportCSV}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Export CSV
        </button>
      </div>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th
              className="p-2 cursor-pointer"
              onClick={() => toggleSort("full_name")}
            >
              Name{renderSortArrow("full_name")}
            </th>
            <th
              className="p-2 cursor-pointer"
              onClick={() => toggleSort("email")}
            >
              Email{renderSortArrow("email")}
            </th>
            <th className="p-2">Gift?</th>
            <th
              className="p-2 cursor-pointer"
              onClick={() => toggleSort("created_at")}
            >
              Created At{renderSortArrow("created_at")}
            </th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-2">{p.full_name}</td>
              <td className="p-2">{p.email}</td>
              <td className="p-2">{p.is_gift ? "🎁" : ""}</td>
              <td className="p-2">
                {new Date(p.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}