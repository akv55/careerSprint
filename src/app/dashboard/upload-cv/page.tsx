'use client';

import { CvUploadDropzone } from '@/components/cv/CvUploadDropzone';

export default function UploadCvPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-base-content">Upload CV</h1>
        <p className="text-sm text-base-content/70 mt-1">
          Upload your resume to unlock AI skill extraction and personalized recommendations.
        </p>
      </div>

      <CvUploadDropzone />
    </div>
  );
}
