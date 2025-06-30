import { notFound } from 'next/navigation';
import RefresherCourseDetails from './course-details';
import pool from '@/lib/db';

// Generate static params for refresher courses
export async function generateStaticParams() {
  try {
    const [courses] = await pool.query(
      'SELECT course_id FROM courses WHERE program_type = ?',
      ['refresher']
    );
    
    return (courses as any[]).map((course) => ({
      id: course.course_id.toString()
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

async function getCourseData(id: string) {
  try {
    // Get course details
    const [courseResult] = await pool.query(
      `SELECT 
        c.*,
        GROUP_CONCAT(DISTINCT g.image_url) as gallery_images,
        COUNT(DISTINCT uce.enrollment_id) as total_enrollments
      FROM courses c
      LEFT JOIN gallery g ON c.course_id = g.course_id
      LEFT JOIN user_course_enrollments uce ON c.course_id = uce.course_id
      WHERE c.course_id = ? AND c.program_type = 'refresher'
      GROUP BY c.course_id`,
      [id]
    );

    const course = (courseResult as any[])[0];
    
    if (!course) {
      return null;
    }

    // Get curriculum
    const [curriculum] = await pool.query(
      'SELECT * FROM curriculum WHERE course_id = ? ORDER BY week_number',
      [id]
    );

    // Get downloadable materials
    const [materials] = await pool.query(
      'SELECT * FROM downloadable_files WHERE course_id = ? ORDER BY upload_date DESC',
      [id]
    );

    return {
      course,
      curriculum: curriculum as any[],
      materials: materials as any[]
    };
  } catch (error) {
    console.error('Error fetching course data:', error);
    return null;
  }
}

interface PageProps {
  params: {
    id: string;
  };
}

export default async function RefresherCoursePage({ params }: PageProps) {
  const data = await getCourseData(params.id);

  if (!data) {
    notFound();
  }

  return <RefresherCourseDetails {...data} />;
}

export async function generateMetadata({ params }: PageProps) {
  const data = await getCourseData(params.id);
  
  if (!data) {
    return {
      title: 'Course Not Found',
    };
  }

  return {
    title: `${data.course.title} - Refresher Course`,
    description: data.course.description,
  };
}
