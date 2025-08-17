import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { Graduate, Project, SocialLink } from '@/lib/types';
import { RowDataPacket } from 'mysql2';
import { fileStorage } from '@/lib/file-storage';
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');
    const year = searchParams.get('year');

    let query = `
      SELECT 
        g.*,
        GROUP_CONCAT(DISTINCT p.project_id) as project_ids,
        GROUP_CONCAT(DISTINCT sl.link_id) as social_link_ids
      FROM graduates g
      LEFT JOIN projects p ON g.graduate_id = p.graduate_id
      LEFT JOIN social_links sl ON g.graduate_id = sl.graduate_id
    `;

    const params: any[] = [];
    const conditions: string[] = [];

    if (courseId) {
      conditions.push('g.course_id = ?');
      params.push(courseId);
    }

    if (year) {
      conditions.push('g.year_of_completion = ?');
      params.push(year);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }

    query += ' GROUP BY g.graduate_id ORDER BY g.final_score DESC';

    const [graduates] = await pool.query(query, params);
    
    // Fetch related data for each graduate
    const graduatesWithDetails = await Promise.all((graduates as any[]).map(async (graduate) => {
      const [projects] = await pool.query('SELECT * FROM projects WHERE graduate_id = ?', [graduate.graduate_id]);
      const [socialLinks] = await pool.query('SELECT * FROM social_links WHERE graduate_id = ?', [graduate.graduate_id]);
      
      return {
        ...graduate,
        projects,
        social_links: socialLinks
      };
    }));

    return NextResponse.json(graduatesWithDetails);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    const formData = await request.formData();

    // Upload certificate file (if provided)
    let certificateFileUrl = '';
    const certificateFile = formData.get('certificate_file') as File;
    if (certificateFile) {
      const certificateResult = await fileStorage.uploadFile(certificateFile, 'graduates');
      certificateFileUrl = certificateResult.url;
    }

    // Upload graduate image file (if provided)
    let graduateImageUrl = '';
    const graduateImage = formData.get('graduate_image') as File;
    if (graduateImage) {
      const imageResult = await fileStorage.uploadFile(graduateImage, 'graduates');
      graduateImageUrl = imageResult.url;
    }

    // Parse JSON strings stored in formData
    const graduateData = JSON.parse(formData.get('graduateData') as string);
    const projectsData = JSON.parse(formData.get('projects') as string);
    const socialLinksData = JSON.parse(formData.get('social_links') as string);

    // Insert graduate, now including the graduate image URL
    const [graduateResult] = await connection.query(
      'INSERT INTO graduates SET ?',
      {
        ...graduateData,
        certificate_file_url: certificateFileUrl,
        graduate_image_url: graduateImageUrl,
      }
    );
    const graduateId = (graduateResult as any).insertId;

    // Insert projects
    for (const project of projectsData) {
      // Convert completion_date from ISO string to MySQL DATE format
      const completionDate = project.completion_date ? new Date(project.completion_date).toISOString().split('T')[0] : null;
      
      await connection.query(
        'INSERT INTO projects SET ?',
        { ...project, graduate_id: graduateId, completion_date: completionDate }
      );
    }

    // Insert social links
    for (const link of socialLinksData) {
      await connection.query(
        'INSERT INTO social_links SET ?',
        { ...link, graduate_id: graduateId }
      );
    }

    await connection.commit();
    return NextResponse.json({ id: graduateId }, { status: 201 });
  } catch (error) {
    await connection.rollback();
    console.error('Error submitting graduate:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    connection.release();
  }
}
