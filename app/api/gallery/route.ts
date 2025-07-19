import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { Gallery } from '@/lib/types';
import { getFileUrl } from '@/lib/file-config';

export async function GET(request: Request) {
    try {
        // Get query parameters
        const { searchParams } = new URL(request.url);
        const courseId = searchParams.get('courseId');

        let query = 'SELECT * FROM gallery WHERE is_active = true';
        const params: any[] = [];

        if (courseId) {
            query += ' AND course_id = ?';
            params.push(courseId);
        }

        query += ' ORDER BY display_order ASC';

        const [galleries] = await pool.query(query, params);

        // Process image URLs to use dashboard file access
        const processedGalleries = (galleries as any[]).map(gallery => ({
            ...gallery,
            image_url: gallery.image_url ? getFileUrl(gallery.image_url) : null
        }));

        return NextResponse.json(processedGalleries);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body: Gallery = await request.json();
        const {
            course_id,
            image_url,
            image_title,
            image_description,
            image_type,
            display_order
        } = body;

        const [result] = await pool.query(
            `INSERT INTO gallery (
                course_id,
                image_url,
                image_title,
                image_description,
                image_type,
                display_order
            ) VALUES (?, ?, ?, ?, ?, ?)`,
            [
                course_id,
                image_url,
                image_title,
                image_description,
                image_type,
                display_order
            ]
        );

        return NextResponse.json(
            { id: (result as any).insertId },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
