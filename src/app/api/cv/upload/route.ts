import { NextRequest, NextResponse } from 'next/server';
import { parsePdf } from '@/lib/cv/parse';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'No file attached or invalid file payload' }, { status: 400 });
    }

    // Phase 1: Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Only PDF files are accepted' }, { status: 400 });
    }

    // Phase 2: Convert to Buffer (In-memory)
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // Phase 3: Parse the PDF (In-memory)
    const parsed = await parsePdf(uint8Array);

    // Phase 4: Construct successful response
    return NextResponse.json({
      text: parsed.text,
      words: parsed.words,
      numPages: parsed.numPages,
      info: parsed.info,
      fileName: file.name,
    });
  } catch (error: any) {
    const message = (error.message || String(error)).toLowerCase();

    // Log the error for diagnostic purposes in Vercel/Local console
    console.error('API /cv/upload Fatal Error:', error);

    // Differentiate between 400, 422, and 500
    if (
      message.includes('password-protected') ||
      message.includes('corrupted') ||
      message.includes('unreadable') ||
      message.includes('passwordexception')
    ) {
      return NextResponse.json({ 
        error: error.message || 'The PDF file is unreadable or password protected.',
        details: error.message 
      }, { status: 422 });
    }

    if (message.includes('image-only')) {
      return NextResponse.json({ 
        error: 'PDF appears to be image-only. Please use a text-based PDF.',
        details: error.message 
      }, { status: 400 });
    }

    // Default to 500 with maximal diagnostic info
    return NextResponse.json({ 
      error: 'Internal processing error during CV analysis.',
      details: error.message || String(error),
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}
