export default function ActionCards() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col">
        <h3 className="font-bold text-gray-900 text-2xl tracking-tight mb-2">Practice Exams</h3>
        <p className="text-gray-600 font-medium mb-8 flex-1">
          Generate a fresh 30-question test tailored to your exact domain and skills. Start validating your expertise now.
        </p>
        <button className="text-sm font-bold text-white bg-primary w-full py-4 rounded-xl shadow-sm hover:opacity-90 transition-colors">
          Start Exam
        </button>
      </div>

      <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col">
        <h3 className="font-bold text-gray-900 text-2xl tracking-tight mb-2">Test History</h3>
        <p className="text-gray-600 font-medium mb-8 flex-1">
          Review your past performances, identify your weak spots, and see your solutions.
        </p>
        <button className="text-sm font-bold text-white bg-accent w-full py-4 rounded-xl shadow-sm hover:opacity-90 transition-colors">
          View History
        </button>
      </div>
    </div>
  )
}
