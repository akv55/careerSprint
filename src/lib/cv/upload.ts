import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const UPLOADS_DIR = path.join(process.cwd(), 'tmp', 'uploads');
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export async function saveUploadedFile(file: File): Promise<{ filePath: string; originalName: string }> {
  // Validate MIME type
  if (file.type !== 'application/pdf') {
    throw new Error('Invalid file type: Only PDF files are accepted');
  }

  // Enforce size limit
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File exceeds the 10 MB size limit');
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Check magic bytes (%PDF- is 25 50 44 46 2D)
  if (buffer.length < 5) {
    throw new Error('Invalid PDF format: File is too small');
  }
  const magicBytes = buffer.subarray(0, 5).toString('hex');
  if (magicBytes !== '255044462d') {
    throw new Error('Invalid PDF format: Corrupted file or not a PDF');
  }

  // Generate a unique filename
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const uniqueName = `${uuidv4()}-${sanitizedName}`;
  const filePath = path.join(UPLOADS_DIR, uniqueName);

  // Ensure directory exists
  await fs.mkdir(UPLOADS_DIR, { recursive: true });

  // Write file
  await fs.writeFile(filePath, buffer);

  return { filePath, originalName: file.name };
}

export async function cleanupFile(filePath: string): Promise<void> {
  try {
    await fs.unlink(filePath);
  } catch (error: any) {
    if (error.code !== 'ENOENT') {
      console.error(`Failed to delete file at ${filePath}:`, error);
    }
  }
}
