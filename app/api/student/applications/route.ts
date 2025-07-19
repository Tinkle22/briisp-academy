import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export const dynamic = 'force-dynamic';

interface ApplicationSummary {
  id: string;
  type: 'course' | 'fyp' | 'pitch-deck' | 'innovation-lab' | 'internship';
  title: string;
  status: string;
  applicationDate: string;
  details: Record<string, any>;
}

// GET all applications for a specific student by email
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    const applications: ApplicationSummary[] = [];

    // Fetch course applications
    try {
      const [courseApps] = await pool.query<RowDataPacket[]>(
        `SELECT 
          a.application_id,
          a.status,
          a.application_date,
          a.first_name,
          a.last_name,
          c.title as course_title,
          c.course_code
        FROM applications a
        JOIN courses c ON a.course_id = c.course_id
        WHERE a.email = ?
        ORDER BY a.application_date DESC`,
        [email]
      );

      courseApps.forEach((app) => {
        applications.push({
          id: `course-${app.application_id}`,
          type: 'course',
          title: `Course Application - ${app.course_title}`,
          status: app.status || 'pending',
          applicationDate: app.application_date,
          details: {
            courseTitle: app.course_title,
            courseCode: app.course_code,
            applicantName: `${app.first_name} ${app.last_name}`
          }
        });
      });
    } catch (error) {
      console.error('Error fetching course applications:', error);
    }

    // Fetch FYP applications
    try {
      const [fypApps] = await pool.query<RowDataPacket[]>(
        `SELECT 
          application_id,
          student_name,
          project_title,
          project_type,
          status,
          application_date
        FROM final_year_project_applications
        WHERE email = ?
        ORDER BY application_date DESC`,
        [email]
      );

      fypApps.forEach((app) => {
        applications.push({
          id: `fyp-${app.application_id}`,
          type: 'fyp',
          title: `Final Year Project - ${app.project_title || 'Untitled Project'}`,
          status: app.status || 'pending',
          applicationDate: app.application_date,
          details: {
            studentName: app.student_name,
            projectTitle: app.project_title,
            projectType: app.project_type
          }
        });
      });
    } catch (error) {
      console.error('Error fetching FYP applications:', error);
    }

    // Fetch pitch deck applications
    try {
      const [pitchApps] = await pool.query<RowDataPacket[]>(
        `SELECT 
          application_id,
          applicant_name,
          company_name,
          industry,
          funding_stage,
          status,
          application_date
        FROM pitch_deck_applications
        WHERE email = ?
        ORDER BY application_date DESC`,
        [email]
      );

      pitchApps.forEach((app) => {
        applications.push({
          id: `pitch-deck-${app.application_id}`,
          type: 'pitch-deck',
          title: `Pitch Deck Service - ${app.company_name || 'Company'}`,
          status: app.status || 'pending',
          applicationDate: app.application_date,
          details: {
            applicantName: app.applicant_name,
            companyName: app.company_name,
            industry: app.industry,
            fundingStage: app.funding_stage
          }
        });
      });
    } catch (error) {
      console.error('Error fetching pitch deck applications:', error);
    }

    // Fetch Innovation Lab applications
    try {
      const [innovationApps] = await pool.query<RowDataPacket[]>(
        `SELECT 
          application_id,
          applicant_name,
          project_title,
          innovation_type,
          development_stage,
          status,
          application_date
        FROM innovation_lab_applications
        WHERE email = ?
        ORDER BY application_date DESC`,
        [email]
      );

      innovationApps.forEach((app) => {
        applications.push({
          id: `innovation-lab-${app.application_id}`,
          type: 'innovation-lab',
          title: `Innovation Lab - ${app.project_title || 'Project'}`,
          status: app.status || 'pending',
          applicationDate: app.application_date,
          details: {
            applicantName: app.applicant_name,
            projectTitle: app.project_title,
            innovationType: app.innovation_type,
            developmentStage: app.development_stage
          }
        });
      });
    } catch (error) {
      console.error('Error fetching Innovation Lab applications:', error);
    }

    // Fetch internship applications
    try {
      const [internshipApps] = await pool.query<RowDataPacket[]>(
        `SELECT 
          application_id,
          student_name,
          university,
          course_of_study,
          internship_type_preference,
          status,
          application_date
        FROM internship_applications
        WHERE student_email = ?
        ORDER BY application_date DESC`,
        [email]
      );

      internshipApps.forEach((app) => {
        applications.push({
          id: `internship-${app.application_id}`,
          type: 'internship',
          title: `Internship Application - ${app.internship_type_preference || 'General'}`,
          status: app.status || 'pending',
          applicationDate: app.application_date,
          details: {
            studentName: app.student_name,
            university: app.university,
            courseOfStudy: app.course_of_study,
            internshipType: app.internship_type_preference
          }
        });
      });
    } catch (error) {
      console.error('Error fetching internship applications:', error);
    }

    // Sort all applications by date (most recent first)
    applications.sort((a, b) => 
      new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime()
    );

    // Calculate summary statistics
    const summary = {
      total: applications.length,
      pending: applications.filter(app => app.status === 'pending').length,
      approved: applications.filter(app => ['approved', 'accepted', 'completed'].includes(app.status)).length,
      rejected: applications.filter(app => app.status === 'rejected').length,
      inProgress: applications.filter(app => ['in-progress', 'reviewed'].includes(app.status)).length
    };

    return NextResponse.json({
      applications,
      summary
    });

  } catch (error) {
    console.error('Error fetching student applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}
