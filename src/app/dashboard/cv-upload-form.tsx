'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function CvUploadForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData(e.currentTarget);
    const file = formData.get('file') as File | null;

    if (!file || file.size === 0) {
      setError('Please select a file to upload');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/cv/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze CV');
      }
       console.log(data)
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mt-6">
      <h2 className="text-xl font-bold mb-4">Upload CV for AI Analysis</h2>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <label htmlFor="cv-upload" className="block text-sm font-medium text-gray-700">
            Select a PDF document
          </label>
          <input
            id="cv-upload"
            name="file"
            type="file"
            accept="application/pdf"
            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            disabled={loading}
          />
          <p className="mt-1 text-sm text-gray-500">Max file size: 10MB.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-200">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center">
              <Loader2 className="animate-spin -ml-1 mr-2 flex-shrink-0 h-5 w-5" />
              Processing...
            </span>
          ) : (
            'Upload and Analyze'
          )}
        </button>
      </form>

      {result && result.words && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-green-900 mb-2">Success!</h3>
          <p className="text-sm text-green-800">
            Parsed <strong>{result.numPages}</strong> page(s) successfully.
            Found <strong>{result.words.length}</strong> words.
          </p>

          <div className="mt-3 bg-white p-3 rounded border border-green-100 text-sm font-mono overflow-auto max-h-32">
            <span className="text-gray-500 text-xs uppercase block mb-1 font-sans">First few words preview:</span>
            {result.words.slice(0, 30).join(' ')}...
          </div>
        </div>
      )}
    </div>
  );
}
