import { NextRequest, NextResponse } from 'next/server';
import { fileAccessManager } from '@/lib/file-config';

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file = data.get('file') as File;
        const folder = (data.get('folder') as string) || 'course-gallery';

        if (!file) {
            return NextResponse.json(
                { error: 'No file uploaded' },
                { status: 400 }
            );
        }

        // Upload to dashboard
        const result = await fileAccessManager.uploadFile(file, folder);

        return NextResponse.json({
            url: result.url,
            fileId: result.filename,
            thumbnailUrl: result.url,
            filename: result.filename,
            originalName: result.originalName,
            size: result.size,
            mimeType: result.mimeType
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Error uploading file' },
            { status: 500 }
        );
    }
}
