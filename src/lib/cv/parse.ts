import { promises as fs } from 'fs';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';

export async function parsePdf(filePath: string): Promise<{ text: string; words: string[]; numPages: number; info: object }> {
  try {
    const data = await fs.readFile(filePath);
    const uint8Array = new Uint8Array(data);

    // Use disableWorker: true to avoid issues with worker files in serverless environments
    const loadingTask = (pdfjs as any).getDocument({ 
      data: uint8Array,
      disableWorker: true,
      isEvalAndRefCheckDisabled: true,
      useSystemFonts: true,
    });
    
    const pdf = await loadingTask.promise;

    let fullText = '';
    const numPages = pdf.numPages;

    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + ' ';
    }

    const trimmedText = fullText.trim();
    if (trimmedText.length === 0) {
      throw new Error('PDF appears to be image-only with no extractable text');
    }

    const words = trimmedText.split(/\s+/).filter(word => word.length > 0);

    let info = {};
    try {
      const metadata = await pdf.getMetadata();
      info = metadata.info || {};
    } catch (e) {
      // metadata might not be available
    }

    return { text: trimmedText, words, numPages, info };
  } catch (error: any) {
    if (error.name === 'PasswordException') {
      throw new Error('PDF is password-protected');
    }
    // Re-throw generic or known errors
    throw error;
  }
}
