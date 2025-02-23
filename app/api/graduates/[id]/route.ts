import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { RowDataPacket } from 'mysql2';

interface Graduate extends RowDataPacket {
  graduate_id: string;
  // add other properties as needed
}

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
      certificateFileUrl = await uploadToCloudinary(certificateFile, 'certificates');
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
          ...(certificateFileUrl && { certificate_file_url: certificateFileUrl })
        },
        params.id
      ]
    );

    // Delete existing projects and social links
    await connection.query('DELETE FROM projects WHERE graduate_id = ?', [params.id]);
    await connection.query('DELETE FROM social_links WHERE graduate_id = ?', [params.id]);

    // Insert updated projects
    for (const project of projectsData) {
      await connection.query(
        'INSERT INTO projects SET ?',
        { ...project, graduate_id: params.id }
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
