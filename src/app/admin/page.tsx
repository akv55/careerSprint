'use client';

import Link from 'next/link';

export default function Admin() {
  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Admin Panel</h1>
          <button className="text-gray-600 hover:text-gray-900">Logout</button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Administration</h2>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-indigo-600">1,234</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Exams Taken</h3>
            <p className="text-3xl font-bold text-green-600">5,678</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Avg Score</h3>
            <p className="text-3xl font-bold text-blue-600">72%</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Admin Functions</h3>
          <ul className="space-y-2">
            <li><Link href="#" className="text-indigo-600 hover:text-indigo-700">Manage Users</Link></li>
            <li><Link href="#" className="text-indigo-600 hover:text-indigo-700">Manage Exams</Link></li>
            <li><Link href="#" className="text-indigo-600 hover:text-indigo-700">View Reports</Link></li>
            <li><Link href="#" className="text-indigo-600 hover:text-indigo-700">System Settings</Link></li>
          </ul>
        </div>
      </div>
    </main>
  );
}
