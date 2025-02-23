import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Star, GraduationCap, Mail, Phone } from 'lucide-react';
import { headers } from 'next/headers';

// Define the GraduateDetails type based on your schema
interface Project {
  project_id: number;
  project_title: string;
  description?: string;
  project_url?: string;
  github_url?: string;
  technologies_used?: string;
  completion_date?: string;
}

interface SocialLink {
  link_id: number;
  platform: string;
  url: string;
}

interface GraduateDetails {
  graduate_id: number;
  name: string;
  email: string;
  cell_number?: string;
  year_of_completion: number;
  period_of_study: string;
  graduate_image_url: string;
  final_score: number;
  certificate_number: string;
  certificate_file_url?: string;
  projects: Project[];
  social_links: SocialLink[];
}

export default async function GraduateDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  // Construct an absolute URL using the request's headers.
  const headersList = headers();
  const host = headersList.get('host');
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;

  // Fetch a single graduate's data from our API using an absolute URL.
  const res = await fetch(`${baseUrl}/api/graduates/${params.id}`, { cache: 'no-store' });
  if (!res.ok) {
    notFound();
  }
  const graduate: GraduateDetails = await res.json();

  return (
    <div  className="container mx-auto p-6 border-solid  rounded-lg shadow-md">
      <Link href="/graduates" className="text-amber-600 underline mb-4 inline-block">
        ← Back to Graduates
      </Link>
      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Graduate Image */}
        <div className="w-full md:w-1/3">
          <img
            src={graduate.graduate_image_url}
            alt={graduate.name}
            className="rounded-lg object-cover"
          />
        </div>
        {/* Graduate Details */}
        <div className="w-full md:w-2/3">
          <h1 className="text-3xl font-bold">{graduate.name}</h1>
          <p className="mt-2 flex items-center gap-2">
            <Mail className="w-4 h-4" /> {graduate.email}
          </p>
          {graduate.cell_number && (
            <p className="mt-1 flex items-center gap-2">
              <Phone className="w-4 h-4" /> {graduate.cell_number}
            </p>
          )}
          <p className="mt-1 flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Class of {graduate.year_of_completion}
          </p>
          <p className="mt-1 flex items-center gap-2">
            <GraduationCap className="w-4 h-4" /> {graduate.period_of_study}
          </p>
          <p className="mt-1 flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-600" /> Final Score: {graduate.final_score}
          </p>
          <p className="mt-1">Certificate Number: {graduate.certificate_number}</p>
          {graduate.certificate_file_url && (
            <a
              href={graduate.certificate_file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-amber-600 underline"
            >
              View Certificate
            </a>
          )}
        </div>
      </div>

      {/* Projects Section */}
      {graduate.projects && graduate.projects.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {graduate.projects.map((project) => (
              <div key={project.project_id} className="p-4 border rounded-lg">
                <h3 className="text-xl font-semibold">{project.project_title}</h3>
                {project.description && (
                  <p className="mt-2 text-sm">{project.description}</p>
                )}
                {project.project_url && (
                  <a
                    href={project.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-amber-600 underline"
                  >
                    View Project
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Social Links Section */}
      {graduate.social_links && graduate.social_links.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Social Links</h2>
          <ul>
            {graduate.social_links.map((link) => (
              <li key={link.link_id} className="mt-2">
                <strong>
                  {link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}:
                </strong>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-600 underline ml-2"
                >
                  {link.url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 