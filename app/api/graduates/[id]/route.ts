import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { Graduate, Project, SocialLink } from '@/lib/types';
import { RowDataPacket } from 'mysql2';
import { fileStorage } from '@/lib/file-storage';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [graduates] = await pool.query<(Graduate & RowDataPacket)[]>(
      `SELECT * FROM graduates WHERE graduate_id = ?`,
      [params.id]
    );
    
    if (!graduates[0]) {
      return NextResponse.json({ error: 'Graduate not found' }, { status: 404 });
    }

    const graduate = graduates[0];
    
    // Fetch related projects and social links
    const [projects] = await pool.query(
      'SELECT * FROM projects WHERE graduate_id = ?',
      [params.id]
    );
    
    const [socialLinks] = await pool.query(
      'SELECT * FROM social_links WHERE graduate_id = ?',
      [params.id]
    );

    return NextResponse.json({
      ...graduate,
      projects,
      social_links: socialLinks
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    const formData = await request.formData();
    
    // Handle certificate file upload if provided
    let certificateFileUrl = undefined;
    const certificateFile = formData.get('certificate_file') as File;
    if (certificateFile) {
      const certificateResult = await fileStorage.uploadFile(certificateFile, 'graduates');
      certificateFileUrl = certificateResult.url;
    }

    // Handle graduate image upload if provided
    let graduateImageUrl = undefined;
    const graduateImage = formData.get('graduate_image') as File;
    if (graduateImage) {
      const imageResult = await fileStorage.uploadFile(graduateImage, 'graduates');
      graduateImageUrl = imageResult.url;
    }

    // Parse JSON strings from form data
    const graduateData = JSON.parse(formData.get('graduateData') as string);
    const projectsData = JSON.parse(formData.get('projects') as string);
    const socialLinksData = JSON.parse(formData.get('social_links') as string);

    // Update graduate
    await connection.query(
      'UPDATE graduates SET ? WHERE graduate_id = ?',
      [
        {
          ...graduateData,
          ...(certificateFileUrl && { certificate_file_url: certificateFileUrl }),
          ...(graduateImageUrl && { graduate_image_url: graduateImageUrl })
        },
        params.id
      ]
    );

    // Delete existing projects and social links
    await connection.query('DELETE FROM projects WHERE graduate_id = ?', [params.id]);
    await connection.query('DELETE FROM social_links WHERE graduate_id = ?', [params.id]);

    // Insert updated projects
    for (const project of projectsData) {
      // Convert completion_date from ISO string to MySQL DATE format
      const completionDate = project.completion_date ? new Date(project.completion_date).toISOString().split('T')[0] : null;
      
      await connection.query(
        'INSERT INTO projects SET ?',
        { ...project, graduate_id: params.id, completion_date: completionDate }
      );
    }

    // Insert updated social links
    for (const link of socialLinksData) {
      await connection.query(
        'INSERT INTO social_links SET ?',
        { ...link, graduate_id: params.id }
      );
    }

    await connection.commit();
    return NextResponse.json({ success: true });
  } catch (error) {
    await connection.rollback();
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    connection.release();
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await pool.query('DELETE FROM graduates WHERE graduate_id = ?', [params.id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
