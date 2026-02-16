"use client";

import { Activity, Clock, Award, HelpCircle, BarChart2, LucideIcon, BarChart3, FileText, Layers, CheckCircle2, Archive } from "lucide-react";
import { motion } from "framer-motion";
import PerformanceChart from "../performance-chart";

// --- Mock Data ---
const performanceData = [
    { subject: "React", score: 85, total: 100 },
    { subject: "Node.js", score: 72, total: 100 },
    { subject: "SQL", score: 90, total: 100 },
    { subject: "System Design", score: 65, total: 100 },
];

const recentActivity = [
    { id: 1, title: "React Fundamentals Test", score: "85%", date: "2 hours ago", status: "Passed" },
    { id: 2, title: "Node.js Advanced", score: "72%", date: "1 day ago", status: "Passed" },
    { id: 3, title: "System Design Basics", score: "65%", date: "3 days ago", status: "Needs Improvement" },
];

export default function AnalysisPage() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="space-y-8">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-8"
            >
                {/* HEADER */}
                <motion.div variants={itemVariants}>
                    <h1 className="text-2xl font-bold text-gray-900">Performance Analysis</h1>
                    <p className="text-gray-500 mt-1">
                        Track your progress and identify areas for improvement.
                    </p>
                </motion.div>

                {/* Analysis metrics grid */}
                <section className="space-y-3">
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        <MetricCard
                           title="Average Score"
                           value="78%"
                           icon={BarChart2}
                           accent="from-[#0F6FFF]/15 via-[#0F6FFF]/3 to-transparent"
                           change="Up 5% this week"
                           changeTone="positive"
                        />
                        <MetricCard
                            title="Tests Taken"
                            value="24"
                            icon={Activity}
                            accent="from-[#FF8A21]/15 via-[#FF8A21]/3 to-transparent"
                            change="12 this month"
                            changeTone="positive"
                        />
                        <MetricCard
                            title="Time Spent"
                            value="14h 30m"
                            icon={Clock}
                            accent="from-emerald-500/15 via-emerald-500/3 to-transparent"
                            change="Avg 35m per test"
                            changeTone="warning"
                        />
                        <MetricCard
                            title="Highest Rank"
                            value="#42"
                            icon={Award}
                            accent="from-slate-500/15 via-slate-500/3 to-transparent"
                            change="Top 5% overall"
                            changeTone="positive"
                        />
                    </div>
                </section>

                {/* CHARTS SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Main Performance Chart */}
                    <motion.div variants={itemVariants} className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Score History</h3>
                                <p className="text-sm text-gray-500">Your performance trend over the last 7 tests</p>
                            </div>
                            <select className="bg-gray-50 border border-gray-200 text-gray-600 text-sm rounded-lg px-3 py-2 outline-none">
                                <option>Last 7 Days</option>
                                <option>Last 30 Days</option>
                                <option>All Time</option>
                            </select>
                        </div>
                        <div className="h-[300px] w-full">
                            <PerformanceChart />
                        </div>
                    </motion.div>

                    {/* Strength Analysis */}
                    <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Subject Mastery</h3>
                        <p className="text-sm text-gray-500 mb-6">Breakdown by technology</p>

                        <div className="space-y-5">
                            {performanceData.map((item) => (
                                <div key={item.subject}>
                                    <div className="flex justify-between items-center mb-1.5">
                                        <span className="text-sm font-medium text-gray-700">{item.subject}</span>
                                        <span className={`text-sm font-bold ${item.score >= 80 ? 'text-green-600' : item.score >= 70 ? 'text-blue-600' : 'text-orange-500'}`}>
                                            {item.score}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.score}%` }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            className={`h-2 rounded-full ${item.score >= 80 ? 'bg-green-500' : item.score >= 70 ? 'bg-blue-500' : 'bg-orange-500'
                                                }`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                                <span>Weakest Area</span>
                                <span className="text-red-500 font-medium">System Design</span>
                            </div>
                            <button className="w-full py-2.5 mt-2 bg-blue-50 text-[#0F6FFF] font-medium rounded-xl hover:bg-blue-100 transition-colors text-sm">
                                Practice System Design
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* RECENT ACTIVITY */}
                <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
                        <button className="text-sm text-[#0F6FFF] font-medium hover:underline">View All</button>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {recentActivity.map((activity) => (
                            <div key={activity.id} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-xl ${activity.status === 'Passed' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                                        {activity.status === 'Passed' ? <Award size={20} /> : <HelpCircle size={20} />}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                                        <p className="text-sm text-gray-500">{activity.date} • Score: {activity.score}</p>
                                    </div>
                                </div>
                                <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-white hover:border-gray-300 transition-all bg-gray-50">
                                    View Report
                                </button>
                            </div>
                        ))}
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
    trend?: string;
    tone?: "blue" | "green" | "orange" | "purple";
};

function StatCard({ title, value, icon: Icon, trend, tone = "blue" }: StatCardProps) {
    const tones = {
        blue: "bg-blue-50 text-blue-600",
        green: "bg-emerald-50 text-emerald-600",
        orange: "bg-orange-50 text-orange-600",
        purple: "bg-purple-50 text-purple-600",
    };

    return (
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${tones[tone]}`}>
                    <Icon size={22} />
                </div>
                {trend && (
                    <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-gray-50 text-gray-500 border border-gray-100">
                        {trend}
                    </span>
                )}
            </div>
            <div>
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
            </div>
        </div>
    );
}

// --- MetricCard Component ---
type MetricCardProps = {
    icon: LucideIcon;
    accent: string;
    title: string;
    value: string;
    change: string;
    changeTone: "positive" | "warning";
};

function MetricCard({ icon: Icon, accent, title, value, change, changeTone }: MetricCardProps) {
    return (
        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${accent} p-6 border border-gray-100`}>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
                    <p className="text-3xl font-bold text-gray-900">{value}</p>
                    <p className={`text-xs mt-2 font-medium ${changeTone === 'positive' ? 'text-green-600' : 'text-orange-600'}`}>
                        {change}
                    </p>
                </div>
                <div className="p-3 rounded-xl shadow-sm bg-white/80">
                    <Icon size={20} className="text-gray-700" />
                </div>
            </div>
        </div>
    );
}
