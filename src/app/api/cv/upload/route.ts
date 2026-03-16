import { NextRequest, NextResponse } from 'next/server';
import { saveUploadedFile, cleanupFile } from '@/lib/cv/upload';
import { parsePdf } from '@/lib/cv/parse';

export async function POST(request: NextRequest) {
  let filePath: string | null = null;

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'No file attached or invalid file payload' }, { status: 400 });
    }

    // Phase 2: Save the file locally
    const saved = await saveUploadedFile(file);
    filePath = saved.filePath;
    const fileName = saved.originalName;

    // Phase 3: Parse the PDF
    const parsed = await parsePdf(filePath);

    // Phase 4: Construct successful response
    return NextResponse.json({
      text: parsed.text,
      words: parsed.words,
      numPages: parsed.numPages,
      info: parsed.info,
      fileName,
    });
  } catch (error: any) {
    const message = error.message.toLowerCase();

    // Log the error
    console.error('API /cv/upload Error:', error.message || error);

    // Differentiate between 400, 422, and 500
    if (
      message.includes('only pdf files') ||
      message.includes('exceeds the 10 mb') ||
      message.includes('image-only') ||
      message.includes('too small') ||
      message.includes('not a pdf') ||
      message.includes('invalid file payload')
    ) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (
      message.includes('password-protected') ||
      message.includes('corrupted') ||
      message.includes('unreadable') ||
      error.name === 'PasswordException'
    ) {
      return NextResponse.json({ error: error.message }, { status: 422 });
    }

    // Default to 500
    return NextResponse.json({ error: 'Failed to upload or parse the file due to an internal error.' }, { status: 500 });
  } finally {
    // Phase 2: Cleanup ephemeral file
    if (filePath) {
      await cleanupFile(filePath);
    }
  }
}
