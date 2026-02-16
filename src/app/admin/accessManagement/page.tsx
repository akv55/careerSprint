"use client";

import { useState } from "react";
import { Search, Eye, Pencil, Trash2, Shield, UserCog, Upload, Download, Filter, Plus, ChevronLeft, ChevronRight, CheckCircle2, XCircle, LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type User = {
    id: number;
    name: string;
    email: string;
    role: "Admin" | "Examiner" | "Candidate";
    status: "Active" | "Inactive";
    access: "Full Access" | "Limited";
    mfa: boolean;
    lastLogin: string;
    createdAt: string;
};

const users: User[] = [
    {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Admin",
        status: "Active",
        access: "Full Access",
        mfa: true,
        lastLogin: "2 hours ago",
        createdAt: "Jan 12, 2026",
    },
    {
        id: 2,
        name: "Sarah Smith",
        email: "sarah@example.com",
        role: "Examiner",
        status: "Inactive",
        access: "Limited",
        mfa: false,
        lastLogin: "1 day ago",
        createdAt: "Feb 02, 2026",
    },
    {
        id: 3,
        name: "Mike Johnson",
        email: "mike.j@example.com",
        role: "Candidate",
        status: "Active",
        access: "Limited",
        mfa: true,
        lastLogin: "5 mins ago",
        createdAt: "Feb 10, 2026",
    },
];

export default function AccessManagement() {
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    const filtered = users.filter((u) => {
        const matchesSearch =
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase());

        const matchesRole =
            roleFilter === "all" || u.role.toLowerCase() === roleFilter.toLowerCase();

        const matchesStatus =
            statusFilter === "all" || u.status.toLowerCase() === statusFilter.toLowerCase();

        return matchesSearch && matchesRole && matchesStatus;
    });

    const pageSize = 5;
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const safePage = Math.min(currentPage, totalPages);
    const startIndex = (safePage - 1) * pageSize;
    const paginated = filtered.slice(startIndex, startIndex + pageSize);

    // --- Animation Variants ---
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="min-h-screen bg-base-100 font-sans relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-full h-64 bg-gradient-to-l from-primary/10 via-base-100 to-accent/10 -z-10" />

            <motion.div
                className="container-app py-6 space-y-8"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* HEADER */}
                <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-base-content tracking-tight">
                            Access Management
                        </h1>
                        <p className="text-base-content/70 mt-1 text-sm">
                            Manage Admins, Examiners & Candidates with secure, role-based permissions.
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
                    <StatCard title="Total Users" value="126" icon={UserCog} tone="blue" />
                    <StatCard title="Active Users" value="98" icon={CheckCircle2} tone="green" />
                    <StatCard title="Pending Invites" value="6" icon={Shield} tone="orange" />
                    <StatCard title="Blocked Users" value="4" icon={XCircle} tone="red" />
                </motion.div>

                {/* MAIN CONTENT CARD */}
                <motion.div variants={itemVariants} className="card overflow-hidden">

                    {/* FILTERS TOOLBAR */}
                    <div className="p-5 border-b border-base-200 flex flex-col md:flex-row gap-4 justify-between bg-base-100/80 backdrop-blur-sm">
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            {/* Role Filter */}
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-base-300" size={14} />
                                <select
                                    value={roleFilter}
                                    onChange={(e) => setRoleFilter(e.target.value)}
                                    className="pl-9 pr-8 py-2 w-full sm:w-40 bg-base-100 border border-base-200 rounded-xl text-sm text-base-content/80 focus:ring-1 focus:ring-primary/20 focus:border-primary outline-none appearance-none cursor-pointer hover:border-base-300 transition-colors"
                                >
                                    <option value="all">All Roles</option>
                                    <option value="admin">Admin</option>
                                    <option value="examiner">Examiner</option>
                                    <option value="candidate">Candidate</option>
                                </select>
                            </div>

                            {/* Status Filter */}
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-base-300"></div>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="pl-8 pr-8 py-2 w-full sm:w-40 bg-base-100 border border-base-200 rounded-xl text-sm text-base-content/80 focus:ring-1 focus:ring-primary/20 focus:border-primary outline-none appearance-none cursor-pointer hover:border-base-300 transition-colors"
                                >
                                    <option value="all">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>

                            {/* Showing user list filter */}
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-base-300"></div>
                                <select
                                    className="pl-8 pr-8 py-2 w-full sm:w-40 bg-base-100 border border-base-200 rounded-xl text-sm text-base-content/80 focus:ring-1 focus:ring-primary/20 focus:border-primary outline-none appearance-none cursor-pointer hover:border-base-300 transition-colors"
                                >
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                            </div>
                        </div>

                        <div className="relative w-full md:max-w-sm">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-base-300" />
                            <input
                                type="text"
                                placeholder="Search by name, email..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 pr-4 py-2 w-full bg-base-100 border border-base-200 rounded-xl text-sm text-base-content focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-base-300"
                            />
                        </div>
                    </div>

                    {/* TABLE */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gradient-to-r from-primary/5 via-base-100 to-accent/5 text-xs font-semibold text-base-content/70 uppercase tracking-wider border-b border-base-200">
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Access Level</th>
                                    <th className="px-6 py-4">MFA Status</th>
                                    <th className="px-6 py-4">Last Login</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-base-200">
                                <AnimatePresence mode="wait">
                                    {paginated.map((user) => (
                                        <motion.tr
                                            key={user.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="group hover:bg-primary/5 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <p className="font-medium text-sm text-base-content">{user.name}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm text-base-content/60">{user.email}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${user.role === "Admin"
                                                    ? "bg-purple-50 text-purple-700 border-purple-100"
                                                    : user.role === "Examiner"
                                                        ? "bg-blue-50 text-blue-700 border-blue-100"
                                                        : "bg-gray-50 text-gray-600 border-gray-200"
                                                    }`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className={`flex items-center gap-1.5 text-xs font-medium ${user.status === "Active" ? "text-green-600" : "text-gray-500"}`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${user.status === "Active" ? "bg-green-500" : "bg-gray-400"}`} />
                                                    {user.status}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-base-content/70">{user.access}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.mfa ? (
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-green-50 text-green-700 text-xs border border-green-100">
                                                        <Shield size={10} /> Secured
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-orange-50 text-orange-700 text-xs border border-orange-100">
                                                        Incomplete
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-base-content/60">
                                                {user.lastLogin}
                                            </td>
                                            <td className="px-6 py-4 text-right">
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
                                    ))}
                                </AnimatePresence>
                                {paginated.length === 0 && (
                                    <tr>
                                        <td colSpan={8} className="px-6 py-12 text-center text-base-content/60">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <Search size={32} className="text-base-300" />
                                                <p>No users found matching filters.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINATION */}
                    <div className="px-6 py-4 border-t border-base-200 flex items-center justify-between bg-secondary/50">
                        <span className="text-xs text-base-content/60">
                            Showing {filtered.length === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + pageSize, filtered.length)} of {filtered.length} users
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

// --- StatCard Component ---
type StatCardProps = {
    title: string;
    value: string;
    icon: LucideIcon;
    tone?: "blue" | "green" | "orange" | "red";
};

function StatCard({ title, value, icon: Icon, tone = "blue" }: StatCardProps) {
    const gradients = {
        blue: "from-primary/10 via-primary/0 to-accent/5",
        green: "from-emerald-400/10 via-emerald-400/0 to-emerald-400/5",
        orange: "from-accent/10 via-accent/0 to-primary/5",
        red: "from-red-500/10 via-red-500/0 to-red-500/5",
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