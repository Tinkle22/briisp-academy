/* eslint-disable react/no-unescaped-entities */
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  FileText,
  GraduationCap,
  Presentation,
  Lightbulb,
  Briefcase,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface ApplicationSummary {
  id: string;
  type: 'course' | 'fyp' | 'pitch-deck' | 'innovation-lab' | 'internship';
  title: string;
  status: string;
  applicationDate: string;
  details: Record<string, any>;
}

interface ApplicationData {
  applications: ApplicationSummary[];
  summary: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
    inProgress: number;
  };
}

export default function ApplicationsPage() {
  const [applicationData, setApplicationData] = useState<ApplicationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndApplications = async () => {
      try {
        // First get user data to get email
        const userResponse = await fetch('/api/users/me');
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        const userData = await userResponse.json();
        setUserEmail(userData.email);

        // Then fetch applications using the email
        const appsResponse = await fetch(`/api/student/applications?email=${userData.email}`);
        if (!appsResponse.ok) throw new Error('Failed to fetch applications');
        const appsData = await appsResponse.json();
        setApplicationData(appsData);

      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndApplications();
  }, []);

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

  const getApplicationIcon = (type: string) => {
    const icons = {
      course: FileText,
      fyp: GraduationCap,
      'pitch-deck': Presentation,
      'innovation-lab': Lightbulb,
      internship: Briefcase,
    };
    return icons[type as keyof typeof icons] || FileText;
  };

  const getApplicationTypeLabel = (type: string) => {
    const labels = {
      course: 'Course Application',
      fyp: 'Final Year Project',
      'pitch-deck': 'Pitch Deck Service',
      'innovation-lab': 'Innovation Lab',
      internship: 'Internship Program',
    };
    return labels[type as keyof typeof labels] || type;
  };

  const filterApplications = (status: string) => {
    if (!applicationData) return [];
    
    switch (status) {
      case 'pending':
        return applicationData.applications.filter(app => app.status === 'pending');
      case 'active':
        return applicationData.applications.filter(app => 
          ['approved', 'accepted', 'in-progress', 'reviewed'].includes(app.status)
        );
      case 'completed':
        return applicationData.applications.filter(app => 
          ['completed', 'rejected'].includes(app.status)
        );
      default:
        return applicationData.applications;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p>Loading your applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold">My Applications</h1>
          <p className="text-gray-600 mt-1">
            Track the status of all your submitted applications
          </p>
        </div>
        <Button 
          onClick={() => router.push('/registration')}
          className="bg-amber-600 hover:bg-amber-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Application
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-4 border-l-4 border-amber-600">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-amber-100 rounded-lg">
              <FileText className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Applications</p>
              <p className="text-2xl font-bold">{applicationData?.summary.total || 0}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border-l-4 border-yellow-500">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold">{applicationData?.summary.pending || 0}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border-l-4 border-blue-500">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <AlertCircle className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold">{applicationData?.summary.inProgress || 0}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border-l-4 border-green-500">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-2xl font-bold">{applicationData?.summary.approved || 0}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Applications List */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Applications</TabsTrigger>
          <TabsTrigger value="pending">Pending ({applicationData?.summary.pending || 0})</TabsTrigger>
          <TabsTrigger value="active">Active ({applicationData?.summary.inProgress || 0})</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <ApplicationsList applications={applicationData?.applications || []} />
        </TabsContent>

        <TabsContent value="pending" className="space-y-6">
          <ApplicationsList applications={filterApplications('pending')} />
        </TabsContent>

        <TabsContent value="active" className="space-y-6">
          <ApplicationsList applications={filterApplications('active')} />
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <ApplicationsList applications={filterApplications('completed')} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ApplicationsList({ applications }: { applications: ApplicationSummary[] }) {
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

  const getApplicationIcon = (type: string) => {
    const icons = {
      course: FileText,
      fyp: GraduationCap,
      'pitch-deck': Presentation,
      'innovation-lab': Lightbulb,
      internship: Briefcase,
    };
    return icons[type as keyof typeof icons] || FileText;
  };

  if (applications.length === 0) {
    return (
      <Card className="p-8 text-center">
        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">No applications found</h3>
        <p className="text-gray-500">You haven't submitted any applications yet.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {applications.map((application) => {
        const IconComponent = getApplicationIcon(application.type);

        return (
          <Card key={application.id} className="p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-100 rounded-lg">
                  <IconComponent className="h-6 w-6 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{application.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(new Date(application.applicationDate))}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {Object.entries(application.details).slice(0, 2).map(([key, value]) => (
                      <span key={key} className="mr-4">
                        <strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> {value}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                {getStatusBadge(application.status)}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
