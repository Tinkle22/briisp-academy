'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Enrollment, Notice } from '@/types';
import { formatDate } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  GraduationCap,
  Bell,
  ChevronRight,
  Calendar,
  Users,
  Clock,
  BookOpenCheck,
  FileText,
  CheckCircle,
  AlertCircle,
  XCircle,
} from 'lucide-react';

interface ApplicationSummary {
  id: string;
  type: string;
  title: string;
  status: string;
  applicationDate: string;
  details: Record<string, any>;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [applications, setApplications] = useState<ApplicationSummary[]>([]);
  const [applicationSummary, setApplicationSummary] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    inProgress: 0
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch('/api/users/me');
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        const userData = await userResponse.json();
        setUser(userData);

        // Fetch enrollments
        const enrollmentsResponse = await fetch('/api/enrollments');
        if (!enrollmentsResponse.ok) throw new Error('Failed to fetch enrollments');
        const enrollmentsData = await enrollmentsResponse.json();
        setEnrollments(enrollmentsData);

        // Fetch notices
        const noticesResponse = await fetch('/api/notices');
        if (!noticesResponse.ok) throw new Error('Failed to fetch notices');
        const noticesData = await noticesResponse.json();
        setNotices(noticesData);

        // Fetch applications
        const applicationsResponse = await fetch(`/api/student/applications?email=${userData.email}`);
        if (applicationsResponse.ok) {
          const applicationsData = await applicationsResponse.json();
          setApplications(applicationsData.applications.slice(0, 3)); // Show only recent 3
          setApplicationSummary(applicationsData.summary);
        }



      } catch (error) {
        console.error('Dashboard error:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <div className="space-y-8 p-6">
      {/* Welcome Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-600 via-amber-500 to-amber-400 rounded-2xl">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative px-8 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/15 backdrop-blur-sm rounded-xl">
                  <GraduationCap className="h-8 w-8" />
                </div>
                <p className="text-amber-100 font-medium">Student Dashboard</p>
              </div>
              <h1 className="text-4xl font-bold text-white">
                Welcome back, {user?.first_name}! 👋
              </h1>
              <p className="text-amber-100/80">
                {formatDate(new Date())} • {new Date().toLocaleTimeString('en-US', { 
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true 
                })}
              </p>
      </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                onClick={() => router.push('/course')}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Browse Courses
              </Button>
              <Button 
                variant="outline" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                onClick={() => router.push('/notice')}
              >
                <Bell className="h-4 w-4 mr-2" />
                View Notices
              </Button>
            </div>
          </div>
        </div>
            </div>
            
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-4 border-l-4 border-amber-600">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-amber-100 rounded-lg">
              <BookOpenCheck className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Courses</p>
              <p className="text-2xl font-bold">{enrollments.length}</p>
            </div>
          </div>
                </Card>
        <Card className="p-4 border-l-4 border-amber-600">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Clock className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
              <p className="text-sm text-gray-600">Hours Completed</p>
              <p className="text-2xl font-bold">24</p>
                        </div>
                      </div>
        </Card>
        <Card className="p-4 border-l-4 border-amber-600">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Calendar className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Next Class</p>
              <p className="text-2xl font-bold">Today</p>
            </div>
                    </div>
                  </Card>
        <Card className="p-4 border-l-4 border-amber-600">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-amber-100 rounded-lg">
              <FileText className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Applications</p>
              <p className="text-2xl font-bold">{applicationSummary.total}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Courses and Applications */}
        <div className="lg:col-span-2 space-y-6">
          {/* Enrolled Courses */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-amber-600" />
                My Courses
              </h2>
              <Button variant="outline" className="text-amber-600 border-amber-600 hover:bg-amber-50">
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {enrollments.map((enrollment) => (
                <Card key={enrollment.enrollment_id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="bg-amber-100 p-3 rounded-lg">
                    <BookOpen className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{enrollment.course.title}</h3>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm text-gray-600">
                        {enrollment.course.department}
                      </span>
                      <span className="text-sm px-2 py-1 bg-amber-100 text-amber-700 rounded-full">
                        {enrollment.status}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => router.push(`/courses/${enrollment.course.course_id}`)}
                    className="text-amber-600 hover:bg-amber-50"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </Card>
              ))}
            </div>
          </div>

          {/* Recent Applications */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5 text-amber-600" />
                Recent Applications
              </h2>
              <Button
                variant="outline"
                className="text-amber-600 border-amber-600 hover:bg-amber-50"
                onClick={() => router.push('/applications')}
              >
                View All
              </Button>
            </div>
            <div className="space-y-6">
              {applications.length > 0 ? (
                applications.map((application) => {
                  const getStatusBadge = (status: string) => {
                    const statusConfig = {
                      pending: { variant: "secondary" as const, label: "Pending", icon: Clock },
                      approved: { variant: "default" as const, label: "Approved", icon: CheckCircle },
                      accepted: { variant: "default" as const, label: "Accepted", icon: CheckCircle },
                      rejected: { variant: "destructive" as const, label: "Rejected", icon: XCircle },
                      "in-progress": { variant: "outline" as const, label: "In Progress", icon: AlertCircle },
                      reviewed: { variant: "outline" as const, label: "Reviewed", icon: AlertCircle },
                      completed: { variant: "default" as const, label: "Completed", icon: CheckCircle },
                    };

                    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
                    const IconComponent = config.icon;

                    return (
                      <Badge variant={config.variant} className="flex items-center gap-1">
                        <IconComponent className="w-3 h-3" />
                        {config.label}
                      </Badge>
                    );
                  };

                  return (
                    <Card key={application.id} className="p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="bg-amber-100 p-3 rounded-lg">
                            <FileText className="h-5 w-5 text-amber-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{application.title}</h3>
                            <p className="text-sm text-gray-600">
                              {formatDate(new Date(application.applicationDate))}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(application.status)}
                        </div>
                      </div>
                    </Card>
                  );
                })
              ) : (
                <Card className="p-6 text-center">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">No applications submitted yet</p>
                  <Button
                    variant="outline"
                    className="mt-2"
                    onClick={() => router.push('/registration')}
                  >
                    Submit Your First Application
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Notices Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Bell className="h-5 w-5 text-amber-600" />
              Recent Notices
            </h2>
            <Button variant="outline" className="text-amber-600 border-amber-600 hover:bg-amber-50">
              All Notices
            </Button>
          </div>
          <Card className="p-4">
            <div className="space-y-4">
              {notices.map((notice) => (
                <div key={notice.notice_id} className="border-b last:border-0 pb-4 last:pb-0">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${
                      notice.priority === 'high' ? 'bg-red-100' :
                      notice.priority === 'medium' ? 'bg-amber-100' : 'bg-green-100'
                    }`}>
                      <Bell className={`h-4 w-4 ${
                        notice.priority === 'high' ? 'text-red-600' :
                        notice.priority === 'medium' ? 'text-amber-600' : 'text-green-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{notice.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{notice.description}</p>
                      <p className="text-xs text-gray-500 mt-2">{formatDate(new Date(notice.publish_date))}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}