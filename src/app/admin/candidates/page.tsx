"use client";

import { useState } from "react";
import { Search, Eye, BarChart2, Pencil, Plus, UserCheck, Users, Download, Upload, TrendingUp, Filter, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// --- Mock Data ---
const candidates = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    status: "Active",
    score: 85,
    tests: 12,
    lastTest: "2 days ago",
    rank: 24,
  },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya@example.com",
    status: "Inactive",
    score: 62,
    tests: 8,
    lastTest: "5 days ago",
    rank: 67,
  },
  {
    id: 3,
    name: "Amit Patel",
    email: "amit.p@example.com",
    status: "Active",
    score: 91,
    tests: 15,
    lastTest: "1 day ago",
    rank: 5,
  },
  {
    id: 4,
    name: "Sneha Gupta",
    email: "sneha.g@example.com",
    status: "Active",
    score: 78,
    tests: 10,
    lastTest: "1 week ago",
    rank: 42,
  },
  {
    id: 5,
    name: "Vikram Malhotra",
    email: "vikram.m@example.com",
    status: "Inactive",
    score: 45,
    tests: 3,
    lastTest: "2 weeks ago",
    rank: 150,
  },
];

export default function CandidatesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // --- Filtering Logic ---
  const filtered = candidates.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // --- Pagination Logic ---
  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const paginated = filtered.slice(startIndex, startIndex + pageSize);

  // --- Animations ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen font-sans relative overflow-hidden">
      {/* Top Decoration */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-primary to-primary/80 opacity-10 -z-10" />

      <motion.div
        className="container-app py-6 space-y-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* HEADER */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-base-content tracking-tight">
              Candidates
            </h1>
            <p className="text-base-content/70 mt-1 text-sm">
              Monitor candidate performance and activity
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <motion.button
              whileHover={{ y: -2 }}
              className="bg-blue-100 border border-blue-300 text-gray-600 rounded-xl px-4 btn py-2 gap-2 cursor-pointer transition-colors"
            >
              <Download size={16} />
              Download
            </motion.button>
            <motion.button
              whileHover={{ y: -2 }}
              className="bg-blue-100 border border-blue-300 text-gray-600 rounded-xl px-4 btn py-2 gap-2 cursor-pointer transition-colors"
            >
              <Upload size={16} />
              Import CSV
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-orange-100 border border-orange-300 text-gray-600 rounded-xl px-4 btn py-2 gap-2 cursor-pointer transition-colors"
            >
              <Plus size={18} />
              Add User
            </motion.button>
          </div>
        </motion.div>

        {/* SUMMARY CARDS */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Candidates" value="324" icon={Users} />
          <StatCard title="Active Now" value="287" icon={UserCheck} tone="green" />
          <StatCard title="Avg. Score" value="76%" icon={BarChart2} tone="orange" />
          <StatCard title="High Potential" value="42" icon={TrendingUp} tone="purple" />
        </motion.div>

        {/* CONTROLS & TABLE CONTAINER */}
        <motion.div variants={itemVariants} className="card overflow-hidden">

          {/* TOOLBAR */}
          <div className="p-5 border-b border-base-200 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-base-100/80 backdrop-blur-sm">

            {/* SEARCH */}
            <div className="relative w-full md:max-w-md group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-base-300 group-focus-within:text-primary transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search candidates..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-base-100 border border-base-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            {/* FILTERS */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-secondary border border-base-200 rounded-xl">
                <Filter size={16} className="text-base-content/60" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-transparent text-sm text-base-content outline-none cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-primary/5 via-base-100 to-accent/5 text-xs font-semibold text-base-content/70 uppercase tracking-wider border-b border-base-200">
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Avg. Score</th>
                  <th className="px-6 py-4">Tests Taken</th>
                  <th className="px-6 py-4">Last Active</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-200">
                <AnimatePresence mode="wait">
                  {paginated.length > 0 ? (
                    paginated.map((c) => (
                      <motion.tr
                        key={c.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="group hover:bg-primary/5 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <p className="font-medium text-base-content">{c.name}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-base-content/70">
                          <p className="text-xs text-base-content/60">{c.email}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${c.status === "Active"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-gray-100 text-gray-600 border-gray-200"
                              }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${c.status === "Active" ? "bg-green-500" : "bg-gray-400"}`}></span>
                            {c.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className={`font-bold ${c.score >= 80 ? "text-green-600" : c.score >= 60 ? "text-orange-500" : "text-red-500"}`}>
                              {c.score}%
                            </span>
                            <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${c.score >= 80 ? "bg-green-500" : c.score >= 60 ? "bg-orange-500" : "bg-red-500"}`}
                                style={{ width: `${c.score}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-base-content/70">
                          {c.tests}
                        </td>
                        <td className="px-6 py-4 text-sm text-base-content/60">
                          {c.lastTest}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2  group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 text-blue-500 hover:bg-blue-100 rounded transition-colors cursor-pointer" title="View Details">
                              <Eye size={18} />
                            </button>
                            <button className="p-1.5 text-orange-500 hover:bg-orange-100 rounded transition-colors cursor-pointer" title="Edit">
                              <Pencil size={18} />
                            </button>
                            <button className="p-1.5 text-red-500 hover:bg-red-100 rounded transition-colors cursor-pointer" title="Delete">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-base-content/60">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <Search size={32} className="text-base-300" />
                          <p>No candidates found matching &quot;{search}&quot;</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="px-6 py-4 border-t border-base-200 flex items-center justify-between bg-secondary/50">
            <span className="text-xs text-base-content/60">
              Showing {filtered.length === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + pageSize, filtered.length)} of {filtered.length} results
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="p-2 rounded-lg border border-base-200 bg-base-100 text-base-content/70 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary transition-colors cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded-lg text-xs font-medium transition-all cursor-pointer ${currentPage === i + 1
                      ? "bg-primary text-white shadow-md shadow-primary/30"
                      : "bg-base-100 text-base-content/80 hover:bg-secondary"
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                className="p-2 rounded-lg border border-base-200 bg-base-100 text-base-content/70 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary transition-colors cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

        </motion.div>
      </motion.div>
    </div>
  );
}

// --- Subcomponents ---

type StatCardProps = {
  title: string;
  value: string;
  icon: LucideIcon;
  tone?: "blue" | "green" | "orange" | "purple";
};

function StatCard({ title, value, icon: Icon, tone = "blue" }: StatCardProps) {
  const gradients = {
    blue: "from-primary/10 via-primary/0 to-accent/5",
    green: "from-emerald-400/10 via-emerald-400/0 to-emerald-400/5",
    orange: "from-accent/10 via-accent/0 to-primary/5",
    purple: "from-purple-500/10 via-purple-500/0 to-purple-500/5",
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      className="relative overflow-hidden rounded-xl border border-base-200 bg-base-100 shadow-sm"
    >
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${gradients[tone]} opacity-70`} />

      <div className="relative flex items-start justify-between gap-4 p-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/80">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className="min-w-0 text-right">
          <p className="text-xs font-semibold text-base-content/60 uppercase tracking-wider">{title}</p>
          <h2 className="mt-1 text-2xl font-bold text-base-content tracking-tight">{value}</h2>
        </div>
      </div>
    </motion.div>
  );
}