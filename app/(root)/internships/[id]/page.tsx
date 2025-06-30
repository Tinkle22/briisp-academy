import { notFound } from 'next/navigation';
import InternshipDetails from './internship-details';
import pool from '@/lib/db';

// Generate static params for internships
export async function generateStaticParams() {
  try {
    const [internships] = await pool.query(
      'SELECT internship_id FROM internships WHERE is_active = true'
    );
    
    return (internships as any[]).map((internship) => ({
      id: internship.internship_id.toString()
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

async function getInternshipData(id: string) {
  try {
    // Get internship details with company information
    const [internshipResult] = await pool.query(
      `SELECT 
        i.*,
        c.name as company_name,
        c.logo_url as company_logo,
        c.location as company_location,
        c.website as company_website,
        c.description as company_description,
        c.industry as company_industry,
        c.size as company_size,
        COUNT(DISTINCT ia.application_id) as total_applications
      FROM internships i
      LEFT JOIN companies c ON i.company_id = c.company_id
      LEFT JOIN internship_applications ia ON i.internship_id = ia.internship_id
      WHERE i.internship_id = ? AND i.is_active = true
      GROUP BY i.internship_id`,
      [id]
    );

    const internship = (internshipResult as any[])[0];
    
    if (!internship) {
      return null;
    }

    // Get similar internships
    const [similarInternships] = await pool.query(
      `SELECT 
        i.*,
        c.name as company_name,
        c.logo_url as company_logo,
        c.location as company_location
      FROM internships i
      LEFT JOIN companies c ON i.company_id = c.company_id
      WHERE i.industry = ? AND i.internship_id != ? AND i.is_active = true
      ORDER BY i.created_at DESC
      LIMIT 3`,
      [internship.industry, id]
    );

    return {
      internship,
      similarInternships: similarInternships as any[]
    };
  } catch (error) {
    console.error('Error fetching internship data:', error);
    return null;
  }
}

interface PageProps {
  params: {
    id: string;
  };
}

export default async function InternshipPage({ params }: PageProps) {
  const data = await getInternshipData(params.id);

  if (!data) {
    notFound();
  }

  return <InternshipDetails {...data} />;
}

export async function generateMetadata({ params }: PageProps) {
  const data = await getInternshipData(params.id);
  
  if (!data) {
    return {
      title: 'Internship Not Found',
    };
  }

  return {
    title: `${data.internship.title} at ${data.internship.company_name} - Internship Opportunity`,
    description: data.internship.description,
  };
}
