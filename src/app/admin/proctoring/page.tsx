"use client";

export default function ProctoringPage() {
  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-[#1F6FEB]">
          Live Proctoring
        </h1>
        <p className="text-gray-500 mt-1">
          Monitor live exams and detect suspicious activity.
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid md:grid-cols-4 gap-6">
        <StatCard title="Active Exams" value="12" />
        <StatCard title="Violations" value="3" />
        <StatCard title="High Risk" value="1" />
        <StatCard title="Completed" value="24" />
      </div>

      {/* CANDIDATE GRID */}
      <div className="grid md:grid-cols-3 gap-6">

        <ProctorCard
          name="Rahul Sharma"
          exam="React Advanced"
          risk="Low"
        />

        <ProctorCard
          name="Priya Singh"
          exam="Node Test"
          risk="Medium"
        />

        <ProctorCard
          name="Amit Kumar"
          exam="DSA Round"
          risk="High"
        />

      </div>

    </div>
  );
}

/* ---------- COMPONENTS ---------- */

type StatCardProps = {
  title: string;
  value: string | number;
};

function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-2 text-[#1F6FEB]">
        {value}
      </h2>
    </div>
  );
}

type ProctorCardProps = {
  name: string;
  exam: string;
  risk: "High" | "Medium" | "Low";
};

function ProctorCard({ name, exam, risk }: ProctorCardProps) {
  const riskColor =
    risk === "High"
      ? "bg-red-100 text-red-600"
      : risk === "Medium"
      ? "bg-orange-100 text-orange-600"
      : "bg-green-100 text-green-600";

  return (
    <div className="bg-white p-6 rounded-2xl shadow space-y-4 hover:shadow-lg transition">

      <div className="h-32 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
        Webcam Preview
      </div>

      <div>
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{exam}</p>
      </div>

      <div className="flex justify-between items-center">
        <span className={`px-3 py-1 rounded-full text-xs ${riskColor}`}>
          {risk} Risk
        </span>

        <button className="px-3 py-1 bg-[#1F6FEB] text-white rounded-lg text-sm">
          View
        </button>
      </div>
    </div>
  );
}