'use client';

import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, FileText, Layers, Archive, Users, Clock3, CheckCircle2, UserX } from 'lucide-react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    PieChart,
    Pie,
    Cell,
    Legend,
} from 'recharts';

export default function AdminDashboardPage() {
    const examTrendData = [
        { label: 'Mon', exams: 18 },
        { label: 'Tue', exams: 24 },
        { label: 'Wed', exams: 32 },
        { label: 'Thu', exams: 28 },
        { label: 'Fri', exams: 40 },
        { label: 'Sat', exams: 22 },
        { label: 'Sun', exams: 15 },
    ];

    const subjectDistribution = [
        { name: 'DSA', value: 32 },
        { name: 'System Design', value: 18 },
        { name: 'Frontend', value: 26 },
        { name: 'Backend', value: 14 },
        { name: 'Behavioral', value: 10 },
    ];

    const pieColors = ['#0F6FFF', '#FF8A21', '#10B981', '#6366F1', '#F97316'];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-base-content">Admin dashboard</h1>
                <p className="mt-1 text-sm text-base-content/70">
                    Welcome back, here&apos;s what&apos;s happening with your exams today.
                </p>
            </div>

            {/* Exam metrics */}
            <section className="space-y-3">
                <h2 className="text-lg font-semibold text-base-content flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Exam metrics
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <MetricCard
                        icon={FileText}
                        accent="from-[#0F6FFF]/15 via-[#0F6FFF]/3 to-transparent"
                        title="Total exams"
                        value="1,234"
                        change="+8% total exams created"
                        changeTone="positive"
                    />
                    <MetricCard
                        icon={Layers}
                        accent="from-[#FF8A21]/15 via-[#FF8A21]/3 to-transparent"
                        title="Draft"
                        value="18"
                        change="+5% drafts created"
                        changeTone="positive"
                    />
                    <MetricCard
                        icon={CheckCircle2}
                        accent="from-emerald-500/15 via-emerald-500/3 to-transparent"
                        title="Published"
                        value="12"
                        change="-2% published exams"
                        changeTone="warning"
                    />
                    <MetricCard
                        icon={Archive}
                        accent="from-slate-500/15 via-slate-500/3 to-transparent"
                        title="Archived"
                        value="12"
                        change="-5% archived exams"
                        changeTone="warning"
                    />
                </div>
            </section>

            {/* Candidate metrics */}
            <section className="space-y-3">
                <h2 className="text-lg font-semibold text-base-content flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Candidate metrics
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <MetricCard
                        icon={Users}
                        accent="from-[#0F6FFF]/15 via-[#0F6FFF]/3 to-transparent"
                        title="Total candidates"
                        value="1,234"
                        change="+8% total candidates"
                        changeTone="positive"
                    />
                    <MetricCard
                        icon={Clock3}
                        accent="from-amber-400/15 via-amber-400/3 to-transparent"
                        title="Pending"
                        value="18"
                        change="+5% pending candidates"
                        changeTone="positive"
                    />
                    <MetricCard
                        icon={CheckCircle2}
                        accent="from-emerald-500/15 via-emerald-500/3 to-transparent"
                        title="Active"
                        value="12"
                        change="-2% active candidates"
                        changeTone="warning"
                    />
                    <MetricCard
                        icon={UserX}
                        accent="from-rose-500/15 via-rose-500/3 to-transparent"
                        title="Inactive"
                        value="12"
                        change="-5% inactive candidates"
                        changeTone="warning"
                    />
                </div>
            </section>

            {/* Exam trends & subject mix */}
            <section className="grid gap-6 lg:grid-cols-3">
                <div className="card card-pad lg:col-span-2">
                    <div className="flex items-center justify-between gap-2">
                        <div>
                            <h2 className="text-sm font-semibold text-base-content flex items-center gap-2">
                                <BarChart3 className="h-4 w-4 text-primary" />
                                Exams over the last 7 days
                            </h2>
                            <p className="mt-1 text-xs text-base-content/60">
                                Daily exam creations across all roles.
                            </p>
                        </div>
                    </div>
                    <div className="mt-4 h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={examTrendData} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--muted)" vertical={false} />
                                <XAxis
                                    dataKey="label"
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fill: 'var(--base-content)', fontSize: 12, opacity: 0.7 }}
                                />
                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fill: 'var(--base-content)', fontSize: 12, opacity: 0.7 }}
                                    width={32}
                                />
                                <Tooltip
                                    cursor={{ fill: 'rgba(148, 163, 184, 0.16)' }}
                                    contentStyle={{
                                        background: 'var(--base-100)',
                                        border: '1px solid var(--base-200)',
                                        borderRadius: 12,
                                        color: 'var(--base-content)',
                                    }}
                                    labelStyle={{ color: 'var(--base-content)' }}
                                />
                                <Bar dataKey="exams" radius={[6, 6, 0, 0]} fill="url(#examGradient)" />
                                <defs>
                                    <linearGradient id="examGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#0F6FFF" stopOpacity={0.95} />
                                        <stop offset="100%" stopColor="#0F6FFF" stopOpacity={0.25} />
                                    </linearGradient>
                                </defs>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card card-pad">
                    <h2 className="text-sm font-semibold text-base-content">Subjects distribution</h2>
                    <p className="mt-1 text-xs text-base-content/60">
                        Share of questions by subject.
                    </p>
                    <div className="mt-2 h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={subjectDistribution}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={48}
                                    outerRadius={76}
                                    paddingAngle={2}
                                >
                                    {subjectDistribution.map((entry, index) => (
                                        <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value: number) => `${value}%`}
                                    contentStyle={{
                                        background: 'var(--base-100)',
                                        border: '1px solid var(--base-200)',
                                        borderRadius: 12,
                                        color: 'var(--base-content)',
                                    }}
                                    labelStyle={{ color: 'var(--base-content)' }}
                                />
                                <Legend
                                    layout="vertical"
                                    align="right"
                                    verticalAlign="middle"
                                    iconType="circle"
                                    formatter={(value: string) => (
                                        <span className="text-xs text-base-content/70">{value}</span>
                                    )}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </section>
            {/* Recent activity */}
            <section className="mt-8">
                <h2 className="text-sm font-semibold text-base-content">Recent Activity</h2>
                <p className="mt-1 text-xs text-base-content/60">
                    Overview of recent actions and events.
                </p>
                <div className="mt-2">
                    {/* Recent activity content goes here */}
                </div>
            </section>
        </div>
    );
}

type MetricCardProps = {
    icon: ComponentType<{ className?: string }>;
    accent: string;
    title: string;
    value: string;
    change: string;
    changeTone?: 'positive' | 'warning';
};

function MetricCard({ icon: Icon, accent, title, value, change, changeTone = 'positive' }: MetricCardProps) {
    const changeClass =
        changeTone === 'positive'
            ? 'text-emerald-600'
            : 'text-amber-600';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="relative overflow-hidden rounded-xl border border-base-200 bg-base-100 shadow-sm"
        >
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent} opacity-70`} />
            <div className="relative flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/80">
                    <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0">
                    <p className="text-xs text-base-content/60">{title}</p>
                    <p className="mt-1 text-2xl font-bold text-base-content">{value}</p>
                    <p className={`mt-1 text-xs ${changeClass}`}>{change}</p>
                </div>
            </div>
        </motion.div>
    );
}
