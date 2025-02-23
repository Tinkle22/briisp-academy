import { NextResponse } from 'next/server';
import { imagekit } from '@/lib/imagekit';

export async function POST(request: Request) {
    try {
        const data = await request.formData();
        const file: File | null = data.get('file') as unknown as File;
        
        if (!file) {
            return NextResponse.json(
                { error: 'No file uploaded' },
                { status: 400 }
            );
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to ImageKit
        const result = await imagekit.upload({
            file: buffer,
            fileName: file.name,
            folder: '/course-gallery'  // Customize folder path as needed
        });

        return NextResponse.json({
            url: result.url,
            fileId: result.fileId,
            thumbnailUrl: result.thumbnailUrl
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Error uploading file' },
            { status: 500 }
        );
    }
}
