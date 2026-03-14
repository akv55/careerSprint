'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface CvUploadFormProps {
  onSuccess?: (data: any) => void;
}

export default function CvUploadForm({ onSuccess }: CvUploadFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

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
      
      if (onSuccess) {
        onSuccess(data);
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <input
            id="cv-upload"
            name="file"
            type="file"
            accept="application/pdf"
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-xl cursor-pointer focus:outline-none focus:border-blue-500 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 shadow-sm transition-all"
            disabled={loading}
          />
          <p className="mt-2 text-sm font-medium text-gray-500">Max file size: 10MB (PDF Only).</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm border border-red-200 font-medium">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex justify-center items-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-bold text-white shadow-sm hover:opacity-90 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center">
              <Loader2 className="animate-spin -ml-1 mr-2 flex-shrink-0 h-5 w-5" />
              Processing...
            </span>
          ) : (
            'Extract Skills'
          )}
        </button>
      </form>
    </div>
  );
}
