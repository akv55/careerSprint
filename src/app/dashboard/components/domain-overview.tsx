interface DomainOverviewProps {
  domain: string
  secondaryDomain?: string | null
  skills: string[]
}

export default function DomainOverview({ domain, secondaryDomain, skills }: DomainOverviewProps) {
  return (
    <div className="mb-8 p-6 bg-white rounded-2xl border-2 border-gray-200 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-4">
      <div>
        <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-2">Active Domains</h2>
        <div className="flex flex-col gap-1">
          <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {domain} <span className="text-primary text-sm align-top font-bold">(Primary)</span>
          </p>
          {secondaryDomain && (
            <p className="text-xl sm:text-2xl font-bold text-gray-500">
              {secondaryDomain} <span className="text-gray-400 text-sm align-top font-semibold">(Secondary)</span>
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1.5 bg-gray-50 text-gray-700 text-xs font-semibold uppercase rounded-lg border border-gray-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="shrink-0 xl:self-start mt-4 xl:mt-0">
        <button className="whitespace-nowrap px-6 py-2.5 bg-white text-gray-700 font-semibold text-sm rounded-xl border border-gray-300 shadow-sm hover:bg-gray-50 transition-all">
          Edit Profile
        </button>
      </div>
    </div>
  )
}
