"use client";

import Link from "next/link";
import { Trophy, ArrowUpRight } from "lucide-react";

type LeaderRow = {
	rank: number;
	name: string;
	role: string;
	score: number;
	attempts: number;
	trend: "up" | "down" | "steady";
};

const leaders: LeaderRow[] = [
	{ rank: 1, name: "You", role: "Frontend", score: 92, attempts: 6, trend: "up" },
	{ rank: 2, name: "Rahul S.", role: "Backend", score: 88, attempts: 8, trend: "steady" },
	{ rank: 3, name: "Priya K.", role: "Full‑stack", score: 84, attempts: 5, trend: "up" },
	{ rank: 4, name: "Amit P.", role: "DSA", score: 81, attempts: 4, trend: "down" },
	{ rank: 5, name: "Sneha G.", role: "System design", score: 79, attempts: 7, trend: "steady" },
];

export default function LeaderboardPage() {
	const me = leaders[0];
	const percentile = 96;

	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<h1 className="text-2xl font-bold text-base-content">Leaderboard</h1>
					<p className="text-sm text-base-content/70 mt-1">
						See how your recent AI exam scores compare with others.
					</p>
				</div>
				<div className="flex gap-2">
					<Link href="/dashboard/ai-tests" className="btn btn-md btn-primary">
						Take a test
					</Link>
				</div>
			</div>

			<div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
				{/* Highlight card */}
				<div className="card card-pad flex flex-col justify-between bg-gradient-to-br from-[#f5f8ff] to-[#fff5ec]">
					<div className="flex items-start justify-between gap-4">
						<div>
							<p className="text-xs font-semibold uppercase tracking-wide text-primary/80">
								Your position
							</p>
							<div className="mt-2 flex items-baseline gap-2">
								<span className="text-4xl font-extrabold text-base-content">#{me.rank}</span>
								<span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
									Top {percentile}%
								</span>
							</div>
							<p className="mt-2 text-sm text-base-content/70">
								Based on your best score across all AI exams in the last 30 days.
							</p>
						</div>
						<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-content shadow-md">
							<Trophy className="h-6 w-6" />
						</div>
					</div>

					<div className="mt-4 grid grid-cols-3 gap-3 text-xs">
						<div className="rounded-2xl bg-white/80 p-3 shadow-sm">
							<p className="text-xs text-base-content/60">Best score</p>
							<p className="mt-1 text-lg font-semibold text-base-content">{me.score}%</p>
						</div>
						<div className="rounded-2xl bg-white/80 p-3 shadow-sm">
							<p className="text-xs text-base-content/60">Attempts</p>
							<p className="mt-1 text-lg font-semibold text-base-content">{me.attempts}</p>
						</div>
						<div className="rounded-2xl bg-white/80 p-3 shadow-sm">
							<p className="text-xs text-base-content/60">Track</p>
							<p className="mt-1 text-sm font-semibold text-base-content">{me.role}</p>
						</div>
					</div>
				</div>

				{/* Table */}
				<div className="card card-pad">
					<div className="flex items-center justify-between gap-3 mb-4">
						<div>
							<h2 className="text-lg font-bold text-base-content">Top performers</h2>
							<p className="text-sm text-base-content/70 mt-1">
								Rankings based on last 30 days of attempts.
							</p>
						</div>
						<span className="inline-flex items-center gap-1 rounded-full bg-base-200 px-3 py-1 text-[11px] font-medium text-base-content/70">
							Live updates
							<ArrowUpRight className="h-3 w-3" />
						</span>
					</div>

					<div className="mt-2 overflow-x-auto">
						<table className="min-w-full text-sm">
							<thead>
								<tr className="text-left text-base-content/60">
									<th className="py-2 pr-4">Rank</th>
									<th className="py-2 pr-4">Candidate</th>
									<th className="py-2 pr-4">Track</th>
									<th className="py-2 pr-4">Best score</th>
									<th className="py-2 pr-4">Attempts</th>
									<th className="py-2 pr-4">Trend</th>
								</tr>
							</thead>
							<tbody>
								{leaders.map((row) => (
									<tr
										key={row.rank}
										className={`border-t border-base-200 ${
											row.rank === 1 ? "bg-primary/5" : ""
										}`}
									>
										<td className="py-3 pr-4 font-semibold text-base-content/80">#{row.rank}</td>
										<td className="py-3 pr-4 text-base-content font-semibold">
											{row.name}
											{row.rank === 1 && (
												<span className="ml-2 rounded-full bg-primary text-primary-content px-2 py-0.5 text-[10px] font-semibold">
													You
												</span>
											)}
										</td>
										<td className="py-3 pr-4 text-base-content/70">{row.role}</td>
										<td className="py-3 pr-4 text-base-content/80">{row.score}%</td>
										<td className="py-3 pr-4 text-base-content/70">{row.attempts}</td>
										<td className="py-3 pr-4 text-base-content/70">
											{row.trend === "up" && (
												<span className="text-xs font-semibold text-emerald-600">▲ Improving</span>
											)}
											{row.trend === "down" && (
												<span className="text-xs font-semibold text-rose-600">▼ Dropped</span>
											)}
											{row.trend === "steady" && (
												<span className="text-xs font-semibold text-amber-600">• Stable</span>
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}

