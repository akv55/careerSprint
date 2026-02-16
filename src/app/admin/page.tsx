export default function Admin() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-base-content">Admin overview</h1>
        <p className="mt-1 text-sm text-base-content/70">
          High-level snapshot of platform health for admins.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="card card-pad">
          <p className="text-xs text-base-content/60">Active candidates</p>
          <p className="mt-2 text-2xl font-bold text-primary">1,234</p>
          <p className="mt-1 text-xs text-emerald-600">+8% vs last week</p>
        </div>

        <div className="card card-pad">
          <p className="text-xs text-base-content/60">Exams this month</p>
          <p className="mt-2 text-2xl font-bold text-primary">342</p>
          <p className="mt-1 text-xs text-amber-600">Peak on Wednesdays</p>
        </div>

        <div className="card card-pad">
          <p className="text-xs text-base-content/60">Flagged proctoring events</p>
          <p className="mt-2 text-2xl font-bold text-primary">12</p>
          <p className="mt-1 text-xs text-base-content/60">Review in Proctoring tab</p>
        </div>
      </div>
    </div>
  );
}
