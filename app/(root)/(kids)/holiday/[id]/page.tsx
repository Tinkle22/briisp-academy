import { notFound } from 'next/navigation';
import CourseDetails from './course-details';
import pool from '@/lib/db';

// Add this function to generate static params
export async function generateStaticParams() {
  try {
    const [courses] = await pool.query(
      'SELECT course_id FROM courses WHERE program_type = ?',
      ['holiday']
    );
    
    if (!courses || (courses as any[]).length === 0) {
      console.error('No courses found for adults-online');
      return [];
    }

    return (courses as any[]).map((course) => ({
      id: course.course_id.toString()
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

async function getCourse(id: string) {
  try {
    // Fetch course details
    const [courses] = await pool.query(
      `SELECT c.*, 
        GROUP_CONCAT(DISTINCT curr.week_number, ':', curr.topic, ':', curr.content) as curriculum_data,
        GROUP_CONCAT(DISTINCT g.image_url) as gallery_images
      FROM courses c
      LEFT JOIN curriculum curr ON c.course_id = curr.course_id
      LEFT JOIN gallery g ON c.course_id = g.course_id
      WHERE c.course_id = ? AND c.program_type = 'holiday'
      GROUP BY c.course_id`,
      [id]
    );

    if (!courses || (courses as any[]).length === 0) {
      return null;
    }

    const course = (courses as any[])[0];

    // Process curriculum data
    const curriculumData = course.curriculum_data
      ? course.curriculum_data.split(',').map((item: string) => {
          const [week, topic, content] = item.split(':');
          return {
            week: `Week ${week}`,
            topics: [topic],
            content: content
          };
        })
      : [];

    // Group curriculum by week
    const curriculum = curriculumData.reduce((acc: any[], curr: any) => {
      const existingWeek = acc.find(item => item.week === curr.week);
      if (existingWeek) {
        existingWeek.topics.push(curr.topics[0]);
      } else {
        acc.push({
          week: curr.week,
          topics: curr.topics
        });
      }
      return acc;
    }, []);

    // Format the course data
    const formattedCourse = {
      ...course,
      image: course.image_url,
      price: `K${course.price}/pm`,
      duration: `${course.duration_months} Months Program`,
      subtitle: course.description,
      curriculum,
      stats: [
        { 
          label: "Duration", 
          value: `${course.duration_months} Months`, 
          icon: "Clock" 
        },
        { 
          label: "Lectures", 
          value: `${course.num_lectures} Total`, 
          icon: "BookOpen" 
        },
        { 
          label: "Level", 
          value: course.skill_level.charAt(0).toUpperCase() + course.skill_level.slice(1), 
          icon: "Users" 
        },
        { 
          label: "Languages", 
          value: course.languages, 
          icon: "Calendar" 
        }
      ],
      highlights: [
        "Industry-standard curriculum",
        "Hands-on practical training",
        "Expert instructors",
        "Career support services",
        "Flexible learning schedule",
        "Modern learning facilities"
      ]
    };

    return formattedCourse;
  } catch (error) {
    console.error('Error fetching course:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const course = await getCourse(params.id);
  
  if (!course) {
    return {
      title: 'Course Not Found',
    };
  }

  return {
    title: course.title,
    description: course.description,
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const course = await getCourse(params.id);

  if (!course) {
    notFound();
  }

  return <CourseDetails course={course} />;
}