"use client";

import Link from "next/link";

type LeaderRow = {
	rank: number;
	name: string;
	role: string;
	score: number;
	attempts: number;
};

const leaders: LeaderRow[] = [
	{ rank: 1, name: "You", role: "Frontend", score: 92, attempts: 6 },
	{ rank: 2, name: "Rahul S.", role: "Backend", score: 88, attempts: 8 },
	{ rank: 3, name: "Priya K.", role: "Full‑stack", score: 84, attempts: 5 },
	{ rank: 4, name: "Amit P.", role: "DSA", score: 81, attempts: 4 },
	{ rank: 5, name: "Sneha G.", role: "System design", score: 79, attempts: 7 },
];

export default function LeaderboardPage() {
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

			<div className="card card-pad">
				<div className="flex items-center justify-between gap-3 mb-4">
					<div>
						<h2 className="text-lg font-bold text-base-content">Top performers</h2>
						<p className="text-sm text-base-content/70 mt-1">
							Rankings based on last 30 days of attempts.
						</p>
					</div>
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
							</tr>
						</thead>
						<tbody>
							{leaders.map((row) => (
								<tr key={row.rank} className="border-t border-base-200">
									<td className="py-3 pr-4 font-semibold text-base-content/80">#{row.rank}</td>
									<td className="py-3 pr-4 text-base-content font-semibold">{row.name}</td>
									<td className="py-3 pr-4 text-base-content/70">{row.role}</td>
									<td className="py-3 pr-4 text-base-content/80">{row.score}%</td>
									<td className="py-3 pr-4 text-base-content/70">{row.attempts}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

