"use client";

import { ChangeEvent } from "react";
import { UploadCloud } from "lucide-react";

type CvUploadDropzoneProps = {
  onFileSelect?: (files: FileList) => void;
};

export function CvUploadDropzone({ onFileSelect }: CvUploadDropzoneProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onFileSelect?.(event.target.files);
    }
  };

  return (
    <label className="relative block overflow-hidden rounded-3xl border-2 border-dashed border-[#D4D9FF] bg-gradient-to-br from-[#f5f8ff] via-white to-[#fff5ec] p-6 sm:p-8 text-center cursor-pointer transition hover:border-[#0F6FFF]/80 hover:shadow-lg">
      <input
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
        onChange={handleChange}
      />

      <div className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_0_0,#ffffff_0,transparent_55%),radial-gradient(circle_at_100%_100%,#ffe8d2_0,transparent_55%)]" />

      <div className="relative flex flex-col items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/80 text-[#0F6FFF] shadow-md mb-1">
          <UploadCloud className="h-6 w-6" />
        </div>
        <p className="text-sm sm:text-base font-semibold text-gray-900">
          Drag & drop your CV here,
          <span className="block sm:inline sm:ml-1 text-[#0F6FFF] underline underline-offset-4">or browse files</span>
        </p>
        <p className="text-[11px] sm:text-xs text-gray-500">
          Supported formats: PDF, DOC, DOCX · Max size 10MB
        </p>
      </div>
    </label>
  );
}
