// @ts-expect-error - no types available for inner import
import pdf from 'pdf-parse/lib/pdf-parse.js';

export async function parsePdf(data: Uint8Array): Promise<{ text: string; words: string[]; numPages: number; info: object }> {
  try {
    const buffer = Buffer.from(data);
    const result = await pdf(buffer);

    const fullText = result.text || '';
    const trimmedText = fullText.trim();
    
    if (trimmedText.length === 0) {
      throw new Error('PDF appears to be image-only with no extractable text');
    }

    const words = trimmedText.split(/\s+/).filter((word: string) => word.length > 0);

    return { 
      text: trimmedText, 
      words, 
      numPages: result.numpages || 1, 
      info: result.info || {} 
    };
  } catch (error: any) {
    const errorMessage = error?.message || error?.name || '';
    if (errorMessage.includes('Password') || errorMessage.includes('encrypted')) {
      throw new Error('PDF is password-protected');
    }
    // Re-throw generic or known errors
    throw error;
  }
}
